import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryTemplate(params?: TableListParams) {
  return request('/template/getList', {
    params,
  });
}

export async function updateTemplate(params: TableListItem) {
  return request('/template/update', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
