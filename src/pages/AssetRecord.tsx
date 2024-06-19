/*
 * @LastEditors: John
 * @Date: 2024-06-18 17:57:13
 * @LastEditTime: 2024-06-19 14:19:55
 * @Author: John
 */
import Tabs from "antd-mobile/es/components/tabs";
import classes from "./AssetRecord.module.css";
import { cn } from "@/utils";
import CapsuleTabs from "antd-mobile/es/components/capsule-tabs";
import RecordsItem from "@/components/RecordsItem";
import { useTranslation } from "react-i18next";

export default function () {
  const { t } = useTranslation();
  return (
    <>
      <Tabs className={cn(classes.AssetRecord)}>
        <Tabs.Tab className={classes.tab} title={t("发放记录")} key="1">
          <CapsuleTabs>
            <CapsuleTabs.Tab title={t("所有")} key="1" />
            <CapsuleTabs.Tab title={t("升级费平分")} key="2" />
            <CapsuleTabs.Tab title={t("直推>20NFT")} key="3" />
          </CapsuleTabs>
          <ul className={classes.recordsList}>
            <li>
              <RecordsItem
                itemList={[
                  {
                    title: t("奖励类型"),
                    value: t("升级费平分"),
                  },
                  { title: t("发放时间"), value: "2024-06-01 12:23:45" },
                  { title: t("发放数量"), value: "2.00 USDT" },
                ]}
              />
            </li>

            <li>
              <RecordsItem
                itemList={[
                  {
                    title: t("奖励类型"),
                    value: t("直推>20NFT"),
                  },
                  { title: t("发放时间"), value: "2024-06-01 12:23:45" },
                  { title: t("发放数量"), value: "2.00 USDT" },
                ]}
              />
            </li>
          </ul>
        </Tabs.Tab>
        <Tabs.Tab className={classes.tab} title={t("领取记录")} key="2">
          <ul className={classes.recordsList}>
            <li>
              <RecordsItem
                itemList={[
                  {
                    title: t("领取时间"),
                    value: "2024-06-01 12:23:45",
                  },
                  { title: t("领取数量"), value: "2.00 USDT" },
                  {
                    title: t("领取状态"),
                    value: t("确认中"),
                    valueColor: "#FC872B",
                  },
                ]}
              />
            </li>
            <li>
              <RecordsItem
                itemList={[
                  {
                    title: t("领取时间"),
                    value: "2024-06-01 12:23:45",
                  },
                  { title: t("领取数量"), value: "2.00 USDT" },
                  {
                    title: t("领取状态"),
                    value: t("领取成功"),
                    valueColor: "#38C979",
                  },
                ]}
              />
            </li>
            <li>
              <RecordsItem
                itemList={[
                  {
                    title: t("领取时间"),
                    value: "2024-06-01 12:23:45",
                  },
                  { title: t("领取数量"), value: "2.00 USDT" },
                  {
                    title: t("领取状态"),
                    value: t("交易取消"),
                    valueColor: "#C94738",
                  },
                ]}
              />
            </li>
          </ul>
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
