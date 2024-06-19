/*
 * @LastEditors: John
 * @Date: 2024-06-19 10:49:42
 * @LastEditTime: 2024-06-19 10:52:32
 * @Author: John
 */
import classes from "./RecordsItem.module.css";
export default function RecordsItem({
  itemList,
}: {
  itemList: { title: string; value: string; valueColor?: string }[];
}) {
  return (
    <>
      <ul className={classes.recordsItem}>
        {itemList.map((v, i) => (
          <li key={i}>
            <span>{v.title}</span>
            <span style={{ color: v.valueColor || "white" }}>{v.value}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
