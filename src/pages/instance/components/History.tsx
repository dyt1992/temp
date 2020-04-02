import React, { useState } from 'react';
import { queryHistory } from '../service';

import { TableListItem, HistoryTableListItem, HistoryTableListItemParam, PushConfigEnv } from '../data.d';
import { Modal, Divider, Drawer } from 'antd';
import HistorySchema from "./HistorySchema";
import ProTable from '@ant-design/pro-table';
import moment from "moment";

export interface FormValueType extends Partial<HistoryTableListItem> {
  // [key: string]: any
}

export interface HistoryProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  historyModalVisible: boolean;
  values: Partial<TableListItem>;
}

const HistoryForm: React.FC<HistoryProps> = (props) => {
  const {
    onCancel: handleHistoryModalVisible,
    historyModalVisible,
    values
  } = props;

  const [historySchemaModalVisible, handleHistorySchemaModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const columns = [
    {
      title: '推送时间',
      dataIndex: 'gmtModified',
      // width: 100,
      render: (text: any, record: HistoryTableListItem) => (
        <span>
          {moment(record.gmtModified).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      ),
    },
    {
      title: '推送人',
      dataIndex: 'optName',
      // width: 80
    },
    {
      title: '推送环境',
      dataIndex: 'pushEnv',
      // width: 60,
      render: (text: any, record: HistoryTableListItem) => (
        <span>
          {record.pushEnv === PushConfigEnv.daily ? '日常' : record.pushEnv === PushConfigEnv.pre ? '预发' : record.pushEnv === PushConfigEnv.production ? '线上' : ''}
        </span>
      ),
    },
    {
      title: '模板code',
      dataIndex: 'templateCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '实例code',
      dataIndex: 'instanceCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '查看',
      key: 'action',
      render: (text: any, record: HistoryTableListItem) => (
        <span>
          <a onClick={() => {
            handleHistorySchemaModalVisible(true);
            setStepFormValues(record);
          }}
          >推送内容</a>
          <Divider type="vertical" />
          <a onClick={
            () => {
              Modal.info({
                title: "推送数据",
                content: (
                  <div>
                    {
                      record.pushData
                    }
                  </div>
                ),
                onOk() { },
              });
            }
          }>数据</a>
        </span>
      ),
    },
  ];

  return (
    // <Modal
    //   width={800}
    //   bodyStyle={{ padding: '32px 40px 48px' }}
    //   destroyOnClose
    //   title="推送历史"
    //   visible={historyModalVisible}
    //   onCancel={() => handleHistoryModalVisible()}
    // >
    <div>
      <Drawer
        width={1080}
        onClose={() => handleHistoryModalVisible(false)}
        visible={historyModalVisible}
        bodyStyle={{ paddingBottom: 80 }}

        footer={null}
      >
        <ProTable<HistoryTableListItem, HistoryTableListItemParam>
          headerTitle="推送历史"
          rowKey="id"
          request={(params) => queryHistory({ ...params, instanceCode: values.instanceCode })}
          columns={columns}
          search={false}
        />
      </Drawer>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <HistorySchema
          onCancel={() => {
            handleHistorySchemaModalVisible(false);
            setStepFormValues({});
          }}
          historySchemaModalVisible={historySchemaModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </div>
  );
};

export default HistoryForm;
