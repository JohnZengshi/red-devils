import IconFont from "@/components/iconfont";
import classes from "./LevelUp.module.css";
import { cn } from "@/utils";
import Button from "antd-mobile/es/components/button";
import Space from "antd-mobile/es/components/space";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
export default function () {
  const { t } = useTranslation();
  return (
    <>
      <div className={cn(classes.LevelUp, classes.container)}>
        <div className={classes.content}>
          <div className={classes.content_box}>
            <div className={classes.box_item}>
              <span>{t("当前级别")}</span>
              <span>{t("普通活跃")}</span>
            </div>
            <IconFont
              className={classes.box_arrow}
              color="#fff"
              name="chevronsrightshuangyoujiantou"
            />
            <div className={classes.box_item}>
              <span>{t("提升级别")}</span>
              <span>{t("社长")}</span>
            </div>
          </div>

          <div className={classes.content_price}>
            <span>{t("当前升级价格：")}</span>
            <span>110 USDT</span>
          </div>

          <div className={classes.content_price_des}>
            <span>{t("价格说明：")}</span>
            <span>
              {t(
                "升级费用100USDT起，其中gas费2USDT，剩余部分50%进入资金池，另外50%平均分给所有升级成功的社长和基金会社长。自第二个社长升级开始，每升级一名社长所需铸造费用增加10%，既第二位社长升级铸造费用为100u+100*10%=110USDT，以此类推。"
              )}
            </span>
          </div>

          <Button className={classes.content_btn} fill="none">
            <Space>
              {/* <span>MINT</span> */}
              <span>{t("授权USDT")}</span>
              {/* <SpinLoading style={{ "--size": "20px" }} color="white" /> */}
            </Space>
          </Button>
        </div>

        <div className={classes.upgrade_conditions}>
          <span>{t("升级条件")}</span>
          <ul>
            <ConItem
              memberName={t("普通会员")}
              limitText={t("(限量20000个)")}
              conList={[
                t("1. MINT一枚NFT成为非活跃普通会员"),
                t("2. MINT NFT并推荐MINT成为活跃普通会员"),
                t("3. 享1%代币空投平分(所有普通会员)"),
                t("4. 活跃普通会员根据推荐MINT数量额外有空投权益。"),
              ]}
            />

            <ConItem
              memberName={t("社长")}
              limitText={t("(限量500个)")}
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
              limitText={t("(限量20个)")}
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
