import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { Form } from 'antd';
import { TableListItem } from '../data';
import SelectUser from '@/components/SelectUser';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: FormValueType) => void;
}

interface FormValueType extends Partial<TableListItem> {
  userArr: Array<{
    value: string
    label: string
    key: string
  }>
}

const FormItem = Form.Item;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit: handleAdd } = props;
  const [form] = Form.useForm();

  const [formVals, setFormVals] = useState<FormValueType>({
    instanceName: '',
    instanceCode: '',
    userArr: []
  })

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="配置"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={async () => {
        const fieldsValue = await form.validateFields();
        const userStr = JSON.stringify(formVals.userArr.map((item) => { return { empId: item.key, nickNameCn: item.label } }))
        handleAdd({ ...formVals, ...fieldsValue, userStr })
      }}
      okText="提交"
      cancelText="取消"
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        hideRequiredMark>
        <FormItem
          name="instanceName"
          label="名称"
        >
          <Input />
        </FormItem>
        <FormItem
          name="instanceCode"
          label="编码"
        >
          <Input />
        </FormItem>
        <FormItem
          label="负责人"
        >
          <SelectUser value={formVals.userArr} onChange={(value) => {
            setFormVals({ ...formVals, userArr: value })
          }} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
