import React, { useState } from 'react';
import { Form, Button, Input, Radio, Drawer, Card } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

  const [formVals, setFormVals] = useState<FormValueType>({
    key: props.values.key,
    menu_category: values.menu_category,
    menu_name: values.menu_name,
    system: values.system,
    code: values.code,
    singlton: values.singlton,
    fzr: values.fzr,
    push_config: values.push_config
  });
  const [form] = Form.useForm();

  return (
    <div>
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
              setFormVals({ ...formVals, ...fieldsValue });
              handleUpdate(formVals);
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
            hideRequiredMark>
            <FormItem
              label="分类"
            >
              <span>{formVals.menu_category}</span>
            </FormItem>
            <FormItem
              label="名称"
            >
              <span>{formVals.menu_name}</span>
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
              <RadioGroup name="singlton" defaultValue={true} onChange={
                (val) => {
                  setFormVals({ ...formVals, singlton: val.target.value })
                }
              } value={formVals.singlton}>
                <Radio value={true}>单例</Radio>
                <Radio value={false}>多例</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              name="fzr"
              label="负责人"
            >
              <Input value={formVals.code}>
              </Input>
            </FormItem>
            <FormItem
              name="push_config"
              label="配置推送方式"
            >
              <Radio.Group name="push_config" defaultValue="diamond" onChange={(val) => {
                setFormVals({ ...formVals, push_config: val.target.value })
              }} value={formVals.push_config}>
                <Radio value='diamond'>diamond推送</Radio>
                <Radio value='hsf'>hsf推送</Radio>
              </Radio.Group>
            </FormItem>
          </Form>
        </Card>
      </Drawer>
    </div >
  );
};

export default UpdateForm;
