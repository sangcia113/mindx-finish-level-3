import React, { useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Image, Layout, Menu } from 'antd';

import {
    ArrowBarLeft,
    ArrowBarRight,
    Bank2,
    Basket3Fill,
    Bezier,
    CalculatorFill,
    CardChecklist,
    Cart4,
    CartFill,
    Cast,
    ChatRightDotsFill,
    HouseFill,
    PersonVcard,
    PiggyBankFill,
    TicketDetailedFill,
} from 'react-bootstrap-icons';

const { Sider } = Layout;

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
                icon: <CardChecklist color="royalBlue" />,
            },
            {
                key: 'dish-type',
                label: 'Phân loại',
                icon: <Basket3Fill color="royalBlue" />,
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
                icon: <CardChecklist color="royalBlue" />,
            },
            {
                key: 'ingredient-type',
                label: 'Phân loại',
                icon: <Basket3Fill color="royalBlue" />,
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
                icon: <ArrowBarLeft color="#008034" />,
            },
            {
                key: 'stock-out',
                label: 'Xuất kho',
                icon: <ArrowBarRight color="#008034" />,
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
                icon: <CalculatorFill color="#008034" />,
            },
            {
                key: 'others-staff',
                label: 'Nhân viên',
                icon: <PersonVcard color="#008034" />,
            },
            {
                key: 'others-department',
                label: 'Phòng ban',
                icon: <Cast color="#008034" />,
            },
            {
                key: 'others-role',
                label: 'Chức vụ',
                icon: <Bezier color="#008034" />,
            },
        ],
    },
];

const SiderComponent = ({ defaultSelectedKeys, defaultOpenKeys }) => {
    const navigate = useNavigate();

    const handleMenuClick = useCallback(e => navigate(`./${e.key}`), [navigate]);

    return (
        <Sider breakpoint="xxl" collapsible collapsedWidth="0" theme="light" width="220">
            <Link to="/">
                <Image
                    src={require('../assets/logo/logoWFC.png')}
                    width="210px"
                    preview={false}
                    alt="Logo WineFood"
                />
            </Link>
            <Menu
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                items={items}
                // Navigate route
                onClick={handleMenuClick}
            />
        </Sider>
    );
};

export default SiderComponent;
