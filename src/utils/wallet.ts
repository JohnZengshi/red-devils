/*
 * @LastEditors: John
 * @Date: 2024-06-19 15:55:07
 * @LastEditTime: 2024-06-19 15:56:45
 * @Author: John
 */
import { config } from "@/components/WalletProvider";
import {
  writeContract,
  readContract,
  estimateGas,
  waitForTransactionReceipt,
  getConnectorClient,
  getChains,
  switchChain,
  getChainId,
} from "@wagmi/core";

/**
 * @description: 检测网络并切换
 * @return {*}
 */
export function checkNetWork(): Promise<void> {
  return new Promise<void>(async (reslove, reject) => {
    // TODO 切换网络✔
    const chains = getChains(config);
    let chainId = getChainId(config);
    // console.log("all chains:", chains);
    console.log("current chain id:", chainId);
    let netWork = chains.find(
      (v) => v.id == import.meta.env.VITE_PARTICIPATE_CHAIN_ID
    );
    console.log("participate network:", netWork);
    if (chainId != netWork?.id && netWork) {
      try {
        await switchChain(config, {
          chainId: netWork.id,
        });

        const timer = setInterval(() => {
          chainId = getChainId(config);
          console.log("current chain id:", chainId);
          if (chainId == netWork?.id) {
            console.log("switch chain success!");
            reslove();
            clearInterval(timer);
          }
        }, 1000);
      } catch (error) {
        // TODO 切换网络失败，自动添加网络✔
        console.error("switch chain error:", error);
      }
    } else {
      reslove();
    }
  });
}
