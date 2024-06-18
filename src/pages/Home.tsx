import classes from "./Home.module.css";
import useUserStore from "@/store/User";
import { copyText } from "@/utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Button from "antd-mobile/es/components/button";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function () {
  const { Token, UpdateToken } = useUserStore();
  const { open } = useWeb3Modal();
  const { t } = useTranslation();
  useEffect(() => {
    UpdateToken("user token abc");

    return () => {};
  }, []);

  useEffect(() => {
    console.log("user token:", Token);

    return () => {};
  }, [Token]);

  return (
    <>
      <div className={classes.Home}>
        <span className={classes.text}>{t("AppName")}</span>
        <Button
          onClick={() => {
            open();
          }}
        >
          Connect Wallet
        </Button>

        <Button
          onClick={() => {
            copyText("123");
          }}
        >
          copy text
        </Button>
      </div>
    </>
  );
}
