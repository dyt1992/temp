import React, { useState } from 'react';
import { Form, Button, Input, Radio, Drawer, Card, message, Select, Spin } from 'antd';
import { queryUser } from "@/services/user"

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  push_config: {
    type: string,
    data: {
      groupId?: string,
      dataId?: string,
      version?: string,
      method?: string,
      interface?: string
    }
  },
  userArr: Array<{
    value: string
    label: string
    key: string
  }>
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}



const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  let {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const [form] = Form.useForm();
  const [fetching, setFetching] = useState<boolean>(false);
  const [user, setUser] = useState<Array<{ empId: string, nickNameCn: string, }>>([])

  let pushConfig: any;

  try {
    if (pushConfig) {
      pushConfig = JSON.parse(values.pushConfig || '');
    } else {
      pushConfig = JSON.parse('{ "type": "diamond","data": { "groupId": "", "dataId": "","version":"","method":"","interface":""}}')
    }
  } catch (error) {
    console.log(error);
    message.error("schema解析出错");
    pushConfig = JSON.parse('{ "type": "diamond","data": { "groupId": "", "dataId": "","version":"","method":"","interface":""}}');
  }


  const [formVals, setFormVals] = useState<FormValueType>({
    userArr: JSON.parse(values.userStr || '[]'),
    id: props.values.id,
    menuCategory: values.menuCategory,
    menuName: values.menuName,
    system: values.system,
    code: values.code,
    singlton: values.singlton,
    userStr: values.userStr,
    pushConfig: values.pushConfig,
    push_config: JSON.parse(values.pushConfig || '{ "type": "diamond","data": { "groupId": "", "dataId": "","version":"","method":"","interface":""}}')
  });

  const { push_config } = formVals;

  const fetchUser = async (value: string) => {
    setFetching(true);
    const response = await queryUser({
      nickName: value
    });
    setFetching(false);
    setUser(response);
  }

  return (
    <Drawer
      width={720}
      onClose={() => handleUpdateModalVisible(false)}
      visible={updateModalVisible}
      bodyStyle={{ paddingBottom: 80 }}

      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => handleUpdateModalVisible(false)}
            style={{ marginRight: 8 }}
          >
            取消
              </Button>
          <Button onClick={async () => {
            const fieldsValue = await form.validateFields();
            const pushConfig = JSON.stringify(push_config);
            const userStr = JSON.stringify(formVals.userArr.map((item) => { return { empId: item.key, nickNameCn: item.label } }))
            // setFormVals({ ...formVals, ...fieldsValue, pushConfig });
            handleUpdate({ ...formVals, ...fieldsValue, pushConfig, userStr });
          }
          } type="primary">
            提交
              </Button>
        </div>
      }
    >
      <Card title="模板属性配置" bordered={false}>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={formVals}
          hideRequiredMark>
          <FormItem
            label="分类"
          >
            <span>{formVals.menuCategory}</span>
          </FormItem>
          <FormItem
            label="名称"
          >
            <span>{formVals.menuName}</span>
          </FormItem>
          <FormItem
            label="系统"
          >
            <span>{formVals.system}</span>
          </FormItem>
          <FormItem
            label="编码"
          >
            <span>{formVals.code}</span>
          </FormItem>
          <FormItem
            name="singlton"
            label="实例类型"
            rules={[{ required: true, message: '请选择实例类型' }]}
          >
            <span>{formVals.singlton == "true" ? '单例' : '多例'}</span>
          </FormItem>
          <FormItem
            label="负责人"
          >
            <Select
              mode="multiple"
              labelInValue
              value={formVals.userArr}
              placeholder="Select users"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchUser}
              onChange={(value) => {
                setFormVals({ ...formVals, userArr: value })
                setUser([]);
                setFetching(false);
              }}
            >
              {user.map(item => (
                <Select.Option value={item.empId} key={item.empId}>{item.nickNameCn}</Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            name={['push_config', 'type']}
            label="配置推送方式"
          >
            <Radio.Group onChange={(evt) => {
              setFormVals({ ...formVals, push_config: { ...push_config, type: evt.target.value } })
            }}>
              <Radio value='diamond'>diamond推送</Radio>
              <Radio value='hsf'>hsf推送</Radio>
            </Radio.Group>
          </FormItem>
          {
            push_config.type === "diamond" ?
              <>
                <FormItem
                  name={['push_config', 'data', 'groupId']}
                  label="groupId"
                >
                  <Input onChange={(evt) => {
                    setFormVals({ ...formVals, push_config: { ...push_config, data: { ...push_config.data, groupId: evt.target.value } } })
                  }} />
                </FormItem>
                <FormItem
                  name={['push_config', 'data', 'dataId']}
                  label="dataId"
                >
                  <Input onChange={(evt) => {
                    setFormVals({ ...formVals, push_config: { ...push_config, data: { ...push_config.data, dataId: evt.target.value } } })
                  }} />
                </FormItem>
              </>
              :
              <>
                <FormItem
                  name={['push_config', 'data', 'interface']}
                  label="hsf接口"
                >
                  <Input />
                </FormItem>
                <FormItem
                  name={['push_config', 'data', 'version']}
                  label="版本"
                >
                  <Input />
                </FormItem>
                <FormItem
                  name={['push_config', 'data', 'method']}
                  label="方法"
                >
                  <Input />
                </FormItem>
              </>
          }
        </Form>
      </Card>
    </Drawer>
  );
};

export default UpdateForm;
