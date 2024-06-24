/*
 * @LastEditors: John
 * @Date: 2024-06-18 15:28:03
 * @LastEditTime: 2024-06-24 11:08:14
 * @Author: John
 */
import { cn } from "@/utils";
import classes from "./Mint.module.css";
import nft_bg from "@/assets/nft_bg.svg";
import Button from "antd-mobile/es/components/button";
import Space from "antd-mobile/es/components/space";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  api_get_nft_configuration_data,
  api_nft_order,
  api_users_cancel_orders,
} from "@/server/api";
import { NftConfigurationData, NftOrder } from "@/server/module";
import {
  authorizedU,
  getApproveUsdt,
  getBalance,
  payByContract,
} from "@/contract/utils";
import { Dialog, Modal, Toast } from "antd-mobile";
import useUserStore from "@/store/User";
import usePollingCheckBuyStatus from "@/hook/usePollingCheckBuyStatus";
import { ToastHandler } from "antd-mobile/es/components/toast";
import { BaseError } from "wagmi";
import { useNavigate } from "react-router-dom";
import { toWei } from "web3-utils";
export default function () {
  const { t } = useTranslation();
  const { Token } = useUserStore();
  const [nftConfig, setNftConfig] = useState<NftConfigurationData>();
  const [approveUsdt, setApproveUsdt] = useState<bigint>(0n);
  const [balance, setBalance] = useState<bigint>(0n);
  const orderInfo = useRef<NftOrder>();
  const navigate = useNavigate();

  const buyLoadingToast = useRef<ToastHandler>();
  const approveLoadingToast = useRef<ToastHandler>();
  const { buyNftIds, startPollingCheckBuyStatus } =
    usePollingCheckBuyStatus("NFT");

  const approvePrice = useMemo(
    () => BigInt(toWei(nftConfig?.nftPrice || "0", "ether")),
    [nftConfig?.nftPrice]
  );

  useEffect(() => {
    updateNftConfig();

    return () => {};
  }, []);

  useEffect(() => {
    (async () => {
      Toast.show({ icon: "loading", content: t("正在获取已授权金额") });
      setBalance(await getBalance());
      setApproveUsdt(await getApproveUsdt());
      Toast.clear();
    })();

    return () => {};
  }, [Token]);

  async function updateNftConfig() {
    const { data } = await api_get_nft_configuration_data().send({});
    setNftConfig(data?.data);
  }
  useEffect(() => {
    if (buyNftIds) {
      buyLoadingToast.current?.close();
      Dialog.alert({
        content: `${t("MINT成功，返回首页查看")}`,
        confirmText: "OK",
        onConfirm() {
          navigate("/");
        },
      });
    }

    return () => {};
  }, [buyNftIds]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className={cn(classes.Mint, classes.container)}>
        <div className={classes.nftImg}>
          <img src={nft_bg} alt="" />
        </div>

        <ul>
          <li>
            <span>{t("NFT总量：")}</span>
            <span>{nftConfig?.nftCount || 0}</span>
          </li>

          <li>
            <span>{t("MINT余量：")}</span>
            <span>{nftConfig?.nftRemainder || 0}</span>
          </li>

          <li>
            <span>{t("当前MINT价格：")}</span>
            <span>{nftConfig?.nftPrice || 0} USDT</span>
          </li>
        </ul>

        <div className={classes.des}>
          <span>{t("价格说明：")}</span>
          <span>
            {t(
              "{{value1}} USDT起，每增加 {{value2}} 名普通会员，NFT价格上涨 {{value3}}，既：前 {{value2}} 名价格为 {{value1}} USDT/枚，value4 名价格为{{value1}}u+{{value1}}u*{{value3}}={{value5}} USDT/枚，以此类推。",
              {
                value1: nftConfig?.initialPrice || 0,
                value2: nftConfig?.floatingQuantity || 0,
                value3: nftConfig?.kamibutsu || "0%",
                value4: `${
                  parseInt(nftConfig?.floatingQuantity || "0") + 1
                } - ${parseInt(nftConfig?.floatingQuantity || "0") * 2}`,
                value5:
                  parseFloat(nftConfig?.initialPrice || "0") +
                  (parseFloat(nftConfig?.initialPrice || "0") *
                    parseFloat(
                      (nftConfig?.kamibutsu || "0%").replace("%", "")
                    )) /
                    100,
              }
            )}
          </span>
        </div>

        <Button
          className={classes.btn}
          fill="none"
          onClick={async () => {
            if (balance <= 0n) {
              Toast.show({ icon: "fail", content: t("余额不足") });
              return;
            }

            // 授权
            if (approveUsdt === 0n) {
              approveLoadingToast.current = Toast.show({
                icon: "loading",
                duration: 0,
                content: t("正在授权USDT"),
              });
              authorizedU(approvePrice)
                .then(async () => {
                  setApproveUsdt(await getApproveUsdt());
                  approveLoadingToast.current?.close();
                })
                .catch((err) => {
                  Toast.show({ content: err.shortMessage, icon: "fail" });
                });

              return;
            }

            // 购买
            buyLoadingToast.current = Toast.show({
              icon: "loading",
              duration: 0,
              content: t("购买中"),
              maskClickable: false,
            });
            const { data: orderRes } = await api_nft_order().send({});
            orderInfo.current = orderRes?.data;
            if (!orderInfo.current?.orderNumber) return;
            const buyAmount = BigInt(orderInfo.current?.buyAmount || "");
            payByContract(buyAmount, orderInfo.current?.orderNumber)
              .then((hash) => {
                console.log("购买成功！hash:", hash);
                updateNftConfig();
                startPollingCheckBuyStatus(hash);
              })
              .catch(async (err: BaseError) => {
                buyLoadingToast.current?.close();
                Toast.show({
                  content: err.shortMessage,
                  icon: "fail",
                });
                // 取消购买
                await api_users_cancel_orders().send({
                  queryParams: { orderId: orderInfo.current?.id! },
                });
              });
          }}
        >
          <Space>
            {approveUsdt > 0n && <span>MINT</span>}
            {approveUsdt === 0n && <span>{t("授权USDT")}</span>}
          </Space>
        </Button>
      </div>
    </>
  );
}
