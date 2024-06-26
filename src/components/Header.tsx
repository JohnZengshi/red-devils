/*
 * @LastEditors: John
 * @Date: 2024-06-18 15:16:31
 * @LastEditTime: 2024-06-26 14:49:22
 * @Author: John
 */
import Picker, {
  PickerColumn,
  PickerValue,
} from "antd-mobile/es/components/picker";
import { useContext, useEffect, useMemo, useState } from "react";
import IconFont from "./iconfont";
import logo from "@/assets/logo.svg";
import classes from "./Header.module.css";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { RouterLogContext } from "@/context/RouterContext";
import { useTranslation } from "react-i18next";
import { Lang } from "@/constants";
import useUserStore from "@/store/User";
import { Popover } from "antd-mobile";
import { Action } from "antd-mobile/es/components/popover";

const langColums: Action[] = [
  { text: "English", key: Lang.en },
  { text: "中文（简体）", key: Lang.cn },
  { text: "中文（繁体）", key: Lang.tw },
  { text: "日本語", key: Lang.jp },
  { text: "DEUTSCH", key: Lang.de },
];
export default function () {
  const { UpdateLang } = useUserStore();

  const route = useContext(RouterLogContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const navTitle = useMemo<string>(() => {
    switch (location.pathname) {
      case "/mint":
        return t("铸造 NFT");
      case "/levelup":
        return t("级别提升");
      case "/assetrecord":
        return t("收益记录");
      case "/airdroprecord":
        return t("RMOB记录");
      case "/invitationlist":
        return t("直推列表");
      default:
        return t("返回");
    }
  }, [location]);

  return (
    <>
      <div className={classes.header}>
        <div className={classes.header_top}>
          <img className={classes.header_logo} src={logo} alt="" />
          <span className={classes.header_title}>{t("红魔NFT")}</span>
          <Popover.Menu
            mode="dark"
            actions={langColums}
            placement="bottom"
            onAction={(node) => {
              switch (node.key) {
                case Lang.en:
                  i18n.changeLanguage(Lang.en);
                  UpdateLang(Lang.en);
                  break;
                case Lang.cn:
                  i18n.changeLanguage(Lang.cn);
                  UpdateLang(Lang.cn);
                  break;
                case Lang.tw:
                  i18n.changeLanguage(Lang.tw);
                  UpdateLang(Lang.tw);
                  break;
                case Lang.jp:
                  i18n.changeLanguage(Lang.jp);
                  UpdateLang(Lang.jp);
                  break;
                case Lang.de:
                  i18n.changeLanguage(Lang.de);
                  UpdateLang(Lang.de);
                  break;
                default:
                  break;
              }
            }}
            trigger="click"
          >
            <IconFont
              className={classes.header_lang}
              name="diqiu"
              color={"#fff"}
            />
          </Popover.Menu>
        </div>

        {location.pathname != "/" && (
          <div
            className={classes.header_nav}
            onClick={() => {
              if (route.current == route.from) {
                navigate("/");
                return;
              }
              navigate(-1);
            }}
          >
            <IconFont
              className={classes.header_nav_icon}
              name="icon_arrow_left"
              color={"#fff"}
            />
            <span>{navTitle}</span>
          </div>
        )}
      </div>
    </>
  );
}
