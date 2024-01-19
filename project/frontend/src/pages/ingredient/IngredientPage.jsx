import React, { useEffect, useState } from 'react';
import { Alert, Form, Input, InputNumber, Select, Space, Tag, Typography } from 'antd';
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

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Ingredient' }, { title: 'List' }];
const { Text } = Typography;

const IngredientPage = () => {
    console.log('Run UnitPage....');

    const [ingredient, setIngredient] = useState([]);

    const [ingredientType, setIngredientType] = useState([]);

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
        readIngredientType();
        readUnit();
        readIngredient();
    }, []);

    const readIngredientType = async () => {
        try {
            const response = await createInstance(accessToken).read('/ingredient/type');

            setIngredientType(response.data.map(item => ({ ...item, key: item._id })));
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

    const readIngredient = async () => {
        try {
            const response = await createInstance(accessToken).read('/ingredient/list');

            setIngredient(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createIngredient = async values => {
        try {
            const response = await createInstance(accessToken).create('/ingredient/list', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readIngredient();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateIngredient = async values => {
        try {
            const response = await createInstance(accessToken).update(
                `/ingredient/list/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readIngredient();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeIngredient = async id => {
        try {
            const response = await createInstance(accessToken).remove(`/ingredient/list/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readIngredient();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateIngredient(values) : createIngredient(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeIngredient(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa nguyên liệu?
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
                        setModalMain({ open: true, title: 'SỬA NGUYÊN LIỆU' });
                    }}
                />
            ),
        },
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên nguyên liệu',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            sorter: (a, b) => a.name.length - b.name.length,
            render: record => <Text strong>{record}</Text>,
        },
        {
            title: 'Loại nguyên liệu',
            dataIndex: 'ingredientTypeId',
            key: 'ingredientTypeId',
            ellipsis: true,
            sorter: (a, b) => a.ingredientTypeId - b.ingredientTypeId,
            render: record => ingredientType.find(item => item._id === record)?.name,
        },
        {
            title: 'DVT',
            dataIndex: 'unitId',
            key: 'unitId',
            sorter: (a, b) => a.unitId.length - b.unitId.length,
            render: record => unit.find(item => item._id === record)?.name,
        },
        {
            title: 'Tồn kho',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
            ellipsis: true,
            sorter: (a, b) => a.stockQuantity - b.stockQuantity,
            render: (_, record) =>
                record.stockQuantity > 0 && record.stockQuantity <= record.minStock ? (
                    <Tag color="OrangeRed" style={{ fontSize: 18 }}>
                        {record.stockQuantity}
                    </Tag>
                ) : (
                    (
                        <Tag color="DodgerBlue" style={{ fontSize: 18 }}>
                            {record.stockQuantity}
                        </Tag>
                    ) || ''
                ),
        },
        {
            title: 'Tồn kho nhỏ nhất',
            dataIndex: 'minStock',
            key: 'minStock',
            ellipsis: true,
            sorter: (a, b) => a.minStock - b.minStock,
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
            label: 'Tên nguyên liệu',
            name: 'name',
            rules: [{ required: true, message: 'Vui lòng nhập tên nguyên liệu' }],
            typeInput: <Input maxLength={100} showCount allowClear />,
        },
        {
            label: 'Loại nguyên liệu',
            name: 'ingredientTypeId',
            rules: [{ required: true, message: 'Vui lòng chọn loại nguyên liệu' }],
            typeInput: (
                <Select allowClear>
                    {ingredientType.map(item => (
                        <Select.Option key={item._id} value={item._id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Đơn vị tính',
            name: 'unitId',
            rules: [{ required: true, message: 'Vui lòng chọn đơn vị tính' }],
            typeInput: (
                <Select allowClear>
                    {unit.map(item => (
                        <Select.Option key={item._id} value={item._id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Tồn kho nhỏ nhất',
            name: 'minStock',
            rules: [{ required: true, message: 'Vui lòng nhập tồn kho nhỏ nhất' }],
            typeInput: <InputNumber min={0} maxLength={10} style={{ width: '100%' }}></InputNumber>,
        },
    ];

    return (
        <>
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalMain({ open: true, title: 'THÊM NGUYÊN LIỆU' });
                    }}
                    title="NGUYÊN LIỆU"
                >
                    <TableComponent columns={columns} dataSource={ingredient} />
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

export default IngredientPage;
