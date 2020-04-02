export interface TableListItem {
  id?: number;
  system?: string;
  code?: string;
  singlton?: string;
  menuCategory?: string;
  menuName?: string;
  jsonSchema?: string;
  pushConfig?: string;

  userStr?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
}
