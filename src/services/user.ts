import request from '@/utils/request';
import { ResponseData } from "./data";

export async function queryCurrent(): Promise<ResponseData> {
  return request('/user/userInfo');
}

export async function queryUser(params: any): Promise<any> {
  return request('/user/getUserList', {
    params
  });
}
