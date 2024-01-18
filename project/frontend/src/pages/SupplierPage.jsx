import React, { useEffect, useState } from 'react';
import { Alert, Form, Input, Space, Typography } from 'antd';
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
} from '../components';

import { createInstance } from '../utils';

const { Text } = Typography;
const { TextArea } = Input;
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Others' }, { title: 'Supplier' }];

const formFields = [
    {
        label: 'Mã NCC',
        name: 'code',
        rules: [{ required: true, message: 'Vui lòng nhập mã NCC' }],
        typeInput: <Input allowClear maxLength={10} placeholder="Nhập mã NCC" showCount />,
    },
    {
        label: 'Tên NCC',
        name: 'name',
        rules: [{ required: true, message: 'Vui lòng nhập tên NCC' }],
        typeInput: <Input allowClear maxLength={100} placeholder="Nhập tên NCC" showCount />,
    },
    {
        label: 'Số điện thoại',
        name: 'numberPhone',
        // rules: [{ required: true, message: 'Vui lòng nhập số điện thoại' }],
        typeInput: <Input allowClear maxLength={12} placeholder="Nhập số điện thoại" showCount />,
    },
    {
        label: 'Địa chỉ',
        name: 'address',
        // rules: [{ required: true, message: 'Vui lòng nhập địa chỉ' }],
        typeInput: (
            <TextArea allowClear maxLength={200} placeholder="Nhập số địa chỉ" rows={5} showCount />
        ),
    },
];

const SupplierPage = () => {
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

    useEffect(() => {
        readSupplier();
    }, []);

    const readSupplier = async () => {
        try {
            const response = await createInstance().read('/supplier');

            setSupplier(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createSupplier = async values => {
        try {
            const response = await createInstance().create('/supplier', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readSupplier();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateSupplier = async values => {
        try {
            const response = await createInstance().update(`/supplier/${values._id}`, values);

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readSupplier();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeSupplier = async id => {
        try {
            const response = await createInstance().remove(`/supplier/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readSupplier();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateSupplier(values) : createSupplier(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeSupplier(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa bộ phận?
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
                        setModalMain({ open: true, title: 'SỬA BỘ PHẬN' });
                    }}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: record => (
                <Text strong ellipsis>
                    {record}
                </Text>
            ),
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Number Phone',
            dataIndex: 'numberPhone',
            key: 'numberPhone',
            ellipsis: true,
            sorter: (a, b) => a.numberPhone - b.numberPhone,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
    ];

    return (
        <>
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalMain({ open: true, title: 'THÊM BỘ PHẬN' });
                    }}
                    title="BỘ PHẬN"
                >
                    <TableComponent columns={columns} dataSource={supplier} />
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

export default SupplierPage;
