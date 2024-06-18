/*
 * @LastEditors: John
 * @Date: 2024-06-18 10:30:43
 * @LastEditTime: 2024-06-18 10:34:19
 * @Author: John
 */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translation/en.json";
i18next.use(initReactI18next).init({
  compatibilityJSON: "v3", // <--- add this line.
  lng: "en", // if you're using a language detector, do not define the lng option
  // lng: LANGUAGE["en-US"],
  debug: false,
  resources: {
    en: {
      translation: en,
    },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
