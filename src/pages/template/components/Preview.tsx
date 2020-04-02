import React from 'react';

import {
  SchemaForm,
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

export interface PreviewProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  previewModalVisible: boolean;
  values: Partial<TableListItem>;
}

const Preview: React.FC<PreviewProps> = (props) => {
  let {
    onCancel: handleUpdateModalVisible,
    previewModalVisible,
    values,
  } = props;

  let schema: any;

  try {
    schema = JSON.parse(values.jsonSchema || "")
  } catch (error) {
    message.error("schema解析出错");
    console.log(error);
    schema = JSON.parse("{}");
  }

  return (
    <div>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="预览"
        visible={previewModalVisible}
        onCancel={() => handleUpdateModalVisible()}
        footer={null}
      >
        <SchemaForm
          components={components}
          schema={schema}
          labelCol={5}
          wrapperCol={19}
        >
        </SchemaForm>
      </Modal>
    </div >
  );
};

export default Preview;
