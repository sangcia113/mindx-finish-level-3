import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Flex, Form, Image, Input, Layout, Row } from 'antd';
import Text from 'antd/es/typography/Text';
import React from 'react';

const LoginPage = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
                // backgroundImage:
                //     'linear-gradient(to left, #0a9f3f, #2db657, #45ce70, #5be688, #70ffa2)',
            }}
        >
            <Flex justify={'center'} style={{ margin: 'auto' }}>
                <Card
                    style={{
                        minWidth: 400,
                        boxShadow: '10 10 20 0 rgba(175, 175, 175, 0.75)',
                    }}
                >
                    {/* <Image
                        src={require('../assets/logo/logoWFC.png')}
                        width={450}
                        preview={false}
                    /> */}
                    <Row justify={'center'}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout={'vertical'}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Row>
                </Card>
            </Flex>
        </Layout>
    );
};

export default LoginPage;
