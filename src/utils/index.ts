/*
 * @LastEditors: John
 * @Date: 2024-06-17 18:19:27
 * @LastEditTime: 2024-06-18 10:48:05
 * @Author: John
 */

import Toast from "antd-mobile/es/components/toast";

export const ua = navigator.userAgent;
export const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
export const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
export const isMobile = isIOS || isAndroid;
export const isOKApp = /OKApp/i.test(ua);

export function shortenString(
  inputString: string,
  startLength: number,
  endLength: number
) {
  if (inputString.length <= startLength + endLength) {
    return inputString; // 如果字符串长度小于等于要保留的前后字符数之和，直接返回原字符串
  }

  const startPart = inputString.slice(0, startLength);
  const endPart = inputString.slice(-endLength);

  return `${startPart}...${endPart}`;
}

// 定义一个函数，用于获取指定参数的值
export function getUrlQueryParam(key: string): string | undefined {
  console.log(window.location);
  const query: Map<string, string> = new Map();
  const queryStr = window.location.href.split("?")[1];
  if (queryStr) {
    const queryStrArr = queryStr.split("&");
    queryStrArr.forEach((v) => {
      const queryArr = v.split("=");
      query.set(queryArr[0], queryArr[1]);
    });
  }
  return query.get(key);
}

export function copyText(text: string) {
  const value = text;
  // 1、创建DOM input框
  const input = document.createElement("input");
  // 2、隐藏input
  input.setAttribute(
    "style",
    `
    opacity: 0;
    z-index: 999;
    position: fixed;
    top: 0;
  `
  );

  // 3、将指定文本赋值给input
  input.value = value;
  // 4、将input插入文档
  document.body.appendChild(input);
  // 5、选中文本
  // @ts-ignore
  input.select();
  // 6、复制到剪切板
  const isCopySuccess = document.execCommand("copy");

  // 7、复制成功后提示
  isCopySuccess &&
    Toast.show({
      icon: "success",
      content: "Copy successful",
    });
  // 8、 销毁DOM
  document.body.removeChild(input);
}
