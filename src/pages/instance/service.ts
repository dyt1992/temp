import request from '@/utils/request';
import { TableListParams, TableListItem, HistoryTableListItemParam } from './data.d';
import { ResponseData } from "@/services/data";

export async function queryInstance(params?: TableListParams) {
  return request('/templateInstance/getList', {
    params,
  });
}

export async function addInstance(params: TableListItem): Promise<ResponseData> {
  return request('/templateInstance/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateInstance(params: TableListItem): Promise<ResponseData> {
  return request('/templateInstance/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function pushConfig(params: any): Promise<ResponseData> {
  return request('/push/pushConfig', {
    params,
  });
}

export async function queryHistory(params: HistoryTableListItemParam): Promise<any> {
  return request('/push/getList', {
    params,
  });
}

export async function queryPushEnvUrl(params: any): Promise<ResponseData> {
  return request('/push/getEnvUrl', {
    params,
  });
}
