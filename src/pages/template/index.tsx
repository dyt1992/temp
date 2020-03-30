import { Divider, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
import { queryRule, updateRule } from './service';

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      // name: fields.name,
      // desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '分类',
      dataIndex: 'menu_category',
      hideInForm: true,
    },
    {
      title: '名称',
      dataIndex: 'menu_name',
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
          {record.singlton === true ? '单例' : '多例'}
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
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        headerTitle="模板配置"
        actionRef={actionRef}
        rowKey="key"
        request={(params) => queryRule(params)}
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
    </PageHeaderWrapper>
  );
};

export default TableList;