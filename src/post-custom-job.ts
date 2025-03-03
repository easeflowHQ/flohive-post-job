import { createPublicClient, createWalletClient, decodeEventLog, erc20Abi, http, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { registryAbi, treasuryAbi } from "./abi";
import { network } from "./config";

// read env vars
const privateKey = process.env.PRIVATE_KEY as string;
const registryAddress = process.env.REGISTRY_ADDRESS as `0x${string}`;
const account = privateKeyToAccount(("0x" + privateKey) as `0x${string}`);

// create wallet clients for writing and reading contracts
const client = createWalletClient({
  account,
  chain: network,
  transport: http(),
});

const publicClient = createPublicClient({
  chain: network,
  transport: http(),
});

// retrieve the target token address for spending approval
async function getTargetTokenAdress() {
  const treasuryAddress = await getTreasuryAddress();
  return await publicClient.readContract({
    address: treasuryAddress,
    abi: treasuryAbi,
    functionName: "targetTokenContract",
    args: [],
  });
}

// retrieve the treasury address to retrieve target token address
async function getTreasuryAddress() {
  return await publicClient.readContract({
    address: registryAddress,
    abi: registryAbi,
    functionName: "treasuryContract",
    args: [],
  });
}

// Approves target token spending.
// The job poster sends target tokens, which are collected by the registry and locked through the treasury.
// The locked tokens are used to pay execution on nodes.
async function approveTargetTokens(amount: bigint) {
  console.log("Approving token spending...");
  const targetTokenAddress = await getTargetTokenAdress();

  await client.writeContract({
    address: targetTokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [registryAddress, amount],
  });
}

// Submit a job
async function submitJob() {
  // example task data
  const taskData = toHex(
    "&EB+V,_70}XaJX5@{mED@0RY$#pAK;?%pfc@bYL(hJm7H.R5Y@MnD9kNGeYG=JwU2JV(D:UK%RzWVH09B3&ujqaGk*+P.YJXwi.P"
  );
  const jobType = "signature-scan-demo";
  const reward = 1000n;
  const nodeVersion = 1n;
  const maxResults = 10n;
  const minResultsForConsensus = 5n;

  // approve the target tokens before posting the job
  await approveTargetTokens(reward);

  console.log("Posting job...");
  const tx = await client.writeContract({
    address: registryAddress,
    abi: registryAbi,
    functionName: "postJob",
    args: [taskData, jobType, reward, nodeVersion, maxResults, minResultsForConsensus],
  });

  console.log("Job submitted, transaction hash:", tx);
  const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

  // find job id from event log
  let jobId: unknown = null;
  for (const log of receipt.logs) {
    try {
      const decodedLog = decodeEventLog({
        abi: registryAbi,
        data: log.data,
        topics: log.topics,
      });
      if (decodedLog.eventName === "JobCreated") {
        jobId = (decodedLog.args as any).job.id;
        break;
      }
    } catch (error) {
      continue;
    }
  }

  return jobId;
}

submitJob().then((jobId) => {
  console.log(`successfully submitted job ${jobId}.`);
});
