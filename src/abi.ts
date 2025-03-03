export const treasuryAbi = [
  {
    inputs: [],
    name: "targetTokenContract",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const registryAbi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "task",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "type_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nodeVersion",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxResults",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minResultsForConsensus",
        type: "uint256",
      },
    ],
    name: "postJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryContract",
    outputs: [
      {
        internalType: "contract ITreasury",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "task",
            type: "bytes",
          },
          {
            internalType: "string",
            name: "type_",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nodeVersion",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxResults",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minResultsForConsensus",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Registry.Job",
        name: "job",
        type: "tuple",
      },
    ],
    name: "JobCreated",
    type: "event",
  },
] as const;
