import { Chain } from "viem";

export const network = {
  id: 629274,
  name: "Testnet",
  nativeCurrency: { name: "MAWARI", symbol: "MAWARI", decimals: 18 },

  rpcUrls: {
    default: { http: ["https://mawari-network-testnet.rpc.caldera.xyz/infra-partner-http"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://mawari-network-testnet.explorer.caldera.xyz/" },
  },
} as const satisfies Chain;