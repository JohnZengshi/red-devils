import classes from "./Home.module.css";
import useUserStore from "@/store/User";
import { cn, copyText, shortenString } from "@/utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.svg";
import nftBg from "@/assets/nft_bg.svg";
import usdtBg from "@/assets/usdt_bg.svg";
import RMOB_logo from "@/assets/RMOB_logo.svg";
import IconFont from "@/components/iconfont";
import { BaseError, useAccount } from "wagmi";
import { disconnect } from "wagmi/actions";
import { config } from "@/components/WalletProvider";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, Empty, Toast } from "antd-mobile";
import { loginOut } from "@/utils/wallet";
import { api_claim_income, api_get_homepage_user_data } from "@/server/api";
import { UserHomeData } from "@/server/module";
import { UrlQueryParamsKey } from "@/constants";
import { receiveByContract } from "@/contract/utils";
import usePollingCheckBuyStatus from "@/hook/usePollingCheckBuyStatus";
import { ToastHandler } from "antd-mobile/es/components/toast";

export default function () {
  const { Token, UpdateToken } = useUserStore();
  const { open } = useWeb3Modal();
  const { t } = useTranslation();
  const { address } = useAccount();

  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserHomeData>();

  const userInviteLink = useMemo(
    () =>
      `${import.meta.env.VITE_BASE_URL}?${UrlQueryParamsKey.INVITE_CODE}=${
        userData?.invitationCode || ""
      }`,
    [userData]
  );
  const receiveLoadingToast = useRef<ToastHandler>();
  const { transcationStatus, startPollingCheckBuyStatus,stopPollingCheckBuyStatus } =
    usePollingCheckBuyStatus("NORMAL");

  useEffect(() => {
    getHomeData();
    return () => {};
  }, [Token]);

  useEffect(() => {
    if (transcationStatus == "success") {
      receiveLoadingToast.current?.close();
      stopPollingCheckBuyStatus()
      Dialog.alert({
        content: `${t("领取成功，前往钱包查看")}`,
        confirmText: "OK",
      });
    }

    return () => {};
  }, [transcationStatus]);

  async function getHomeData() {
    const { data } = await api_get_homepage_user_data().send({});
    setUserData(data?.data);
  }

  useEffect(() => {
    console.log("user token:", Token);

    return () => {};
  }, [Token]);

  return (
    <>
      <div className={cn(classes.Home, classes.container)}>
        <div className={classes.userinfo}>
          <div className={classes.userinfo_top}>
            <img className={classes.userinfo_top_left} src={logo} alt="" />

            {address ? (
              <div className={classes.userinfo_top_right}>
                <div className={classes.userinfo_top_right_wallet}>
                  <span>{shortenString(address, 6, 4)}</span>
                  <IconFont
                    onClick={() => {
                      disconnect(config);
                      loginOut();
                    }}
                    name="tuichu"
                    className={classes.userinfo_top_right_wallet_disconnect}
                    color={"#fff"}
                  />
                </div>
                <div className={classes.userinfo_top_right_btns}>
                  {userData && (
                    <>
                      <div className={classes.userinfo_top_right_btns_item}>
                        {userData.level == 0 && (
                          <>
                            <IconFont
                              name="tongdun"
                              className={classes.userinfo_top_right_btns_icon}
                            />
                            <span>{t("普通非活跃")}</span>
                          </>
                        )}
                        {userData.level == 1 && (
                          <>
                            <IconFont
                              name="jindun"
                              className={classes.userinfo_top_right_btns_icon}
                            />
                            <span>{t("普通活跃")}</span>
                          </>
                        )}
                        {userData.level == 2 && (
                          <>
                            <IconFont
                              name="xingdun"
                              className={classes.userinfo_top_right_btns_icon}
                            />
                            <span>{t("社长")}</span>
                          </>
                        )}
                        {userData.level == 3 && (
                          <>
                            <IconFont
                              name="guanjun"
                              className={classes.userinfo_top_right_btns_icon}
                            />
                            <span>{t("基金会社长")}</span>
                          </>
                        )}
                      </div>

                      <div
                        className={classes.userinfo_top_right_btns_item}
                        onClick={() => {
                          navigate("/levelup");
                        }}
                      >
                        <span>{t("升级")}</span>
                        <IconFont
                          name="chevronsrightshuangyoujiantou"
                          className={classes.userinfo_top_right_btns_icon}
                          color={"#fff"}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div
                  className={classes.userinfo_top_right_connect}
                  onClick={() => {
                    open();
                  }}
                >
                  <span>{t("链接钱包")}</span>
                </div>
              </>
            )}
          </div>
          <ul className={classes.userinfo_data}>
            <li>
              <span className={classes.userinfo_data_num}>
                {userData?.mintNumber || 0}
              </span>
              <span className={classes.userinfo_data_des}>{t("邀请铸造")}</span>
            </li>
            <li>
              <span className={classes.userinfo_data_num}>
                {userData?.presidentNumber || 0}
              </span>
              <span className={classes.userinfo_data_des}>{t("团队社长")}</span>
            </li>
            <li>
              <span className={classes.userinfo_data_num}>
                {userData?.airdropNumber || 0}
              </span>
              <span className={classes.userinfo_data_des}>{t("邀请空投")}</span>
            </li>
          </ul>
        </div>

        <div className={classes.nftToken}>
          <ul className={classes.nftToken_tab}>
            <li
              className={tabIndex == 0 ? classes.nftToken_tab_active : ""}
              onClick={() => setTabIndex(0)}
            >
              NFT
            </li>
            <li
              className={tabIndex == 1 ? classes.nftToken_tab_active : ""}
              onClick={() => setTabIndex(1)}
            >
              {t("代币")}
            </li>
          </ul>

          <div className={classes.nftToken_content}>
            {tabIndex == 0 && (
              <>
                {address ? (
                  <>
                    {userData?.nftId ? (
                      <div className={classes.nftToken_content_nft}>
                        <div className={classes.nftToken_content_nft_top}>
                          <span># ${userData?.nftId}</span>
                          <span
                            onClick={() => {
                              navigate("/mint");
                            }}
                          >
                            {t("铸造 NFT")}
                            <IconFont
                              name="chevronsrightshuangyoujiantou"
                              color={"#F3BE3C"}
                            />
                          </span>
                        </div>
                        <img
                          className={classes.nftToken_content_nft_img}
                          src={nftBg}
                          alt=""
                        />
                        <span className={classes.nftToken_content_nft_des}>
                          {t("Min结束后按照规则进行空投。")}
                        </span>
                      </div>
                    ) : (
                      <div className={classes.nftToken_content_nft_mint}>
                        <div
                          className={classes.nftToken_content_nft_mint_btn}
                          onClick={() => {
                            navigate("/mint");
                          }}
                        >
                          <span>{t("铸造 NFT")}</span>
                          <IconFont
                            className={
                              classes.nftToken_content_nft_mint_btn_icon
                            }
                            name="chevronsrightshuangyoujiantou"
                            color={"#fff"}
                          />
                        </div>
                        <span>{t("铸造 NFT 获得代币空投")}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={classes.nftToken_content_userDisconnect}>
                      <span>{t("钱包未链接，无法向您显示 NFT")}</span>
                    </div>
                  </>
                )}
              </>
            )}
            {tabIndex == 1 && (
              <div className={classes.nftToken_content_token}>
                <div className={classes.nftToken_content_token_top}>
                  <span>{t("资产金额 = 已领取 + 待处理")}</span>
                </div>

                <ul className={classes.nftToken_content_token_list}>
                  {userData?.userIncomes.map((v, i) => (
                    <ReceiveCom
                      key={i}
                      tokenName={v.coinName}
                      tokenNum={v.receive}
                      toReceive={v.collection}
                      onAssetRec={() => {
                        navigate(`/assetrecord?id=${v.id}&name=${v.coinName}`);
                      }}
                      onReceive={async () => {
                        receiveLoadingToast.current = Toast.show({
                          icon: "loading",
                          duration: 0,
                          content: t("领取中"),
                          maskClickable: false,
                        });
                        const { data } = await api_claim_income().send({
                          queryParams: { id: v.id },
                        });
                        const orderInfo = data?.data;
                        if (!orderInfo?.orderNumber) return;
                        const buyAmount = BigInt(
                          orderInfo?.claimQuantity || ""
                        );
                        receiveByContract(
                          buyAmount,
                          orderInfo.time,
                          orderInfo?.orderNumber,
                          orderInfo.hash
                        )
                          .then((hash) => {
                            console.log("领取成功！hash:", hash);
                            getHomeData();
                            startPollingCheckBuyStatus(hash);
                          })
                          .catch(async (err: BaseError) => {
                            receiveLoadingToast.current?.close();
                            Toast.show({
                              content: err.shortMessage,
                              icon: "fail",
                            });
                          });
                      }}
                    />
                  ))}

                  {(userData?.userIncomes.length == 0 ||
                    !userData?.userIncomes) && <Empty />}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className={classes.invite}>
          <div className={classes.invite_top}>
            <span>{t("邀请")}</span>
            {address && (
              <span
                onClick={() => {
                  navigate("/invitationlist");
                }}
              >
                {t("邀请列表")}{" "}
                <IconFont
                  name="chevronsrightshuangyoujiantou"
                  color={"#F3BE3C"}
                />
              </span>
            )}
          </div>

          <div className={classes.invite_content}>
            <span>{t("邀请链接")}</span>
            <div className={classes.invite_content_link}>
              {address ? (
                <>
                  {userData?.nftId ? (
                    <>
                      <span>{shortenString(userInviteLink, 15, 15)}</span>
                      <IconFont
                        onClick={() => {
                          copyText(userInviteLink);
                        }}
                        className={classes.invite_content_icon}
                        name="fuzhi"
                        color={"#fff"}
                      />{" "}
                    </>
                  ) : (
                    <>
                      <span>{t("MINT Nft 获取邀请链接")}</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span>{t("链接钱包获取邀请链接")}</span>
                </>
              )}
            </div>

            <span>
              {t(
                "普通会员每邀请铸造一个NFT可获得一份空投福利；推荐铸造20个NFT的可升级为会长；团队中拥有20位会长可升级为基金会社长；邀请越多级别越高福利越多。"
              )}
            </span>
          </div>
        </div>

        <div className={classes.dataDisclosure}>
          <span>{t("数据披露")}</span>
          <ul className={classes.dataDisclosure_content}>
            <li className={classes.dataDisclosure_content_item}>
              <span>{t("资金池")}</span>
              <span>{userData?.pools || 0}</span>
            </li>
            <li className={classes.dataDisclosure_content_item}>
              <span>{t("社长席位")}</span>
              <span>{userData?.president || 0}</span>
            </li>
            <li className={classes.dataDisclosure_content_item}>
              <span>{t("基金会社长席位")}</span>
              <span>{userData?.foundation || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ReceiveCom({
  tokenName,
  tokenNum,
  toReceive,
  onAssetRec,
  onReceive,
}: {
  tokenName: string;
  tokenNum: string;
  toReceive: number;
  onAssetRec: () => void;
  onReceive: () => void;
}) {
  const { t } = useTranslation();
  return (
    <li className={classes.nftToken_content_token_item}>
      {tokenName.toUpperCase() == "USDT" && <img src={usdtBg} alt="" />}
      {tokenName.toUpperCase() == "RMOB" && <img src={RMOB_logo} alt="" />}
      <div>
        <span className={classes.nftToken_content_token_item_tokenName}>
          {tokenName}
        </span>
        <span className={classes.nftToken_content_token_item_tokenNum}>
          {tokenNum}
        </span>
        <span
          className={classes.nftToken_content_token_item_AssetRecords}
          onClick={() => {
            onAssetRec();
          }}
        >
          {t("资产记录")}{" "}
          <IconFont name="chevronsrightshuangyoujiantou" color={"#3680FF"} />
        </span>
      </div>

      <div>
        <div className={classes.nftToken_content_token_item_tokenWaiting}>
          <span>{t("待领取")}</span>
          <span>{toReceive}</span>
        </div>
        <Button
          className={classes.nftToken_content_token_item_tokenReceive}
          onClick={() => onReceive()}
          fill="outline"
          disabled={toReceive == 0}
        >
          <span>{t("领取")}</span>
        </Button>
      </div>
    </li>
  );
}
