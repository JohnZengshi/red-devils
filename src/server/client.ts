/*
 * @LastEditors: John
 * @Date: 2024-06-18 10:09:21
 * @LastEditTime: 2024-06-18 10:27:04
 * @Author: John
 */
import { Client } from "@hyper-fetch/core";
import { BASE_RESPONSE } from "./module";

const client = new Client({ url: import.meta.env.VITE_BASE_API_URL })
  .onAuth((req) => {
    return req;
  })
  .onRequest((req) => {
    req.setHeaders({});
    return req;
  })
  .onResponse((res) => {
    return res;
  });

export const POST = <P, R = any>({ url }: { url: string }) => {
  return client.createRequest<BASE_RESPONSE<R>, P>()({
    method: "POST",
    endpoint: url,
  });
};

export const GET = <P, R = any>({ url }: { url: string }) => {
  return client.createRequest<BASE_RESPONSE<R>, any, any, P>()({
    method: "GET",
    endpoint: url,
  });
};
