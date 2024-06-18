/*
 * @LastEditors: John
 * @Date: 2024-01-23 10:39:17
 * @LastEditTime: 2024-06-18 10:35:21
 * @Author: John
 */
// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import en from "../i18n/translation/en.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "en";
    // custom resources type
    resources: {
      en: typeof en;
    };
    // other
  }
}
