/*
 * @LastEditors: John
 * @Date: 2024-06-17 17:45:43
 * @LastEditTime: 2024-06-17 17:57:42
 * @Author: John
 */
import { ASYNC_STORAGE_KEY } from "@/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  Token: string;
  UpdateToken: (t: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, _get) => ({
      Token: "",
      UpdateToken: (t) => set({ Token: t }),
    }),
    {
      name: ASYNC_STORAGE_KEY.Token, // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
    }
  )
);

export default useUserStore;
