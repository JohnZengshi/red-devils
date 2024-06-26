/*
 * @LastEditors: John
 * @Date: 2024-06-19 15:55:07
 * @LastEditTime: 2024-06-25 14:47:58
 * @Author: John
 */
import { config } from "@/components/WalletProvider";
import {
  api_binding_invitation_relationship,
  api_check_account_registration,
  api_get_wallet_signature_string,
  api_login,
  api_query_whether_the_user_is_binding_relationship,
  api_signUp,
} from "@/server/api";
import useUserStore from "@/store/User";
import {
  signMessage,
  getChains,
  switchChain,
  getChainId,
  disconnect,
  getAccount,
} from "@wagmi/core";
import Toast from "antd-mobile/es/components/toast";
import i18next from "i18next";
import { getUrlQueryParam } from ".";
import { UrlQueryParamsKey } from "@/constants";

/**
 * @description: 检测网络并切换
 * @return {*}
 */
export function checkNetWork(): Promise<void> {
  return new Promise<void>(async (reslove, reject) => {
    // TODO 切换网络✔
    const chains = getChains(config);
    let chainId = getChainId(config);
    // console.log("all chains:", chains);
    console.log("current chain id:", chainId);
    let netWork = chains.find(
      (v) => v.id == import.meta.env.VITE_PARTICIPATE_CHAIN_ID
    );
    console.log("participate network:", netWork);
    if (chainId != netWork?.id && netWork) {
      try {
        await switchChain(config, {
          chainId: netWork.id,
        });

        const timer = setInterval(() => {
          chainId = getChainId(config);
          console.log("current chain id:", chainId);
          if (chainId == netWork?.id) {
            console.log("switch chain success!");
            reslove();
            clearInterval(timer);
          }
        }, 1000);
      } catch (error) {
        // TODO 切换网络失败，自动添加网络✔
        console.error("switch chain error:", error);
      }
    } else {
      reslove();
    }
  });
}

// 签名并且登录
export async function signAndLogin(address?: `0x${string}`): Promise<void> {
  return new Promise(async (reslove) => {
    if (!address) return loginOut();
    if (address != useUserStore.getState().Address) {
      useUserStore.setState((state) => {
        return { ...state, Address: address, Token: "" };
      });
    }

    if (useUserStore.getState().Token) return reslove(); // token存在无需登录
    const publicKey =
      "0305ef2a74bff2e2d68764c557ce2daecac92caa7a9406e3a90c2cf7c5b444a154";

    const loadingToast = Toast.show({
      icon: "loading",
      content: i18next.t("链接钱包中..."),
      duration: 0,
      maskClickable: false,
    });

    const { data: isExitData } = await api_check_account_registration().send({
      queryParams: { account: address },
    });
    if (isExitData?.data?.exist) {
      // 登录

      const { data: signatureData } =
        await api_get_wallet_signature_string().send({
          queryParams: { account: address },
        });

      let sign: string;
      try {
        sign = await signMessage(config, {
          message: signatureData?.data?.encryptedString || "",
        });
      } catch (error) {
        // 用户拒绝签名或者遇到错误，断开链接
        const { connector } = getAccount(config);
        await disconnect(config, { connector });
        loadingToast.close();
        loginOut();
        throw new Error("用户拒绝签名或者遇到错误，断开链接");
      }

      // TODO 登录✔
      const { data: loginInfoData } = await api_login().send({
        data: {
          account: address,
          password: sign,
          publicKey,
          chainType: 2,
        },
      });

      if (loginInfoData) {
        useUserStore.setState((state) => {
          return { ...state, Token: loginInfoData.data?.token };
        });

        // TODO 判断用户是否绑定关系✔
        const { data } =
          await api_query_whether_the_user_is_binding_relationship().send({});
        if (
          typeof data?.data.result == "boolean" &&
          data?.data.result === false
        ) {
          const inviteCode = getUrlQueryParam(UrlQueryParamsKey.INVITE_CODE);
          if (inviteCode) {
            const { data } = await api_binding_invitation_relationship().send({
              data: {
                shareCode: inviteCode,
              },
            });
          }
        }
        reslove();
        loadingToast.close();
      }
    } else {
      // 注册
      await api_signUp().send({
        data: {
          account: address,
          publicKey,
          shareCode: "",
          chainType: 2,
        },
      });
      await signAndLogin(address);
      reslove();
      loadingToast.close();
    }
  });
}

export function loginOut() {
  useUserStore.setState((state) => {
    return { ...state, Address: "", Token: "" };
  });
}
