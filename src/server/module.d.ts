export type BASE_RESPONSE<T = any> = {
  code: 0 | 200;
  data: T;
  msg: string;
  timeMillis: number;
}; // What's returned from request

export type Level = 0 | 1 | 2 | 3; // 0=无等级 1=会员 2=社长 3=基金会
export interface UserHomeData {
  address: string;
  airdropNumber: number;
  foundation: number;
  invitationCode: string;
  level: Level;
  mintNumber: number;
  nftId: number;
  pools: string;
  president: number;
  presidentNumber: number;
  userImg: string;
  userIncomes: UserIncome[];
  active: 0 | 1; // "0=非活跃  1=活跃用户"
}
export interface UserIncome {
  coinId: number;
  coinName: string;
  collection: number;
  createTime: string;
  flag: number;
  id: number;
  receive: number;
  updateTime: string;
  userId: number;
}

export interface UserUpgradeInformation {
  foundation: number;
  level: Level;
  numberOfPresidents: number;
  ordinary: number;
  president: number;
  price: string;
  proportion: string;
  status: 1 | 0; //1=可升级 0=不可升级
  upgradeFees: string;
  active: 0 | 1; // "0=非活跃  1=活跃用户"
}

export interface NftConfigurationData {
  floatingQuantity: string;
  initialPrice: string;
  kamibutsu: string;
  nftCount: number;
  nftPrice: string;
  nftRemainder: number;
}

export interface IncomeRecord {
  countId: string;
  current: number;
  maxLimit: string;
  optimizeCountSql: boolean;
  orders: { asc: boolean; column: string }[];
  pages: number;
  records: IncomeRecordsItem[];
  searchCount: boolean;
  size: number;
  total: number;
}

export interface IncomeRecordsItem {
  id: number;
  createTime: string;
  updateTime: string;
  flag: number;
  userId: number;
  incomeId: number;
  type: 1 | 2 | 3 | 4; // 1:领取成功，2发放记录 3，领取中 4:已取消
  coinId: number;
  opType: number;
  opRemark: string;
  opBefore: number;
  opValue: number;
  opAfter: number;
  extRemark: string;
}

export type IncomeRecordType = 4 | 5 | 6 | 7 | 8 | 9; //4=直推>20NFT,5=升级费平分,6=NFT空投,7=社长空投,8=基金会社长,9=直推空投

export interface NftOrder {
  address: string;
  buyAmount: string;
  buyCount: string;
  createBy: string;
  createTime: string;
  hash: string;
  id: number;
  illustrate: string;
  nftId: number;
  orderNumber: string;
  payCoin: string;
  recommendId: number;
  status: number;
  updateBy: string;
  updateTime: string;
  userId: number;
  payInduction: number;
}

export interface PreprelionListItem {
  address: string;
  level: 0 | 1 | 2 | 3; // 0=无等级 1=会员 2=社长 3=基金会
  mintNumber: number;
  userType: 0 | 1; //  0=非活跃 1=活跃用户
}

export interface UpgradeOrder {
  address: string;
  buyAmount: string;
  createBy: string;
  createTime: string;
  endLevel: number;
  hash: string;
  id: number;
  illustrate: string;
  orderNumber: string;
  payCoin: string;
  startLevel: number;
  status: number;
  updateBy: string;
  updateTime: string;
  userId: number;
}

export interface ClaimIncome {
  claimQuantity: string;
  hash: string;
  orderNumber: string;
  time: number;
}
