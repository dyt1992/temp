import { Divider, message, Button } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm, { FormValueType } from './components/UpdateForm';
import History from './components/History';
import { TableListItem, TableListParams, PushConfigParams } from './data';
import { queryInstance, addInstance, updateInstance, pushConfig, queryPushEnvUrl } from './service';
import { PlusOutlined } from '@ant-design/icons';
import CreateForm from './components/CreateForm';

enum PushConfigEnv {
  daily = "daily",
  pre = "pre",
  production = "production"
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem, templateId?: number) => {
  const hide = message.loading('正在添加');
  try {
    const response = await addInstance({ ...fields, templateId });
    if (response.success) {
      message.success('添加成功');
    } else {
      message.error(response.errorMsg || '添加失败请重试！');
    }
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    const response = await updateInstance({
      id: fields.id,
      configData: fields.configData,
    });
    if (response.success) {
      message.success('配置成功');
    } else {
      message.error(response.errorMsg || '配置失败请重试！');
    }
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const handlePushConfig = async (fields: PushConfigParams) => {
  // await queryPushEnvUrl({ key: fields.env });
  const hide = message.loading('正在推送');
  try {
    const response = await pushConfig(fields);
    if (response.success) {
      message.success('推送成功');
    } else {
      message.error(response.errorMsg || '推送失败请重试！');
    }
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('推送失败请重试！');
    return false;
  }
}

const TableList: React.FC<{}> = (props: any) => {
  const {
    location
  } = props;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [historyModalVisible, handleHistoryModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'instanceName',
      hideInSearch: true,
    },
    {
      title: '编码',
      dataIndex: 'instanceCode',
      hideInSearch: true,
    },
    {
      title: '负责人',
      dataIndex: 'fzr',
      hideInSearch: true,
      render: (_, record) => (
        <>
          {
            JSON.parse(record.userStr || '[]').map((item: any) => item.nickNameCn).join('')
          }
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改配置数据
          </a>
          <Divider type="vertical" />
          <a onClick={() => {
            handleHistoryModalVisible(true);
            setStepFormValues(record);
          }}>查看推送历史</a>
        </>
      ),
    },
    {
      title: '推送',
      dataIndex: 'push',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handlePushConfig({
                templateCode: record.templateCode,
                instanceCode: record.instanceCode,
                data: record.configData,
                env: PushConfigEnv.daily
              })
            }}
          >
            日常
          </a>
          <Divider type="vertical" />
          <a onClick={() => {
            handlePushConfig({
              templateCode: record.templateCode,
              instanceCode: record.instanceCode,
              data: record.configData,
              env: PushConfigEnv.pre
            })
          }}>预发</a>
          <Divider type="vertical" />
          <a href="">线上</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem, TableListParams>
        headerTitle="实例配置"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => {
          params!.templateCode = location.query.templateCode || '';
          return queryInstance(params)
        }}
        columns={columns}
        search={false}
        toolBarRender={(action, { }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>
        ]}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} onSubmit={async (value) => {
        const success = await handleAdd(value, location.query.templateId);
        if (success) {
          handleModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}>
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <History
          onCancel={() => {
            handleHistoryModalVisible(false);
            setStepFormValues({});
          }}
          historyModalVisible={historyModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;