/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  // 更多环境变量...
  readonly MODE: "development" | "production" | "test";
}
