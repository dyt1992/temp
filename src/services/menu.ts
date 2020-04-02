import request from '@/utils/request';
import { ResponseData } from "./data";

export async function queryMenu(): Promise<ResponseData> {
  return request('/template/getMenu');
}
