/*
 * @LastEditors: John
 * @Date: 2024-06-19 11:03:01
 * @LastEditTime: 2024-06-26 15:21:27
 * @Author: John
 */
import { api_preprelion_list } from "@/server/api";
import { PreprelionListItem } from "@/server/module";
import { getLevelName } from "@/utils";
import { Empty } from "antd-mobile";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useTranslation } from "react-i18next";

export default function () {
  const { t } = useTranslation();
  const [data, setData] = useState<PreprelionListItem[]>([]);
  const columns: TableColumn<PreprelionListItem>[] = [
    {
      name: t("地址"),
      selector: (row) => row.address,
      grow: 4,
    },
    {
      name: t("级别"),
      grow: 4,
      cell(row, rowIndex, column, id) {
        return <div>{getLevelName(row.level, row.userType)}</div>;
      },
    },
    {
      name: t("直推NFT"),
      selector: (row) => row.mintNumber,
      // @ts-ignore
      right: "true",
      grow: 2,
    },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await api_preprelion_list().send({});
      setData(data?.data || []);
    })();

    return () => {};
  }, []);

  return (
    <>
      <DataTable columns={columns} data={data} noDataComponent={<Empty />} />
    </>
  );
}
