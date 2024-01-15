import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Badge,
    Drawer,
    Dropdown,
    Flex,
    Image,
    Layout,
    Menu,
    Space,
    Typography,
} from 'antd';
import {
    Bell,
    BookFill,
    ChatDots,
    ChatFill,
    HouseFill,
    KeyFill,
    List,
    PeopleFill,
    PersonCheckFill,
    PersonHeart,
    Search,
} from 'react-bootstrap-icons';
import { LogoutOutlined } from '@ant-design/icons';

const imgSrc = require('../../assets/logo/header.png');

const { Text } = Typography;
const { Header } = Layout;

const items = [
    { key: '', label: 'Trang chủ', icon: <HouseFill size={20} /> },
    { key: 'history', label: 'Lịch sử nghỉ phép', icon: <Search size={18} /> },
    {
        type: 'group',
        label: (
            <Text strong style={{ color: '#007bff' }}>
                Dành cho Leader
            </Text>
        ),
        children: [
            { key: 'leader', label: 'Duyệt nghỉ phép', icon: <PersonCheckFill size={20} /> },
        ],
    },
    {
        type: 'group',
        label: (
            <Text strong style={{ color: '#dc3545' }}>
                Dành cho Manager
            </Text>
        ),
        children: [
            { key: 'manager', label: 'Quản lý nghỉ phép', icon: <PersonHeart size={20} /> },
            { key: 'user', label: 'Quản lý nhân viên', icon: <PeopleFill size={20} /> },
        ],
    },
];

const HeaderComponent = ({ name }) => {
    const [openDrawer, setOpenDraw] = useState(false);

    const navigate = useNavigate();

    return (
        <Header
            style={{
                backgroundColor: 'white',
                padding: '0 8px ',
            }}
        >
            <Flex align="center" justify="space-between">
                <List
                    style={{ cursor: 'pointer', fontSize: 36 }}
                    onClick={() => setOpenDraw(prevOpen => !prevOpen)}
                />
                <Link to="/">
                    <Image alt="Logo" preview={false} src={imgSrc} width={40} />
                </Link>
                <Space size={'large'}>
                    <Badge count={4} overflowCount={10} size={'small'} color="OrangeRed">
                        <ChatDots style={{ fontSize: 24 }} />
                    </Badge>
                    <Badge count={12} overflowCount={10} size="small" color="DodgerBlue">
                        <Bell style={{ fontSize: 24 }} />
                    </Badge>
                    {name && (
                        <Dropdown
                            arrow
                            menu={{
                                items: [
                                    {
                                        key: 'password',
                                        label: 'Đổi mật khẩu',
                                        icon: <KeyFill size={20} />,
                                    },

                                    {
                                        key: 'feedback',
                                        label: 'Góp ý - Báo lỗi',
                                        icon: <ChatFill size={18} />,
                                    },
                                    {
                                        key: 'manual',
                                        label: 'Hướng dẫn sử dụng',
                                        icon: <BookFill size={18} />,
                                    },
                                    {
                                        key: 'logout',
                                        label: 'Đăng xuất',
                                        icon: <LogoutOutlined size={20} />,
                                        onClick: () => {
                                            sessionStorage.removeItem('accessToken');
                                            localStorage.removeItem('accessToken');
                                            navigate('/login');
                                        },
                                    },
                                ],
                            }}
                            placement="bottomLeft"
                        >
                            <Avatar style={{ backgroundColor: '#00822d' }}>
                                {name.split(' ').pop()}
                            </Avatar>
                        </Dropdown>
                    )}
                </Space>
            </Flex>
            <Drawer
                footer={
                    <Text style={{ fontSize: 16 }}>
                        Version <b>1.0.0</b>
                    </Text>
                }
                onClose={() => setOpenDraw(prevOpen => !prevOpen)}
                open={openDrawer}
                placement="left"
                title="Menu"
                width={300}
                styles={{ footer: { textAlign: 'center' } }}
            >
                <Menu
                    defaultSelectedKeys={''}
                    items={items}
                    mode="inline"
                    // Nếu navigate ./ thì sẽ đi vào route con
                    onClick={e => navigate(`/${e.key}`)}
                />
            </Drawer>
        </Header>
    );
};

export default HeaderComponent;
