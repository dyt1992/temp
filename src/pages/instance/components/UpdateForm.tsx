import React, { useState, useEffect } from 'react';

import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd';

import {
  Input,
  DatePicker,
} from '@formily/antd-components'

import { TableListItem } from '../data.d';
import { Modal, message } from 'antd';

const components = {
  Input,
  TextArea: Input.TextArea,
  DatePicker
}

export interface FormValueType extends Partial<TableListItem> {
  // [key: string]: any
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const [schema, setSchema] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    let tempSchema: any;
    let tempInitialValues: any = {};
    try {
      tempSchema = JSON.parse(values.configData || "");
    } catch (error) {
      message.error("schema解析出错");
      console.log(error);
      tempSchema = JSON.parse("{}");
    }
    setSchema(tempSchema);
    if (tempSchema.properties) {
      Object.keys(tempSchema.properties).forEach((item: any) => {
        if (tempSchema.properties[item]) {
          tempInitialValues[item] = tempSchema.properties[item].value
        }
      })
    }
    setInitialValues(tempInitialValues);
  }, []);

  return (
    <div>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="配置"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible()}
        footer={null}
      >
        <SchemaForm
          components={components}
          initialValues={initialValues}
          schema={schema}
          labelCol={5}
          wrapperCol={19}
          onSubmit={(val) => {
            if (schema.properties) {
              Object.keys(schema.properties).forEach((item: any) => {
                if (schema.properties[item] !== undefined) {
                  schema.properties[item].value = val[item];
                }
              })
            }
            handleUpdate({ ...values, configData: JSON.stringify(schema) });
          }}
        >
          <FormButtonGroup style={{ float: 'right' }}>
            <Submit>提交</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </SchemaForm>
      </Modal>
    </div >
  );
};

export default UpdateForm;
