import React, { useEffect, useState } from 'react';
import { Alert, Form, Input, InputNumber, Select, Space, Tag } from 'antd';
import dayjs from 'dayjs';

import {
    CardComponent,
    ContentComponent,
    DropdownComponent,
    FormComponent,
    ModalComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
    TableComponent,
} from '../../components';

import { createInstance } from '../../utils';

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Stock' }, { title: 'Out' }];

const StockOutPage = () => {
    console.log('Run StockOutPage....');

    const [stockOut, setStockOut] = useState([]);

    const [stockIn, setStockIn] = useState([]);

    const [ingredient, setIngredient] = useState([]);

    const [unit, setUnit] = useState([]);

    const [modalMain, setModalMain] = useState({
        open: false,
        title: '',
    });

    const [modalConfirm, setModalConfirm] = useState({
        onOk: () => {},
        open: false,
        message: '',
    });

    const [modalError, setModalError] = useState({
        open: false,
        error: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [form] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    useEffect(() => {
        console.log('Run useEffect');

        readIngredient();
        readStockIn();
        readUnit();
        readStockOut();
    }, []);

    // const handleGetUnit = stockInId => {
    //     return unit.find(
    //         u =>
    //             u._id ===
    //             ingredient.find(
    //                 i => i._id === stockIn.find(s => s._id === stockInId)?.ingredientId
    //             )?.unitId
    //     )?.code;
    // };

    const handleGetUnit = ingredientId =>
        unit.find(item => item._id === ingredient.find(item => item._id === ingredientId)?.unitId)
            ?.code;

    const readIngredient = async () => {
        try {
            const response = await createInstance(accessToken).read('/ingredient/list');

            setIngredient(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readStockIn = async () => {
        try {
            const response = await createInstance(accessToken).read('/stock/in');

            setStockIn(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readUnit = async () => {
        try {
            const response = await createInstance(accessToken).read('/unit');

            setUnit(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readStockOut = async () => {
        try {
            const response = await createInstance(accessToken).read('/stock/out');

            setStockOut(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createStockOut = async values => {
        try {
            const response = await createInstance(accessToken).create('/stock/out', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readStockOut();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateStockOut = async values => {
        try {
            const response = await createInstance(accessToken).update(
                `/stock/out/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readStockOut();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeStockOut = async id => {
        try {
            const response = await createInstance(accessToken).remove(`/stock/out/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readStockOut();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateStockOut(values) : createStockOut(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeStockOut(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa xuất kho?
                                    <b>{record.name}</b>
                                    khỏi CSDL không?
                                    <Alert
                                        message="Thao tác này không thể hoàn tác!"
                                        type="danger"
                                        style={{
                                            backgroundColor: '#ff4d4f',
                                            color: 'white',
                                        }}
                                    />
                                </Space>
                            ),
                        })
                    }
                    actionEdit={() => {
                        form.setFieldsValue(record);
                        setModalMain({ open: true, title: 'SỬA XUẤT KHO' });
                    }}
                />
            ),
        },
        {
            title: 'Nguyên liệu',
            dataIndex: 'ingredientId',
            key: 'ingredientId',
            ellipsis: true,
            sorter: (a, b) => a.ingredientId.length - b.ingredientId.length,
            render: record =>
                ingredient.find(
                    ing => ing._id === stockIn.find(si => si._id === record)?.ingredientId
                )?.name,
        },
        {
            title: 'DVT',
            dataIndex: 'unitId',
            key: 'unitId',
            sorter: (a, b) => a.unitId - b.unitId,
            render: (_, record) => handleGetUnit(record.ingredientId),
        },
        {
            title: 'Nhập kho',
            dataIndex: 'importQuantity',
            key: 'importQuantity',
            ellipsis: true,
            sorter: (a, b) => a.importQuantity - b.importQuantity,
            render: record => <Tag color="green">{record}</Tag>,
        },
        {
            title: 'Xuất kho',
            dataIndex: 'exportQuantity',
            key: 'exportQuantity',
            ellipsis: true,
            sorter: (a, b) => a.exportQuantity - b.exportQuantity,
            render: record => record !== 0 && <Tag color="red">{record}</Tag>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
    ];

    const formFields = [
        {
            label: 'Nguyên liệu',
            name: 'ingredientId',
            rules: [{ required: true, message: 'Vui lòng chọn nguyên liệu' }],
            typeInput: (
                <Select allowClear onChange={e => form.setFieldsValue({ unit: handleGetUnit(e) })}>
                    {ingredient.map(item => (
                        <Select.Option key={item._id} value={item._id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Đơn vị tính',
            name: 'unit',
            // rules: [{ required: true, message: 'Vui lòng nhập số lượng nhập kho' }],
            typeInput: <Input readOnly />,
        },
        {
            label: 'Nhập kho',
            name: 'importQuantity',
            rules: [{ required: true, message: 'Vui lòng nhập số lượng nhập kho' }],
            typeInput: <InputNumber min={0} maxLength={10} style={{ width: '100%' }}></InputNumber>,
        },
        {
            label: 'Xuất kho',
            name: 'exportQuantity',
            rules: [{ required: true, message: 'Vui lòng nhập số lượng xuất kho' }],
            typeInput: <InputNumber min={0} maxLength={10} style={{ width: '100%' }}></InputNumber>,
        },
    ];

    return (
        <>
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalMain({ open: true, title: 'THÊM XUẤT KHO' });
                    }}
                    title="XUẤT KHO"
                >
                    <TableComponent columns={columns} dataSource={stockOut} />
                </CardComponent>
            </ContentComponent>

            <ModalComponent
                afterClose={() => form.resetFields()}
                onCancel={() => setModalMain({ open: false })}
                onOk={() => form.submit()}
                open={modalMain.open}
                title={modalMain.title}
            >
                <FormComponent form={form} formFields={formFields} onFinish={onFinish} />
            </ModalComponent>

            <ModalConfirmComponent
                onCancel={() => setModalConfirm({ open: false })}
                onOk={modalConfirm.onOk}
                open={modalConfirm.open}
                message={modalConfirm.message}
            />

            <ModalErrorComponent
                onOk={() => setModalError({ open: false })}
                open={modalError.open}
                error={modalError.error}
            />

            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
        </>
    );
};

export default StockOutPage;
