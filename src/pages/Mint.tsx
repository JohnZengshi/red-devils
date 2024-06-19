/*
 * @LastEditors: John
 * @Date: 2024-06-18 15:28:03
 * @LastEditTime: 2024-06-19 14:06:59
 * @Author: John
 */
import { cn } from "@/utils";
import classes from "./Mint.module.css";
import nft_bg from "@/assets/nft_bg.svg";
import Button from "antd-mobile/es/components/button";
import Space from "antd-mobile/es/components/space";
import { useTranslation } from "react-i18next";
export default function () {
  const { t } = useTranslation();
  return (
    <>
      <div className={cn(classes.Mint, classes.container)}>
        <div className={classes.nftImg}>
          <img src={nft_bg} alt="" />
        </div>

        <ul>
          <li>
            <span>{t("NFT总量：")}</span>
            <span>20000</span>
          </li>

          <li>
            <span>{t("MINT余量：")}</span>
            <span>15000</span>
          </li>

          <li>
            <span>{t("当前MINT价格：")}</span>
            <span>110 USDT</span>
          </li>
        </ul>

        <div className={classes.des}>
          <span>{t("价格说明：")}</span>
          <span>
            {t(
              "100USDT起，每增加100名普通会员，NFT价格上涨1%，既：前100名价格为100USDT/枚，101-200名价格为100u+100u*1%=101USDT/枚，以此类推。"
            )}
          </span>
        </div>

        <Button className={classes.btn} fill="none">
          <Space>
            {/* <span>MINT</span> */}
            <span>{t("授权USDT")}</span>
            {/* <SpinLoading style={{ "--size": "20px" }} color="white" /> */}
          </Space>
        </Button>
      </div>
    </>
  );
}
