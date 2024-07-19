/*
 * @LastEditors: John
 * @Date: 2024-06-19 15:48:57
 * @LastEditTime: 2024-07-19 14:09:28
 * @Author: John
 */
import { config } from "@/components/WalletProvider";
import {
  readContract,
  estimateGas,
  writeContract,
  waitForTransactionReceipt,
  getAccount,
} from "@wagmi/core";
import { encodeFunctionData } from "viem/utils";
import erc20Abi from "@/contract/abi/erc20abi.json";
import usdtAbi from "@/contract/abi/USDT.json";
import RedDevilsAbi from "@/contract/abi/RedDevils.json";
import receiveAbi from "@/contract/abi/receive.json";
import i18next from "i18next";
import { BaseError } from "wagmi";
import { UserIncome } from "@/server/module";

/**
 * @description 获取代币余额
 * @param {string} fromAddress
 * @return {*}
 */
export const getBalance = async (): Promise<bigint> => {
  return new Promise((reslove, reject) => {
    const fromAddress = getAccount(config).address;
    if (!fromAddress) return reject(new Error("address is emtiy"));
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
          reject(new BaseError("get balance of usdt error!"));
          return;
        }
        reslove(res);
      })
      .catch((err: BaseError) => {
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
export const getApproveUsdt = async (): Promise<bigint> => {
  return new Promise((reslove, reject) => {
    const fromAddress = getAccount(config).address;
    if (!fromAddress) return reject(new Error("address is emtiy"));

    readContract(config, {
      abi: erc20Abi,
      address: import.meta.env.VITE_NETWORK_USDT_ADDRESS,
      functionName: "allowance",
      args: [fromAddress, import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS],
    })
      .then((res: any) => {
        console.log("上次授权的U:", res);
        if (typeof res == "undefined") {
          // 获取授权U失败
          reject(new BaseError("get approve usdt error"));
          return;
        }
        reslove(res);
      })
      .catch((err: BaseError) => {
        console.log("get approve usdt error", err);
        reject(err);
      });
  });
};

/**
 * @description: 授权U
 * @param {bigint} uNum
 * @return {*}
 */
export const authorizedU = async (uNum: bigint) => {
  console.log(
    "授权金额参数：",
    import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS,
    uNum
  );
  return new Promise<void>((reslove, reject) => {
    estimateGas(config, {
      to: import.meta.env.VITE_NETWORK_USDT_ADDRESS,
      data: encodeFunctionData({
        abi: usdtAbi,
        functionName: "approve",
        args: [import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS, uNum],
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
          args: [import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS, uNum],
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
          .catch((err: BaseError) => {
            console.log("approve error", err);
            reject(err);
          });
      })
      .catch((err: BaseError) => {
        console.log("estimate approve gas error", err);
        reject(err);
      });
  });
};

/**
 * payByContract
 * @param amount
 * @param orderID
 * @returns
 */
export async function payByContract(
  amount: bigint,
  orderID: string,
  payInduction: number
) {
  console.log("pay buy contract params", { amount, orderID });
  console.log("NETWORK_USDT:", import.meta.env.VITE_NETWORK_USDT_ADDRESS);

  return new Promise<string>(async (reslove, reject) => {
    try {
      const balance = await getBalance();
      if (balance < amount) {
        console.log("用户代币余额不足");
        reject(new BaseError(i18next.t("余额不足")));
        return;
      }

      console.log("当前要授权的U:", amount);
      let approvedU = await getApproveUsdt();
      if (approvedU < amount) {
        await authorizedU(amount);
      }
      const NFTURI =
        "https://gateway.lighthouse.storage/ipfs/bafkreicjdund46333jhrj556kkdsi7bqupyt2qi3lmylmtxcfiw7f2afe4";
      console.log("参数:", amount, orderID, payInduction, NFTURI);
      estimateGas(config, {
        to: import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: RedDevilsAbi,
          functionName: "buyEquityNFT",
          args: [amount, orderID, payInduction, NFTURI],
        }),
      })
        .then((gas) => {
          const gasPrice = (gas * 12n) / 10n;
          console.log("estimate gas:%d , my gas: %d", gas, gasPrice);
          writeContract(config, {
            abi: RedDevilsAbi,
            address: import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS,
            functionName: "buyEquityNFT",
            args: [amount, orderID, payInduction, NFTURI],
            gas: gasPrice,
          })
            .then((receipt) => {
              console.log("write contract success!, receipt:", receipt);
              reslove(receipt);
            })
            .catch((err: BaseError) => {
              console.log("buyEquityNFT Transaction err", err);
              reject(err);
            });
        })
        .catch((err: BaseError) => {
          console.log("buyEquityNFT estimateGas err", err);
          reject(err);
        });
    } catch (err) {
      console.log("pay By Contract catch err", err);
      if (typeof err == "string") return reject(new BaseError(`${err}`));
      return reject(err);
    }
  });
}

/**
 * upGradeByContract
 * @param amount
 * @param orderID
 * @returns
 */
export async function upGradeByContract(amount: bigint, orderID: string) {
  console.log("pay buy contract params", { amount, orderID });
  console.log("NETWORK_USDT:", import.meta.env.VITE_NETWORK_USDT_ADDRESS);

  return new Promise<string>(async (reslove, reject) => {
    try {
      const balance = await getBalance();
      if (balance < amount) {
        console.log("用户代币余额不足");
        reject(new BaseError(i18next.t("余额不足")));
        return;
      }

      console.log("当前要授权的U:", amount);
      let approvedU = await getApproveUsdt();
      if (approvedU < amount) {
        await authorizedU(amount);
      }

      console.log("参数:", amount, orderID);
      estimateGas(config, {
        to: import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: RedDevilsAbi,
          functionName: "upgradePrivilege",
          args: [amount, orderID],
        }),
      })
        .then((gas) => {
          const gasPrice = (gas * 12n) / 10n;
          console.log("estimate gas:%d , my gas: %d", gas, gasPrice);
          writeContract(config, {
            abi: RedDevilsAbi,
            address: import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS,
            functionName: "upgradePrivilege",
            args: [amount, orderID],
            gas: gasPrice,
          })
            .then((receipt) => {
              console.log("write contract success!, receipt:", receipt);
              reslove(receipt);
            })
            .catch((err: BaseError) => {
              console.log("upgradePrivilege Transaction err", err);
              reject(err);
            });
        })
        .catch((err: BaseError) => {
          console.log("upgradePrivilege estimateGas err", err);
          reject(err);
        });
    } catch (err) {
      reject(new BaseError(`${err}`));
    }
  });
}

/**
 * receiveRMABByContract
 * @param amount
 * @param paymentTime
 * @param orderID
 * @param hashStr
 * @returns
 */
export async function receiveRMABByContract(
  amount: bigint,
  paymentTime: number,
  orderID: string,
  hashStr: string
) {
  console.log("pay buy contract params", { amount, orderID });

  return new Promise<string>(async (reslove, reject) => {
    try {
      console.log("参数:", amount, paymentTime, orderID, hashStr);
      estimateGas(config, {
        to: import.meta.env.VITE_RECEIVE_RAMB_CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: receiveAbi,
          functionName: "reward",
          args: [amount, paymentTime, orderID, hashStr],
        }),
      })
        .then((gas) => {
          const gasPrice = (gas * 12n) / 10n;
          console.log("estimate gas:%d , my gas: %d", gas, gasPrice);
          writeContract(config, {
            abi: receiveAbi,
            address: import.meta.env.VITE_RECEIVE_RAMB_CONTRACT_ADDRESS,
            functionName: "reward",
            args: [amount, paymentTime, orderID, hashStr],
            gas: gasPrice,
          })
            .then((receipt) => {
              console.log("write contract success!, receipt:", receipt);
              reslove(receipt);
            })
            .catch((err: BaseError) => {
              console.log("reward rmab Transaction err", err);
              reject(err);
            });
        })
        .catch((err: BaseError) => {
          console.log("reward rmab estimateGas err", err);
          reject(err);
        });
    } catch (err) {
      reject(new BaseError(`${err}`));
    }
  });
}

/**
 * receiveUSDTByContract
 * @param amount
 * @param paymentTime
 * @param orderID
 * @param hashStr
 * @returns
 */
export async function receiveUSDTByContract(
  amount: bigint,
  paymentTime: number,
  orderID: string,
  hashStr: string
) {
  console.log("pay buy contract params", { amount, orderID });

  return new Promise<string>(async (reslove, reject) => {
    try {
      console.log("参数:", amount, paymentTime, orderID, hashStr);
      estimateGas(config, {
        to: import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: RedDevilsAbi,
          functionName: "reward",
          args: [amount, paymentTime, orderID, hashStr],
        }),
      })
        .then((gas) => {
          const gasPrice = (gas * 12n) / 10n;
          console.log("estimate gas:%d , my gas: %d", gas, gasPrice);
          writeContract(config, {
            abi: RedDevilsAbi,
            address: import.meta.env.VITE_PURCHASED_CONTRACT_ADDRESS,
            functionName: "reward",
            args: [amount, paymentTime, orderID, hashStr],
            gas: gasPrice,
          })
            .then((receipt) => {
              console.log("write contract success!, receipt:", receipt);
              reslove(receipt);
            })
            .catch((err: BaseError) => {
              console.log("reward Transaction err", err);
              reject(err);
            });
        })
        .catch((err: BaseError) => {
          console.log("reward estimateGas err", err);
          reject(err);
        });
    } catch (err) {
      reject(new BaseError(`${err}`));
    }
  });
}

/**
 * receiveByContract
 * @param type
 * @param amount
 * @param paymentTime
 * @param orderID
 * @param hashStr
 * @returns
 */
export async function receiveByContract(
  type: UserIncome["coinId"],
  amount: bigint,
  paymentTime: number,
  orderID: string,
  hashStr: string
) {
  if (type == 1) {
    return receiveUSDTByContract(amount, paymentTime, orderID, hashStr);
  } else if (type == 2) {
    return receiveRMABByContract(amount, paymentTime, orderID, hashStr);
  }
}
