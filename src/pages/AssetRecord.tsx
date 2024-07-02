/*
 * @LastEditors: John
 * @Date: 2024-06-18 17:57:13
 * @LastEditTime: 2024-07-02 17:43:52
 * @Author: John
 */
import Tabs from "antd-mobile/es/components/tabs";
import classes from "./AssetRecord.module.css";
import { cn, getUrlParameterByName } from "@/utils";
import CapsuleTabs from "antd-mobile/es/components/capsule-tabs";
import RecordsItem from "@/components/RecordsItem";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { api_pagling_query_income_record } from "@/server/api";
import { IncomeRecord, IncomeRecordType } from "@/server/module";
import { Empty, InfiniteScroll } from "antd-mobile";

export default function () {
  const { t } = useTranslation();
  const id = useMemo(() => getUrlParameterByName("id"), []);
  const coinId = useMemo(() => getUrlParameterByName("coinId"), []);
  const currentType = useRef<1 | 2>(2);
  const [issueRecords, setIssueRecords] = useState<IncomeRecord["records"]>([]);
  const [receiveRecord, setReceiveRecord] = useState<IncomeRecord["records"]>(
    []
  );
  const conditions = useRef<IncomeRecordType>();

  const pageNum = useRef<number>(0);
  const hasMore = useRef<boolean>(true);
  useEffect(() => {
    return () => {};
  }, []);

  async function getRecord() {
    return new Promise<void>(async (reslove) => {
      if (!id) return;

      if (!hasMore.current) return;

      const pageSize = 20;
      pageNum.current++;
      const { data } = await api_pagling_query_income_record().send({
        queryParams: {
          id,
          type: currentType.current,
          pageNum: pageNum.current,
          pageSize,
          ...(conditions.current && currentType.current == 2
            ? { status: conditions.current }
            : {}),
        },
      });

      if (!data?.data.records) return;

      if (data.data.records.length < pageSize) hasMore.current = false;

      if (currentType.current == 2) {
        setIssueRecords([...issueRecords, ...data?.data.records]);
      } else {
        setReceiveRecord([...receiveRecord, ...data?.data.records]);
      }
      reslove();
    });
  }

  function resetPaging() {
    if (currentType.current == 2) {
      setIssueRecords([]);
    } else if (currentType.current == 1) {
      setReceiveRecord([]);
    }
    pageNum.current = 0;
    hasMore.current = true;
  }

  return (
    <>
      <Tabs
        className={cn(classes.AssetRecord)}
        onChange={(key) => {
          if (parseInt(key) == 1) {
            currentType.current = 2;
            resetPaging();
          } else {
            currentType.current = 1;
            resetPaging();
          }
        }}
      >
        <Tabs.Tab className={classes.tab} title={t("发放记录")} key="1">
          {coinId == "1" && (
            <CapsuleTabs
              onChange={(key) => {
                switch (key) {
                  case "1":
                    conditions.current = undefined;
                    break;
                  case "2":
                    conditions.current = 5;
                    break;
                  case "3":
                    conditions.current = 4;
                    break;

                  default:
                    break;
                }
                resetPaging();
              }}
            >
              <CapsuleTabs.Tab title={t("所有")} key="1" />
              <CapsuleTabs.Tab title={t("升级费平分")} key="2" />
              <CapsuleTabs.Tab title={t("直推>20NFT")} key="3" />
            </CapsuleTabs>
          )}

          {coinId == "2" && (
            <CapsuleTabs
              onChange={(key) => {
                switch (key) {
                  case "1":
                    conditions.current = undefined;
                    break;
                  case "2":
                    conditions.current = 6;
                    break;
                  case "3":
                    conditions.current = 7;
                    break;
                  case "4":
                    conditions.current = 8;
                    break;
                  case "5":
                    conditions.current = 9;
                    break;
                  default:
                    break;
                }
                resetPaging();
              }}
            >
              <CapsuleTabs.Tab title={t("所有")} key="1" />
              <CapsuleTabs.Tab title={t("NFT空投")} key="2" />
              <CapsuleTabs.Tab title={t("社长空投")} key="3" />
              <CapsuleTabs.Tab title={t("基金会社长")} key="4" />
              <CapsuleTabs.Tab title={t("直推空投")} key="5" />
            </CapsuleTabs>
          )}
          <ul className={classes.recordsList}>
            {issueRecords?.map((v, i) => (
              <li key={i}>
                <RecordsItem
                  itemList={[
                    {
                      title: t("奖励类型"),
                      value: v.extRemark,
                    },
                    { title: t("发放时间"), value: v.createTime },
                    { title: t("发放数量"), value: `${v.opValue} USDT` },
                  ]}
                />
              </li>
            ))}
            {issueRecords?.length == 0 && <Empty />}
            <InfiniteScroll loadMore={getRecord} hasMore={hasMore.current}>
              <span>{t("没有更多数据了")}</span>
            </InfiniteScroll>
          </ul>
        </Tabs.Tab>
        <Tabs.Tab className={classes.tab} title={t("领取记录")} key="2">
          <ul className={classes.recordsList}>
            {receiveRecord?.map((v, i) => (
              <li key={i}>
                <RecordsItem
                  itemList={[
                    {
                      title: t("领取时间"),
                      value: v.createTime,
                    },
                    { title: t("领取数量"), value: `${v.opValue} USDT` },
                    {
                      title: t("领取状态"),
                      ...(v.type == 1 && {
                        value: t("领取成功"),
                        valueColor: "#38C979",
                      }),
                      ...(v.type == 3 && {
                        value: t("确认中"),
                        valueColor: "#FC872B",
                      }),
                      ...(v.type == 4 && {
                        value: t("交易取消"),
                        valueColor: "#C94738",
                      }),
                    },
                  ]}
                />
              </li>
            ))}
            {receiveRecord?.length == 0 && <Empty />}
            <InfiniteScroll loadMore={getRecord} hasMore={hasMore.current}>
              <span>{t("没有更多数据了")}</span>
            </InfiniteScroll>
          </ul>
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
