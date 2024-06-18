import { defineChain } from "viem/utils";

export const bnbTestNetwork = defineChain({
  id: 97,
  name: "BNB-test",
  nativeCurrency: {
    name: "tBNB",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://data-seed-prebsc-1-s3.binance.org:8545"],
      webSocket: undefined,
    },
  },
  blockExplorers: {
    default: {
      name: "BNB-test",
      url: "https://testnet.bscscan.com",
    },
  },
  testnet: true,
});
