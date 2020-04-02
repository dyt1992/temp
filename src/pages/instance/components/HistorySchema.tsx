import React, { useState, useEffect } from 'react';

import {
  SchemaForm,
} from '@formily/antd';

import {
  Input,
  DatePicker,
} from '@formily/antd-components'

import { HistoryTableListItem } from '../data.d';
import { Modal, message } from 'antd';

const components = {
  Input,
  TextArea: Input.TextArea,
  DatePicker
}

export interface FormValueType extends Partial<HistoryTableListItem> {
  // [key: string]: any
}

export interface HistorySchmaProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  historySchemaModalVisible: boolean;
  values: Partial<HistoryTableListItem>;
}

const HistorySchmaForm: React.FC<HistorySchmaProps> = (props) => {
  let {
    onCancel: handleModalVisible,
    historySchemaModalVisible,
    values,
  } = props;

  const [schema, setSchema] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    let tempSchema: any;
    let tempInitialValues: any = {};
    try {
      tempSchema = JSON.parse(values.pushData || "");
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
        visible={historySchemaModalVisible}
        onCancel={() => handleModalVisible()}
        footer={null}
      >
        <SchemaForm
          components={components}
          initialValues={initialValues}
          schema={schema}
          labelCol={5}
          wrapperCol={19}
        >
        </SchemaForm>
      </Modal>
    </div >
  );
};

export default HistorySchmaForm;
