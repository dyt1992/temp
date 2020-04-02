import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import { queryUser } from "@/services/user"

interface SelectUserProps {
    value: [],
    onChange: (value: any) => void
}

const SelectUser: React.FC<SelectUserProps> = (props) => {
    const {
        onChange: handleChange,
        value,
    } = props;
    console.log(value);
    console.log(handleChange)
    const [fetching, setFetching] = useState<boolean>(false);
    const [user, setUser] = useState<Array<{ empId: string, nickNameCn: string, }>>([])

    const fetchUser = async (value: string) => {
        setFetching(true);
        const response = await queryUser({
            nickName: value
        });
        setFetching(false);
        setUser(response);
    }

    return (
        <Select
            mode="multiple"
            labelInValue
            value={value}
            placeholder="选择用户"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={fetchUser}
            onChange={(value) => {
                handleChange(value)
                setUser([]);
                setFetching(false);
            }}
        >
            {user.map(item => (
                <Select.Option value={item.empId} key={item.empId}>{item.nickNameCn}</Select.Option>
            ))}
        </Select>
    );
};

export default SelectUser;
