import { Divider, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm, { FormValueType } from './components/UpdateForm';
import Preview from './components/Preview';
import { TableListItem, TableListParams } from './data';
import { queryTemplate, updateTemplate } from './service';

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateTemplate(fields);
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = (props) => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [previewModalVisible, handlePreviewModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '分类',
      dataIndex: 'menuCategory',
      hideInForm: true,
    },
    {
      title: '名称',
      dataIndex: 'menuName',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '系统',
      dataIndex: 'system',
      hideInForm: true,
    },
    {
      title: '编码',
      dataIndex: 'code',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '单例/多例',
      dataIndex: 'singlton',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          {record.singlton === "true" ? '单例' : '多例'}
        </>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'fzr',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => (
        <>
          <a onClick={() => {
            handlePreviewModalVisible(true);
            setStepFormValues(record);
          }}>预览</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          {/* <Divider type="vertical" />
          <a>删除</a> */}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem, TableListParams>
        headerTitle="模板配置"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => queryTemplate(params)}
        columns={columns}
      />
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
        <Preview
          onCancel={() => {
            handlePreviewModalVisible(false);
          }}
          previewModalVisible={previewModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;