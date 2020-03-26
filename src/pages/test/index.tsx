import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
	SchemaForm,
	FormButtonGroup,
	Submit,
	Reset
} from '@formily/antd';
import { Input } from 'antd'

const schema = {
	type: "object",
	properties: {
		name: {
			type: "string",
			title: "Name",
			"x-component": "Input"
		}
	}
}
export default (): React.ReactNode => {
	// const { form, table } = useFormTableQuery(service)
	return (
		<PageHeaderWrapper title={false}>
			<SchemaForm
				components={{ Input }}
				schema={schema}
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
