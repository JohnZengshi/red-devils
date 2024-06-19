/*
 * @LastEditors: John
 * @Date: 2024-06-19 15:48:57
 * @LastEditTime: 2024-06-19 16:13:14
 * @Author: John
 */
import { config } from "@/components/WalletProvider";
import {
  readContract,
  estimateGas,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { encodeFunctionData } from "viem/utils";
import erc20Abi from "@/contract/abi/erc20abi.json";
import usdtAbi from "@/contract/abi/USDT.json";
import Toast from "antd-mobile/es/components/toast";

/**
 * @description 获取代币余额
 * @param {string} fromAddress
 * @return {*}
 */
export const getBalance = async (fromAddress: string): Promise<bigint> => {
  return new Promise((reslove, reject) => {
    readContract(config, {
      abi: erc20Abi,
      address: import.meta.env.VITE_NETWORK_USDT_ADDRESS,
      functionName: "balanceOf",
      args: [fromAddress],
    })
      .then((res: any) => {
        console.log("U余额:", res);
        if (typeof res == "undefined") {
          // 获取授权U失败
          Toast.show({
            icon: "fail",
            content: "get balance of usdt error!",
          });
          return;
        }
        reslove(res);
      })
      .catch((err) => {
        console.log("get balance of usdt err", err);
        reject(err);
      });
  });
};

/**
 * @description: 获取已经授权的U
 * @param {string} fromAddress
 * @return {*}
 */
export const getApproveUsdt = async (
  contractAddress: string,
  fromAddress: string
): Promise<bigint> => {
  return new Promise((reslove, reject) => {
    readContract(config, {
      abi: erc20Abi,
      address: import.meta.env.VITE_NETWORK_USDT_ADDRESS,
      functionName: "allowance",
      args: [fromAddress, contractAddress],
    })
      .then((res: any) => {
        console.log("上次授权的U:", res);
        if (typeof res == "undefined") {
          // 获取授权U失败
          Toast.show({
            icon: "fail",
            content: "get approve usdt error!",
          });
          return;
        }
        reslove(res);
      })
      .catch((err) => {
        console.log("get approve usdt err", err);
        reject(err);
      });
  });
};

/**
 * @description: 授权U
 * @param {bigint} uNum
 * @return {*}
 */
export const authorizedU = async (uNum: bigint, contractAddress: string) => {
  console.log("授权金额参数：", contractAddress, uNum);
  return new Promise<void>((reslove, reject) => {
    estimateGas(config, {
      to: import.meta.env.VITE_NETWORK_USDT_ADDRESS,
      data: encodeFunctionData({
        abi: usdtAbi,
        functionName: "approve",
        args: [contractAddress, uNum],
      }),
    })
      .then((gas) => {
        const gasPrice = (gas * 12n) / 10n;
        console.log(
          "estimate approve gas:%d , my approve gas: %d",
          gas,
          gasPrice
        );

        writeContract(config, {
          abi: usdtAbi,
          address: import.meta.env.VITE_NETWORK_USDT_ADDRESS,
          functionName: "approve",
          args: [contractAddress, uNum],
          gas: gasPrice,
          // gas,
        })
          .then(async (hash) => {
            console.log("approve res", hash);
            const transactionReceipt = await waitForTransactionReceipt(config, {
              hash,
            });
            if (transactionReceipt.status == "success") reslove();
          })
          .catch((err) => {
            console.log("approve error", err);
            reject(err);
          });
      })
      .catch((err) => {
        console.log("estimate approve gas error", err);
        reject(err);
      });
  });
};
