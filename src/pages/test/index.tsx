import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd';
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating
} from '@formily/antd-components'
import 'antd/dist/antd.css'

const schema = {
  // "type": "object",
  // "properties": {
  //   "string": {
  //     "key": "string",
  //     "type": "string",
  //     "title": "String",
  //     "name": "string",
  //     "x-component": "input"
  //   },
  //   "radio": {
  //     "key": "radio",
  //     "type": "string",
  //     "enum": [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //     ],
  //     "title": "Radio",
  //     "name": "radio",
  //     "x-component": "radio"
  //   },
  //   "select": {
  //     "key": "select",
  //     "type": "string",
  //     "enum": [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //     ],
  //     "title": "Select",
  //     "name": "select",
  //     "x-component": "select"
  //   },
  //   "checkbox": {
  //     "key": "checkbox",
  //     "type": "string",
  //     "enum": [
  //       "1",
  //       "2",
  //       "3",
  //       "4"
  //     ],
  //     "title": "Checkbox",
  //     "name": "checkbox",
  //     "x-component": "checkbox"
  //   },
  //   "textarea": {
  //     "key": "textarea",
  //     "type": "string",
  //     "title": "TextArea",
  //     "name": "textarea",
  //     "x-component": "textarea"
  //   },
  //   "number": {
  //     "key": "number",
  //     "type": "number",
  //     "title": "数字选择",
  //     "name": "number",
  //     "x-component": "numberpicker"
  //   },
  //   "boolean": {
  //     "key": "boolean",
  //     "type": "boolean",
  //     "title": "开关选择",
  //     "name": "boolean",
  //     "x-component": "switch"
  //   },
  //   "date": {
  //     "key": "date",
  //     "type": "string",
  //     "title": "日期选择",
  //     "name": "date",
  //     "x-component": "datepicker"
  //   },
  //   "daterange": {
  //     "key": "daterange",
  //     "type": "array<date>",
  //     "title": "日期范围",
  //     "default": [
  //       "2018-12-19",
  //       "2018-12-19"
  //     ],
  //     "name": "daterange",
  //     "x-component": "daterangepicker"
  //   },
  //   "year": {
  //     "key": "year",
  //     "type": "string",
  //     "title": "年份",
  //     "name": "year",
  //     "x-component": "yearpicker"
  //   },
  //   "month": {
  //     "key": "month",
  //     "type": "string",
  //     "title": "月份",
  //     "name": "month",
  //     "x-component": "monthpicker"
  //   },
  //   "time": {
  //     "key": "time",
  //     "type": "string",
  //     "title": "时间",
  //     "name": "time",
  //     "x-component": "timepicker"
  //   },
  //   "week": {
  //     "key": "week",
  //     "type": "string",
  //     "title": "周",
  //     "name": "week",
  //     "x-component": "weekpicker"
  //   },
  //   "upload": {
  //     "key": "upload",
  //     "type": "array",
  //     "title": "卡片上传文件",
  //     "name": "upload",
  //     "x-component-props": {
  //       "listType": "card"
  //     },
  //     "x-component": "upload"
  //   },
  //   "upload2": {
  //     "key": "upload2",
  //     "type": "array",
  //     "title": "拖拽上传文件",
  //     "name": "upload2",
  //     "x-component-props": {
  //       "listType": "dragger"
  //     },
  //     "x-component": "upload"
  //   },
  //   "upload3": {
  //     "key": "upload3",
  //     "type": "array",
  //     "title": "普通上传文件",
  //     "name": "upload3",
  //     "x-component-props": {
  //       "listType": "text"
  //     },
  //     "x-component": "upload"
  //   },
  //   "range": {
  //     "key": "range",
  //     "type": "number",
  //     "title": "范围选择",
  //     "name": "range",
  //     "x-component-props": {
  //       "min": 0,
  //       "max": 1024,
  //       "marks": [
  //         0,
  //         1024
  //       ]
  //     },
  //     "x-component": "range"
  //   },
  //   "transfer": {
  //     "key": "transfer",
  //     "type": "number",
  //     "enum": [
  //       {
  //         "key": 1,
  //         "title": "选项1"
  //       },
  //       {
  //         "key": 2,
  //         "title": "选项2"
  //       }
  //     ],
  //     "x-component-props": {},
  //     "title": "穿梭框",
  //     "name": "transfer",
  //     "x-component": "transfer"
  //   },
  //   "rating": {
  //     "key": "rating",
  //     "type": "number",
  //     "title": "等级",
  //     "name": "rating",
  //     "x-component": "rating"
  //   }
  // }
    "type" : "object",
    "tenant" : "dingtalk.edu",
    "system" : "lippi-industry-card",
    "categoryName" : "教育打卡",
    "name" : "活动配置",
    "properties" : {
      "activityId" : {
        "type" : "integer",
        "x-component" : "input",
        "title" : "活动id"
      },
      "activityTag" : {
        "type" : "string",
        "x-component" : "input",
        "title" : "活动tag"
      },
      "name" : {
        "type" : "string",
        "x-component" : "input",
        "title" : "活动名称"
      },
      "bannerUrl" : {
        "type" : "string",
        "x-component" : "input",
        "title" : "bannerUrl地址"
      },
      "desc" : {
        "type" : "string",
        "x-component" : "input",
        "title" : "活动描述"
      },
      "startDate" : {
        "type" : "date",
        "x-component" : "input",
        "title" : "开始时间"
      },
      "endDate" : {
        "type" : "date",
        "x-component" : "input",
        "title" : "结束时间"
      }
    }
}

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  Transfer
}

export default (): React.ReactNode => {
  // const { form, table } = useFormTableQuery(service)
  return (
    <PageHeaderWrapper title={false}>
      <SchemaForm
        components={components}
        schema={schema}
        labelCol={4}
        wrapperCol={12}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </PageHeaderWrapper>
  )
}
