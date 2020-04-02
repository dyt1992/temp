export interface TableListItem {
  id?: number;
  templateId?: number,
  templateCode?: string;
  instanceCode?: string;
  instanceName?: string;
  pushStatus?: string;
  configData?: string;
  userStr?: string;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
  templateCode?: string;
}

export interface PushConfigParams {
  templateCode?: string,
  instanceCode?: string,
  data?: string,
  env?: string
}

export interface HistoryTableListItem {
  gmtCreate?: number;
  gmtModified?: number;
  templateCode?: string;
  instanceCode?: string;
  pushEnv?: string;
  pushType?: string;
  pushStatus?: string;
  optId?: string;
  optName?: string;
  pushData?: string;
}

export interface HistoryTableListItemParam {
  instanceCode?: string
}

export enum PushConfigEnv {
  daily = "daily",
  pre = "pre",
  production = "production"
}