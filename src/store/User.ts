/*
 * @LastEditors: John
 * @Date: 2024-06-17 17:45:43
 * @LastEditTime: 2024-06-20 15:49:09
 * @Author: John
 */
import { ASYNC_STORAGE_KEY, Lang } from "@/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  Address: string;
  UpdateAddress: (a: string) => void;

  Token: string;
  UpdateToken: (t: string) => void;

  Lang: Lang;
  UpdateLang: (l: Lang) => void;

  InviteCode: string;
  UpdateInviteCode: (I: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, _get) => ({
      Address: "",
      UpdateAddress: (a) => set({ Address: a }),

      Token: "",
      UpdateToken: (t) => set({ Token: t }),

      Lang: Lang.en,
      UpdateLang: (l) => set({ Lang: l }),

      InviteCode: "",
      UpdateInviteCode: (i) => set({ InviteCode: i }),
    }),
    {
      name: ASYNC_STORAGE_KEY.Store, // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
    }
  )
);

export default useUserStore;
