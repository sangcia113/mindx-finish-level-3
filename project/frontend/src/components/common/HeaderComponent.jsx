import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Drawer, Dropdown, Flex, Layout, Menu, Space, Typography } from 'antd';
import {
    ArrowBarLeft,
    ArrowBarRight,
    Bank2,
    Basket3Fill,
    Bell,
    Bezier,
    BookFill,
    CalculatorFill,
    CardChecklist,
    Cart4,
    CartFill,
    Cast,
    ChatDots,
    ChatFill,
    ChatRightDotsFill,
    HouseFill,
    KeyFill,
    List,
    PersonVcard,
    PiggyBankFill,
    TicketDetailedFill,
} from 'react-bootstrap-icons';
import { LogoutOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Header } = Layout;

const items = [
    { key: '', label: 'Trang chủ', icon: <HouseFill color="#008034" /> },
    { type: 'divider' },
    { key: 'menu', label: 'Thực đơn', icon: <TicketDetailedFill color="#008034" /> },
    { type: 'divider' },
    {
        key: 'dish',
        label: 'Món ăn',
        icon: <PiggyBankFill color="#008034" />,
        children: [
            {
                key: 'dish-list',
                label: 'Danh sách',
                icon: <CardChecklist color="DodgerBlue" />,
            },
            {
                key: 'dish-type',
                label: 'Phân loại',
                icon: <Basket3Fill color="DodgerBlue" />,
            },
        ],
    },
    { type: 'divider' },
    {
        key: 'ingredient',
        label: 'Nguyên liệu',
        icon: <CartFill color="#008034" />,
        children: [
            {
                key: 'ingredient-list',
                label: 'Danh sách',
                icon: <CardChecklist color="DodgerBlue" />,
            },
            {
                key: 'ingredient-type',
                label: 'Phân loại',
                icon: <Basket3Fill color="DodgerBlue" />,
            },
        ],
    },
    { type: 'divider' },
    {
        key: 'stock',
        label: 'Quản lý kho',
        icon: <Bank2 color="#008034" />,
        children: [
            {
                key: 'stock-in',
                label: 'Nhập kho',
                icon: <ArrowBarLeft color="DodgerBlue" />,
            },
            {
                key: 'stock-out',
                label: 'Xuất kho',
                icon: <ArrowBarRight color="DodgerBlue" />,
            },
        ],
    },
    { type: 'divider' },
    { key: 'supplier', label: 'Nhà cung cấp', icon: <Cart4 color="#008034" /> },
    { type: 'divider' },
    {
        key: 'others',
        label: 'Khác',
        icon: <ChatRightDotsFill color="#008034" />,
        children: [
            {
                key: 'others-unit',
                label: 'Đơn vị tính',
                icon: <CalculatorFill color="DodgerBlue" />,
            },
            {
                key: 'others-user',
                label: 'Nhân viên',
                icon: <PersonVcard color="DodgerBlue" />,
            },
            {
                key: 'others-department',
                label: 'Bộ phận',
                icon: <Cast color="DodgerBlue" />,
            },
            {
                key: 'others-role',
                label: 'Chức vụ',
                icon: <Bezier color="DodgerBlue" />,
            },
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
                padding: '0 36px 0 4px',
            }}
        >
            <Flex align="center" justify="space-between">
                <List
                    style={{ cursor: 'pointer', fontSize: 36 }}
                    onClick={() => setOpenDraw(prevOpen => !prevOpen)}
                />
                <Link to="/">
                    <Text style={{ color: 'DodgerBlue', fontSize: 36, fontWeight: 700 }}>
                        MindX
                    </Text>
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
                width={280}
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
