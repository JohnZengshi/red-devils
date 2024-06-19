/*
 * @LastEditors: John
 * @Date: 2024-06-19 10:43:03
 * @LastEditTime: 2024-06-19 14:25:41
 * @Author: John
 */
import RecordsItem from "@/components/RecordsItem";
import CapsuleTabs from "antd-mobile/es/components/capsule-tabs";
import Tabs from "antd-mobile/es/components/tabs";
import classes from "./AirDropRecord.module.css";
import { useTranslation } from "react-i18next";
export default function () {
  const { t } = useTranslation();
  return (
    <>
      <Tabs className={classes.AirDropRecord}>
        <Tabs.Tab title={t("空投记录")} key="1">
          <CapsuleTabs>
            <CapsuleTabs.Tab title={t("所有")} key="1" />
            <CapsuleTabs.Tab title={t("NFT空投")} key="2" />
            <CapsuleTabs.Tab title={t("社长空投")} key="3" />
            <CapsuleTabs.Tab title={t("基金会社长")} key="4" />
            <CapsuleTabs.Tab title={t("直推空投")} key="5" />
          </CapsuleTabs>
          <ul className={classes.recordsList}>
            {Array.from({ length: 20 }).map((v, i) => (
              <li key={i}>
                <RecordsItem
                  itemList={[
                    {
                      title: t("奖励类型"),
                      value: t("NFT控投"),
                    },
                    { title: t("发放时间"), value: "2024-06-01 12:23:45" },
                    { title: t("发放数量"), value: "2.00 RMOB" },
                  ]}
                />
              </li>
            ))}
          </ul>
        </Tabs.Tab>
        <Tabs.Tab title={t("领取记录")} key="2">
          <ul className={classes.recordsList}>
            <li>
              <RecordsItem
                itemList={[
                  {
                    title: t("领取时间"),
                    value: "2024-06-01 12:23:45",
                  },
                  { title: t("领取数量"), value: "2.00 RMOB" },
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
