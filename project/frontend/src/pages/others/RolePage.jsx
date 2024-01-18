import React, { useEffect, useState } from 'react';
import { Alert, Form, Input, Space } from 'antd';
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

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Others' }, { title: 'Role' }];

const formFields = [
    {
        label: 'Mã phân quyền',
        name: 'code',
        rules: [{ required: true, message: 'Vui lòng nhập mã phân quyền' }],
        typeInput: <Input maxLength={50} showCount allowClear />,
    },
    {
        label: 'Tên phân quyền',
        name: 'name',
        rules: [{ required: true, message: 'Vui lòng nhập tên phân quyền' }],
        typeInput: <Input maxLength={100} showCount allowClear />,
    },
];

const RolePage = () => {
    console.log('Run RolePage....');

    const [role, setRole] = useState([]);

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
        readRole();
    }, []);

    const readRole = async () => {
        try {
            const response = await createInstance().read('/role');

            setRole(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createRole = async values => {
        try {
            const response = await createInstance().create('/role', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readRole();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateRole = async values => {
        try {
            const response = await createInstance().update(`/role/${values._id}`, values);

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readRole();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeRole = async id => {
        try {
            const response = await createInstance().remove(`/role/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readRole();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateRole(values) : createRole(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeRole(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa phân quyền?
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
                        setModalMain({ open: true, title: 'SỬA PHÂN QUYỀN' });
                    }}
                />
            ),
        },
        {
            title: 'Mã phân quyền',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: 'Tên phân quyền',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Ngày tạo',
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
                        setModalMain({ open: true, title: 'THÊM PHÂN QUYỀN' });
                    }}
                    title="PHÂN QUYỀN"
                >
                    <TableComponent columns={columns} dataSource={role} />
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

export default RolePage;
