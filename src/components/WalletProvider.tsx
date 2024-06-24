/*
 * @LastEditors: John
 * @Date: 2024-06-17 18:01:43
 * @LastEditTime: 2024-06-24 18:51:52
 * @Author: John
 */
/*
 * @LastEditors: John
 * @Date: 2024-06-17 18:01:43
 * @LastEditTime: 2024-06-17 18:05:15
 * @Author: John
 */
/*
 * @LastEditors: John
 * @Date: 2024-03-06 11:26:45
 * @LastEditTime: 2024-05-27 16:32:26
 * @Author: John
 */
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { bsc } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { bnbTestNetwork } from "@/constants/wallet";
import { PropsWithChildren } from "react";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "10834bf2b5d92d012e4b0b05e1150246";

// 2. Create wagmiConfig
const metadata = {
  name: "red-devils",
  description: "red devils dapp",
  url: import.meta.env.BASE_URL, // origin must match your domain & subdomain
  icons: [`${import.meta.env.BASE_URL}/favicon.svg`],
};

let chains =
  import.meta.env.DEV || import.meta.env.MODE == "test"
    ? ([bnbTestNetwork] as const)
    : ([bsc] as const);

export const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: false, // Optional - true by default
  multiInjectedProviderDiscovery: true,
});

// console.log(window.ethereum);
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeVariables: {
    "--w3m-accent": "#ea6d28",
  },
  featuredWalletIds: [
    ...(window.ethereum
      ? []
      : ["c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96"]),
    ...(window.okxwallet
      ? []
      : ["971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709"]),
    ...(window.bitkeep?.ethereum
      ? []
      : ["38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662"]),
    ...(window.ethereum?.isTokenPocket
      ? []
      : ["20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66"]),
  ],
  allWallets: "HIDE",
});

export function WalletProvider({ children }: PropsWithChildren) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

declare global {
  interface Window {
    ethereum?: { isTokenPocket?: boolean };
    okxwallet: {
      bitcoin: any;
    };
    unisat: any;
    bitkeep?: { ethereum?: any };
  }
}
