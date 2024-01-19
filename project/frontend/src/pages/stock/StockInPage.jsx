import React, { useEffect, useState } from 'react';
import { Alert, Form, Input, InputNumber, Select, Space, Typography } from 'antd';
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

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Stock' }, { title: 'In' }];
const { Text } = Typography;

const addSeperator = values => `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const StockInPage = () => {
    console.log('Run StockInPage....');

    const [stockIn, setStockIn] = useState([]);

    const [ingredient, setIngredient] = useState([]);

    const [unit, setUnit] = useState([]);

    const [supplier, setSupplier] = useState([]);

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

        readStockIn();
        readIngredient();
        readUnit();
        readSupplier();
    }, []);

    const handleGetUnit = ingredientId =>
        unit.find(item => item._id === ingredient.find(item => item._id === ingredientId)?.unitId)
            ?.code;

    const calculatorTotal = () => form.getFieldValue('quantity') * form.getFieldValue('price');

    const readIngredient = async () => {
        try {
            const response = await createInstance(accessToken).read('/ingredient/list');

            setIngredient(response.data.map(item => ({ ...item, key: item._id })));
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

    const readSupplier = async () => {
        try {
            const response = await createInstance(accessToken).read('/supplier');

            setSupplier(response.data.map(item => ({ ...item, key: item._id })));
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

    const createStockIn = async values => {
        try {
            const response = await createInstance(accessToken).create('/stock/in', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readStockIn();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateStockIn = async values => {
        try {
            const response = await createInstance(accessToken).update(
                `/stock/in/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readStockIn();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeStockIn = async id => {
        try {
            const response = await createInstance(accessToken).remove(`/stock/in/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readStockIn();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateStockIn(values) : createStockIn(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeStockIn(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa nhập kho?
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
                        form.setFieldsValue({
                            ...record,
                            unit: handleGetUnit(record.ingredientId),
                            total: addSeperator(record.quantity * record.price),
                        });
                        setModalMain({ open: true, title: 'SỬA NHẬP KHO' });
                    }}
                />
            ),
        },
        {
            title: 'Nguyên liệu',
            dataIndex: 'ingredientId',
            key: 'ingredientId',
            ellipsis: true,
            sorter: (a, b) => a.ingredientId - b.ingredientId,
            render: record => (
                <Text strong>{ingredient.find(item => item._id === record)?.name}</Text>
            ),
        },
        {
            title: 'DVT',
            dataIndex: 'unit',
            key: 'unit',
            ellipsis: true,
            render: (_, record) => handleGetUnit(record.ingredientId),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            ellipsis: true,
            sorter: (a, b) => a.quantity - b.quantity,
            render: record => addSeperator(record),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            ellipsis: true,
            sorter: (a, b) => a.price - b.price,
            render: record => addSeperator(record),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
            ellipsis: true,
            render: (_, record) => (
                <Text strong>{addSeperator(record.quantity * record.price)}</Text>
            ),
        },
        {
            title: 'NCC',
            dataIndex: 'supplierId',
            key: 'supplierId',
            ellipsis: true,
            sorter: (a, b) => a.supplierId - b.supplierId,
            render: record => supplier.find(item => item._id === record)?.name,
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
                <Select allowClear onChange={e => form.setFieldValue('unit', handleGetUnit(e))}>
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
            // rules: [{ required: true, message: 'Vui lòng chọn đơn vị tính' }],
            typeInput: <Input readOnly />,
        },
        {
            label: 'Số lượng',
            name: 'quantity',
            rules: [{ required: true, message: 'Vui lòng nhập số lượng' }],
            typeInput: (
                <InputNumber
                    formatter={value => addSeperator(value)}
                    maxLength={10}
                    min={0}
                    onChange={() => form.setFieldValue('total', calculatorTotal())}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Đơn giá',
            name: 'price',
            rules: [{ required: true, message: 'Vui lòng nhập đơn giá' }],
            typeInput: (
                <InputNumber
                    controls={false}
                    formatter={value => addSeperator(value)}
                    maxLength={10}
                    min={0}
                    onChange={() => form.setFieldValue('total', calculatorTotal())}
                    suffix="VND"
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Thành tiền',
            name: 'total',
            // rules: [{ required: true, message: 'Vui lòng chọn đơn vị tính' }],
            typeInput: (
                <InputNumber
                    controls={false}
                    formatter={value => addSeperator(value)}
                    maxLength={10}
                    min={0}
                    readOnly
                    suffix="VND"
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Nhà cung cấp',
            name: 'supplierId',
            rules: [{ required: true, message: 'Vui lòng chọn nhà cung cấp' }],
            typeInput: (
                <Select allowClear>
                    {supplier.map(item => (
                        <Select.Option key={item._id} value={item._id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
    ];

    return (
        <>
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalMain({ open: true, title: 'THÊM NHẬP KHO' });
                    }}
                    title="NHẬP KHO"
                >
                    <TableComponent columns={columns} dataSource={stockIn} />
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

export default StockInPage;
