/*
 * @LastEditors: John
 * @Date: 2024-06-19 11:03:01
 * @LastEditTime: 2024-06-19 17:33:25
 * @Author: John
 */
import { shortenString } from "@/utils";
import Ellipsis from "antd-mobile/es/components/ellipsis";
import DataTable, { TableColumn } from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";

interface DataRow {
  id: number;
  address: string;
  level: string;
  nft: number;
}
export default function () {
  const { address } = useAccount();
  const { t } = useTranslation();
  const columns: TableColumn<DataRow>[] = [
    {
      name: t("地址"),
      selector: (row) => row.address,
      grow: 4,
      // cell(row, rowIndex, column, id) {
      //   return <Ellipsis direction="middle" content={row.address} />;
      // },
    },
    {
      name: t("级别"),
      selector: (row) => row.level,
      grow: 4,
    },
    {
      name: t("直推NFT"),
      selector: (row) => row.nft,
      // @ts-ignore
      right: "true",
      grow: 2,
    },
  ];

  const data: DataRow[] = [
    {
      id: 1,
      address: "0x1000.....2223",
      level: t("非活跃普通"),
      nft: 0,
    },
    {
      id: 2,
      address: "0x1000.....2223",
      level: t("活跃普通"),
      nft: 2,
    },
    {
      id: 3,
      address: "0x1000.....2223",
      level: t("社长"),
      nft: 23,
    },
    {
      id: 4,
      address: "0x1000.....2223",
      level: t("基金会社长"),
      nft: 50,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
