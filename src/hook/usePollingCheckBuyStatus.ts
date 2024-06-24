/*
 * @LastEditors: John
 * @Date: 2024-06-21 16:08:23
 * @LastEditTime: 2024-06-21 16:12:31
 * @Author: John
 */
import { useRef, useState } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/components/WalletProvider";
/**
 * @description: 轮询查询交易,获取nft
 * @return {*}
 */
export default function (type: "NFT" | "NORMAL") {
  const [buyNftIds, setBuyNftIds] = useState<string>("");
  const [transcationStatus, setTranscationStatus] = useState<
    "success" | undefined
  >(undefined);
  const stop = useRef(false);

  function startPollingCheckBuyStatus(hash: string) {
    setTranscationStatus(undefined);
    setBuyNftIds("");
    polling(hash);
  }

  const checkStatus = async (hash: string) => {
    return new Promise<void>(async (reslove) => {
      // let res = await API_GET_ORDER_STATE_BY_HASH(hash);
      // setBuyNftIds(res.nftIds);
      // console.log("得到nft ids:", res.nftIds);

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: hash as `0x${string}`,
      });

      console.log("transaction receipt:", transactionReceipt);
      if (transactionReceipt.status == "success") {
        if (type == "NFT") {
          console.log("transaction receipt success:", transactionReceipt);
          const nftLogs = transactionReceipt.logs.filter(
            (v) =>
              v.topics.length === 4 &&
              v.topics[1] ===
                "0x0000000000000000000000000000000000000000000000000000000000000000"
          ); // 过滤（挖币的日志）
          const nftDataArr = nftLogs.map((v) => v.topics[3]);
          const nftDataStr = nftDataArr.map(
            (v) => `#${parseInt(v as string, 16)}`
          );
          setBuyNftIds(nftDataStr.join(","));
        } else {
          setTranscationStatus("success");
          stopPollingCheckBuyStatus();
          reslove();
          return;
        }
      }

      setTimeout(() => {
        reslove();
      }, 2000);
    });
  };

  const polling = async (hash: string) => {
    await checkStatus(hash);
    if (stop.current) return;
    polling(hash);
  };

  function stopPollingCheckBuyStatus() {
    stop.current = true;
  }

  return {
    transcationStatus,
    setBuyNftIds,
    buyNftIds,
    startPollingCheckBuyStatus,
    stopPollingCheckBuyStatus,
  };
}
