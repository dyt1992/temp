import React, { useEffect } from 'react';
import { Table } from "antd";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import 'antd/dist/antd.css'

interface IProps {

}

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '编码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '负责人',
    dataIndex: 'principal',
    key: 'principal',
  },
  {
    title: '操作',
    render: (text: any, record: any) => (
      <span>
        <a style={{ marginRight: 16 }}>修改配置数据</a>
        <a>查看推送历史</a>
      </span>
    )
  },
  {
    title: '推送',
    render: (text: any, record: any) => (
      <span>
        <a>推送日常</a>
        ->
        <a>推送预发</a>
        ->
        <a>推送线上</a>
      </span>
    )
  },
];

const data = [{
  key: 1,
  name: '2020寒假活动',
  code: 'com.dingtalk.industry.card.CardActivity.2020winter',
  principal: '京羽'
}]

export default (props: IProps): React.ReactNode => {
  // useEffect(()=>{

  // },[])
  return (
    <PageHeaderWrapper title={false}>
      <Table columns={columns} dataSource={data}>

      </Table>
    </PageHeaderWrapper>
  )
}
