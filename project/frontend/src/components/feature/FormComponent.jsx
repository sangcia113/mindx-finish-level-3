import React from 'react';

import { Form, Input } from 'antd';

const FormComponent = ({ form, onFinish, formFields }) => {
    return (
        <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            // layout='vertical'
        >
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            {formFields.map(({ label, name, rules, typeInput, valuePropName }, index) => (
                <Form.Item
                    key={index}
                    label={label}
                    name={name}
                    rules={rules}
                    valuePropName={valuePropName}
                >
                    {typeInput}
                </Form.Item>
            ))}
        </Form>
    );
};

export default FormComponent;
