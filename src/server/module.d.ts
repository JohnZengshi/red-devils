export type BASE_RESPONSE<T = any> = {
  code: 0 | 200;
  data: T | null;
  msg: string;
  timeMillis: number;
}; // What's returned from request
