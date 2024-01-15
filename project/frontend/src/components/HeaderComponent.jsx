import React from 'react';

import { Avatar, Badge, Dropdown, Flex, Layout, Space } from 'antd';

import {
    ArrowRightSquareFill,
    Bell,
    BookHalf,
    ChatDots,
    ChatHeartFill,
    HouseFill,
    KeyFill,
} from 'react-bootstrap-icons';

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header style={{ padding: '0px' }}>
            {/* <Flex justify="flex-end">
                <Col span={16}>
                    <Alert
                        type="info"
                        showIcon={false}
                        banner
                        message={
                            <Marquee
                                pauseOnHover
                                gradient={false}
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#008034',
                                }}
                            >
                                PHẦN MỀM QUẢN LÝ THỰC ĐƠN HÀNG NGÀY
                            </Marquee>
                        }
                        style={{ minHeight: '100%' }}
                    />
                </Col>
                <Col span={8}>
                    <Dropdown
                        menu={
                            {
                                // items,
                            }
                        }
                    >
                        <a onClick={e => e.preventDefault()}>
                            <Space>Hover me</Space>
                        </a>
                    </Dropdown>
                </Col>
            </Flex> */}
            <Flex justify="end" style={{ paddingRight: '10px' }}>
                <Space size={'large'} style={{ marginRight: 28 }}>
                    <Badge count={4} overflowCount={10} size={'small'} color="OrangeRed">
                        <ChatDots style={{ fontSize: 24 }} />
                    </Badge>
                    <Badge count={12} overflowCount={10} size="small" color="DodgerBlue">
                        <Bell style={{ fontSize: 24 }} />
                    </Badge>
                </Space>
                <Dropdown
                    menu={{
                        items: [
                            { key: 'l', label: 'Trang chủ', icon: <HouseFill /> },
                            { key: '2', label: 'Đổi mật khẩu', icon: <KeyFill /> },
                            { type: 'divider' },
                            {
                                key: '3',
                                label: 'Góp ý - Báo lỗi',
                                icon: <ChatHeartFill />,
                            },
                            { key: '4', label: 'Hướng dẫn sử dụng', icon: <BookHalf /> },
                            { type: 'divider' },
                            { key: '5', label: 'Đăng xuất', icon: <ArrowRightSquareFill /> },
                        ],
                    }}
                >
                    <Avatar src={require('../assets/avatar/PTS.JPG')} />
                </Dropdown>
            </Flex>
        </Header>
    );
};

export default HeaderComponent;
