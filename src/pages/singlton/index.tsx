import { message, Button, Card, Divider, Descriptions } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { FormValueType } from '../instance/components/UpdateForm';
import History from '../instance/components/History';
import { TableListItem, TableListParams, PushConfigParams } from '../instance/data';
import { queryInstance, updateInstance, pushConfig, queryPushEnvUrl } from '../instance/service';

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

const components = {
  Input,
  TextArea: Input.TextArea,
  DatePicker
}

enum PushConfigEnv {
  daily = "daily",
  pre = "pre",
  production = "production"
}

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

const Singlton: React.FC<{}> = (props: any) => {
  const {
    location
  } = props;
  const [historyModalVisible, handleHistoryModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<TableListItem>({});
  const [schema, setSchema] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    queryInstance({
      current: 1,
      pageSize: 10,
      templateCode: location.query.templateCode || ''
    }).then(response => {
      if (response.total && response.total > 0) {
        setLoading(false);
        let values = response.data[0];
        let tempSchema: any;
        let tempInitialValues: any = {};
        setFormValues(values)
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
      }

    })
  }, [])


  return (
    <PageHeaderWrapper title={false}>
      <Card title="单例配置" loading={loading} extra={
        formValues && Object.keys(formValues).length ? (
          <div>
            <Button type="primary" onClick={() =>
              handleHistoryModalVisible(true)
            }>查看推送历史</Button>
            <Button type="primary" style={{ marginLeft: 10 }} onClick={() => {
              handlePushConfig({
                templateCode: formValues.templateCode,
                instanceCode: formValues.instanceCode,
                data: formValues.configData,
                env: PushConfigEnv.daily
              })
            }}>日常</Button>
            <Button type="primary" style={{ marginLeft: 10 }} onClick={() => {
              handlePushConfig({
                templateCode: formValues.templateCode,
                instanceCode: formValues.instanceCode,
                data: formValues.configData,
                env: PushConfigEnv.pre
              })
            }}>预发</Button>
            <Button type="primary" style={{ marginLeft: 10 }}>线上</Button>
          </div>
        ) : null
      }>
        <Descriptions title="基本信息" column={4}>
          <Descriptions.Item label="名称">{formValues.instanceName}</Descriptions.Item>
          <Descriptions.Item label="负责人">{formValues.fzr}</Descriptions.Item>
          <Descriptions.Item label="编码" span={2}>{formValues.instanceCode}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginTop: 16, marginBottom: 24 }} />
        <SchemaForm
          components={components}
          initialValues={initialValues}
          schema={schema}
          labelCol={5}
          wrapperCol={15}
          onSubmit={(val) => {
            if (schema.properties) {
              Object.keys(schema.properties).forEach((item: any) => {
                if (schema.properties[item] !== undefined) {
                  schema.properties[item].value = val[item];
                }
              })
            }
            setFormValues({ ...formValues, configData: JSON.stringify(schema) })
            handleUpdate({ ...formValues, configData: JSON.stringify(schema) });
          }}
        >
          <FormButtonGroup style={{ display: 'flex', justifyContent: 'center' }}>
            <Submit>提交</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </SchemaForm>
      </Card>
      {
        formValues && Object.keys(formValues).length ? (
          <History
            onCancel={() => {
              handleHistoryModalVisible(false);
            }}
            historyModalVisible={historyModalVisible}
            values={formValues}
          />
        ) : null
      }
    </PageHeaderWrapper >
  );
};

export default Singlton;