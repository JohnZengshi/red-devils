/*
 * @LastEditors: John
 * @Date: 2024-06-18 10:28:21
 * @LastEditTime: 2024-06-25 14:47:34
 * @Author: John
 */
import { GET, POST } from "./client";
import {
  ClaimIncome,
  IncomeRecord,
  IncomeRecordType,
  NftConfigurationData,
  NftOrder,
  PreprelionListItem,
  UpgradeOrder,
  UserHomeData,
  UserIncome,
  UserUpgradeInformation,
} from "./module";

// 检查账号是否注册
export function api_check_account_registration() {
  return GET<{ account: string }, { exist: boolean }>({
    url: "/api/account/exist",
    requiresToken: false,
  });
}

// 登录
export function api_login() {
  return POST<
    {
      account: `0x${string}` | undefined;
      password: string;
      publicKey: string;
      chainType: 2;
    },
    { token: string }
  >({
    url: "/api/account/signIn",
    requiresToken: false,
  });
}

// 注册
export function api_signUp() {
  return POST<
    {
      account: `0x${string}` | undefined;
      publicKey: string;
      shareCode: string;
      chainType: 2;
    },
    any
  >({ url: "/api/account/signUp", requiresToken: false });
}

// 获取钱包签名串
export function api_get_wallet_signature_string() {
  return GET<
    { account: `0x${string}` | undefined },
    { encryptedString: string }
  >({
    url: "/api/account/randomCode",
    requiresToken: false,
  });
}

// 获取首页用户数据
export function api_get_homepage_user_data() {
  return GET<any, UserHomeData>({
    url: "/api/common/getUserData",
    requiresToken: false,
    requiresAddress: false,
  });
}

// 获取用户升级信息
export function api_get_user_upgrade_information() {
  return GET<any, UserUpgradeInformation>({
    url: "/api/user/userUpgradeInformation",
  });
}

// 获取NFT配置数据
export function api_get_nft_configuration_data() {
  return GET<any, NftConfigurationData>({
    url: "/api/nft/getUserData",
  });
}

// 分页查询收益记录
export function api_pagling_query_income_record() {
  return GET<
    {
      status?: IncomeRecordType;
      id: string;
      type: 1 | 2; // 1=领取记录 2=发放记录
      pageNum: number;
      pageSize: number;
    },
    IncomeRecord
  >({
    url: "/api/common/earningsRecords",
  });
}

// NFT下单
export function api_nft_order() {
  return POST<any, NftOrder>({ url: "/api/nft/payNft" });
}

// 用户取消订单告诉我
export function api_users_cancel_orders() {
  return POST<any, any, { orderId: number }>({ url: "/api/nft/cancel" });
}

// 直推列表
export function api_preprelion_list() {
  return GET<any, PreprelionListItem[]>({ url: "/api/user/getDirectPushList" });
}

// 升级
export function api_upgrade() {
  return POST<any, UpgradeOrder>({ url: "/api/user/upgrade" });
}

// 用户领取收益
export function api_claim_income() {
  return POST<any, ClaimIncome, { id: number }>({
    url: "/api/common/claimYourEarnings",
  });
}

// 绑定邀请关系
export function api_binding_invitation_relationship() {
  return POST<{ shareCode: string }, { result: boolean }>({
    url: "/api/account/bindingRelationship",
  });
}

// 查询用户是否绑定关系
export function api_query_whether_the_user_is_binding_relationship() {
  return GET<any, { result: boolean }>({
    url: "/api/account/bindOrNot",
  });
}
