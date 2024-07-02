/*
 * @LastEditors: John
 * @Date: 2024-06-17 17:20:03
 * @LastEditTime: 2024-07-02 16:53:48
 * @Author: John
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_PARTICIPATE_CHAIN_ID: number;
  readonly VITE_NETWORK_USDT_ADDRESS: `0x${string}`;
  readonly VITE_PURCHASED_CONTRACT_ADDRESS: `0x${string}`;
  readonly VITE_RECEIVE_RAMB_CONTRACT_ADDRESS: `0x${string}`;
  readonly VITE_CHECK_TRANSACTION_DETAILS_URL: string;
  // 更多环境变量...
  readonly MODE: "development" | "production" | "test";
}
