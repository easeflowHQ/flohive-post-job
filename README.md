# Example for posting a flohive job

## Installation

```
npm install
```

## Running the example

First adapt the `src/config.ts` to reflect your network configuration. Then start the script using:
```
PRIVATE_KEY=<private_key> REGISTRY_ADDRESS=<registry_address> npx tsx src/post-custom-job.ts
```

Example Output

```
Approving token spending...
Posting job...
Job submitted, transaction hash: 0x00538dd74472476127959f00de19a83b54d7bdf8b60485a26606a0047923556e
Successfully submitted job 0x63a4fddb07155083df414d0903bec2550d51e56eb301e275e76b0084f9a5079c.
Waiting for job results ...
Job Result Received for Job ID 0x63a4fddb07155083df414d0903bec2550d51e56eb301e275e76b0084f9a5079c:
data: 0x00
submitterCount:10
Job finished. Exiting.
```