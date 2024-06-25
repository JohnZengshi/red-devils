import IconFont from "@/components/iconfont";
import classes from "./LevelUp.module.css";
import { cn, getLevelName } from "@/utils";
import Button from "antd-mobile/es/components/button";
import Space from "antd-mobile/es/components/space";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  api_get_user_upgrade_information,
  api_upgrade,
  api_users_cancel_orders,
} from "@/server/api";
import { UpgradeOrder, UserUpgradeInformation } from "@/server/module";
import Toast, { ToastHandler } from "antd-mobile/es/components/toast";
import {
  authorizedU,
  getApproveUsdt,
  getBalance,
  upGradeByContract,
} from "@/contract/utils";
import { toWei } from "web3-utils";
import usePollingCheckBuyStatus from "@/hook/usePollingCheckBuyStatus";
import { BaseError } from "wagmi";
import { Dialog } from "antd-mobile";
import { useNavigate } from "react-router-dom";
export default function () {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userUpgradeInfo, setUserUpgradeInfo] =
    useState<UserUpgradeInformation>();
  const [approveUsdt, setApproveUsdt] = useState<bigint>(0n);
  const [balance, setBalance] = useState<bigint>(0n);
  const approveLoadingToast = useRef<ToastHandler>();
  const approvePrice = useMemo(
    () => BigInt(toWei(userUpgradeInfo?.price || "0", "ether")),
    [userUpgradeInfo?.price]
  );
  const upgradeLoadingtoast = useRef<ToastHandler>();
  const orderInfo = useRef<UpgradeOrder>();

  const {
    transcationStatus,
    startPollingCheckBuyStatus,
    stopPollingCheckBuyStatus,
  } = usePollingCheckBuyStatus("NORMAL");
  useEffect(() => {
    updateUserUpgrdeInfo();
    return () => {};
  }, []);

  useEffect(() => {
    (async () => {
      if (userUpgradeInfo?.status != 1) return;
      Toast.show({ icon: "loading", content: t("正在获取已授权金额") });
      setBalance(await getBalance());
      setApproveUsdt(await getApproveUsdt());
      Toast.clear();
    })();

    return () => {};
  }, [userUpgradeInfo?.status]);

  useEffect(() => {
    console.log("approvePrice:", approvePrice);

    return () => {};
  }, [approvePrice]);

  useEffect(() => {
    if (transcationStatus == "success") {
      upgradeLoadingtoast.current?.close();
      stopPollingCheckBuyStatus();
      Dialog.alert({
        content: `${t("升级成功，返回首页查看")}`,
        confirmText: "OK",
        onConfirm() {
          navigate("/");
        },
      });
    }

    return () => {};
  }, [transcationStatus]);

  async function updateUserUpgrdeInfo() {
    const { data } = await api_get_user_upgrade_information().send({});
    // setUserUpgradeInfo({ ...data!.data, ...{ status: 1 } });
    setUserUpgradeInfo(data?.data);
  }

  return (
    <>
      <div className={cn(classes.LevelUp, classes.container)}>
        <div className={classes.content}>
          <div className={classes.content_box}>
            <div className={classes.box_item}>
              <span>{t("当前级别")}</span>
              <span>{getLevelName(userUpgradeInfo?.level || 0)}</span>
            </div>
            <IconFont
              className={classes.box_arrow}
              color="#fff"
              name="chevronsrightshuangyoujiantou"
            />
            <div className={classes.box_item}>
              <span>{t("提升级别")}</span>
              <span>{userUpgradeInfo?.level == 1 ? t("社长") : t("无")}</span>
            </div>
          </div>

          <div className={classes.content_price}>
            <span>{t("当前升级价格：")}</span>
            <span>{userUpgradeInfo?.price || 0} USDT</span>
          </div>

          <div className={classes.content_price_des}>
            <span>{t("价格说明：")}</span>
            <span>
              {t(
                "升级费用xxx USDT起，其中gas费2USDT，剩余部分50%进入资金池，另外50%平均分给所有升级成功的社长和基金会社长。自第二个社长升级开始，每升级一名社长所需铸造费用增加xxx，既第二位社长升级铸造费用为xxxu+xxx*xxx=xxx USDT，以此类推。",
                {
                  value1: userUpgradeInfo?.upgradeFees || 0,
                  value2: userUpgradeInfo?.proportion || "0%",
                  value3:
                    parseFloat(userUpgradeInfo?.upgradeFees || "0") +
                    (parseFloat(userUpgradeInfo?.upgradeFees || "0") *
                      parseFloat(
                        (userUpgradeInfo?.proportion || "0%").replace("%", "")
                      )) /
                      100,
                }
              )}
            </span>
          </div>

          <Button
            className={classes.content_btn}
            fill="none"
            disabled={userUpgradeInfo?.status != 1}
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
              // 升级
              upgradeLoadingtoast.current = Toast.show({
                icon: "loading",
                duration: 0,
                content: t("升级中"),
                maskClickable: false,
              });
              const { data: orderRes } = await api_upgrade().send({});
              orderInfo.current = orderRes?.data;
              if (!orderInfo.current?.orderNumber) return;
              const buyAmount = BigInt(orderInfo.current?.buyAmount || "");
              upGradeByContract(buyAmount, orderInfo.current?.orderNumber)
                .then((hash) => {
                  console.log("升级成功！hash:", hash);
                  updateUserUpgrdeInfo();
                  startPollingCheckBuyStatus(hash);
                })
                .catch(async (err: BaseError) => {
                  upgradeLoadingtoast.current?.close();
                  Toast.show({ content: err.shortMessage, icon: "fail" });
                  // 取消购买
                  await api_users_cancel_orders().send({
                    queryParams: { orderId: orderInfo.current?.id! },
                  });
                });
            }}
          >
            <Space>
              {userUpgradeInfo?.status == 1 ? (
                <>
                  {approveUsdt > 0n && <span>MINT</span>}
                  {approveUsdt === 0n && <span>{t("授权USDT")}</span>}
                </>
              ) : (
                <>
                  <span>{t("无级别提升")}</span>
                </>
              )}
            </Space>
          </Button>
        </div>

        <div className={classes.upgrade_conditions}>
          <span>{t("升级条件")}</span>
          <ul>
            <ConItem
              memberName={t("普通会员")}
              limitText={t("(限量xxx个)", {
                value: userUpgradeInfo?.ordinary || 0,
              })}
              conList={[
                t("1. MINT一枚NFT成为非活跃普通会员"),
                t("2. MINT NFT并推荐MINT成为活跃普通会员"),
                t("3. 享1%代币空投平分(所有普通会员)"),
                t("4. 活跃普通会员根据推荐MINT数量额外有空投权益。"),
              ]}
            />

            <ConItem
              memberName={t("社长")}
              limitText={t("(限量xxx个)", {
                value: userUpgradeInfo?.president || 0,
              })}
              conList={[
                t("1. 先成为活跃普通会员，并推荐MINT 20枚NFT"),
                t("2. 需支付100USDT起升级费用成为社长(第二个起递增10%)"),
                t("3. 享普通会员权益+0.5%空投代币平分(所有社长)"),
                t("4. 享社长升级费用50%平分(扣除2USDT GAS费后)"),
                t("5. 从推荐MINT 21枚开始直推的铸造费用归社长所有"),
              ]}
            />

            <ConItem
              memberName={t("基金会社长")}
              limitText={t("(限量xxx个)", {
                value: userUpgradeInfo?.foundation || 0,
              })}
              conList={[
                t("1. 先成为社长，并团队中有20个社长"),
                t("2. 享社长权益+0.5%空投代币平分(所有基金会社长)"),
                t("3. 另外基金会社长参与所有项目分成"),
              ]}
            />
          </ul>
        </div>
      </div>
    </>
  );
}

function ConItem({
  memberName,
  limitText,
  conList,
}: PropsWithChildren<{
  memberName: string;
  limitText: string;
  conList: string[];
}>) {
  return (
    <li>
      <div>
        <span>{memberName}</span>
        <span>{limitText}</span>
      </div>
      <ul>
        {conList.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </li>
  );
}
