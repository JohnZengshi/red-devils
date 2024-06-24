/*
 * @LastEditors: John
 * @Date: 2024-06-18 10:09:21
 * @LastEditTime: 2024-06-21 14:47:26
 * @Author: John
 */
import { Client } from "@hyper-fetch/core";
import { BASE_RESPONSE } from "./module";
import useUserStore from "@/store/User";
import { getAccount, connect } from "@wagmi/core";
import { config } from "@/components/WalletProvider";
import { Lang } from "@/constants";
import { Toast } from "antd-mobile";
import { injected } from "wagmi/connectors";
import { signAndLogin } from "@/utils/wallet";
import i18next from "i18next";
function initClient({
  requiresToken,
  requiresAddress,
}: {
  requiresToken: boolean;
  requiresAddress: boolean;
}) {
  return new Client({ url: import.meta.env.VITE_BASE_API_URL })
    .onAuth(async (req) => {
      if (requiresToken) {
        if (!useUserStore.getState().Token) {
          // TODO 登录获取token
          // Toast.show({ content: "token is emtiy!", icon: "fail" });
          if (!getAccount(config).address)
            await connect(config, { connector: injected() });
          await signAndLogin(getAccount(config).address!);
        }
      }

      if (requiresAddress) {
        if (!getAccount(config).address) {
          // TODO 链接钱包
          // Toast.show({ content: "address is emtiy!", icon: "fail" });
          await connect(config, { connector: injected() });
        }
      }

      const headers = {
        ...req.headers,
        Authorization: useUserStore.getState().Token,
        "Accept-Language": getAcceptLang(),
        address: (getAccount(config).address || "") as string,
      };
      return req.setHeaders(headers);
    })
    .onResponse((res) => {
      console.log(res);
      if (!res.success) {
        Toast.clear();
        Toast.show({ content: i18next.t("服务器错误"), icon: "fail" });
        throw new Error(res.error?.message);
      }
      const resData: BASE_RESPONSE = res.data;
      if (resData.code !== 200 && resData.code !== 0) {
        if (resData.msg) Toast.show({ content: resData.msg, icon: "fail" });
        throw new Error(resData.msg || "client on response error");
      }
      return res;
    });
}

export const POST = <P = any, R = any, QueryParams = any>({
  url,
  requiresToken = true,
  requiresAddress = true,
}: {
  url: string;
  requiresToken?: boolean;
  requiresAddress?: boolean;
}) => {
  return initClient({ requiresToken, requiresAddress }).createRequest<
    BASE_RESPONSE<R>,
    P,
    any,
    QueryParams
  >()({
    method: "POST",
    endpoint: url,
  });
};

export const GET = <P = any, R = any>({
  url,
  requiresToken = true,
  requiresAddress = true,
}: {
  url: string;
  requiresToken?: boolean;
  requiresAddress?: boolean;
}) => {
  return initClient({ requiresToken, requiresAddress }).createRequest<
    BASE_RESPONSE<R>,
    any,
    any,
    P
  >()({
    method: "GET",
    endpoint: url,
  });
};

function getAcceptLang() {
  let apiAcceptLang;
  switch (useUserStore.getState().Lang) {
    case Lang.cn:
      apiAcceptLang = "zh-CN";
      break;
    case Lang.tw:
      apiAcceptLang = "zh-TW";
      break;
    case Lang.en:
      apiAcceptLang = "en-US";
      break;
    case Lang.de:
      apiAcceptLang = "de-DE";
      break;
    case Lang.jp:
      apiAcceptLang = "ja-JP";
      break;
    default:
      apiAcceptLang = "zh-CN";
      break;
  }

  return apiAcceptLang;
}
