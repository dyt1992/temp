export interface TableListItem {
  key: number;
  system?: string;
  code?: string;
  singlton?: boolean;
  menu_category?: string;
  menu_name?: string;
  schema?: {
    [key: string]: {
      [key: string]: string
    }
  };
  push_config?: string;

  fzr?: string;
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
  currentPage?: number;
}
