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

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Others' }, { title: 'Unit' }];

const formFields = [
    {
        label: 'Mã đơn vị tính',
        name: 'code',
        rules: [{ required: true, message: 'Vui lòng nhập mã đơn vị tính' }],
        typeInput: <Input maxLength={50} showCount allowClear />,
    },
    {
        label: 'Tên đơn vị tính',
        name: 'name',
        rules: [{ required: true, message: 'Vui lòng nhập tên đơn vị tính' }],
        typeInput: <Input maxLength={100} showCount allowClear />,
    },
];

const UnitPage = () => {
    console.log('Run UnitPage....');

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
        readUnit();
    }, []);

    const readUnit = async () => {
        try {
            const response = await createInstance(accessToken).read('/unit');

            setUnit(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createUnit = async values => {
        try {
            const response = await createInstance(accessToken).create('/unit', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readUnit();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateUnit = async values => {
        try {
            const response = await createInstance(accessToken).update(
                `/unit/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readUnit();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeUnit = async id => {
        try {
            const response = await createInstance(accessToken).remove(`/unit/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readUnit();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateUnit(values) : createUnit(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeUnit(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa đơn vị tính?
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
                        setModalMain({ open: true, title: 'SỬA ĐƠN VỊ TÍNH' });
                    }}
                />
            ),
        },
        {
            title: 'Mã đơn vị tính',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: 'Tên đơn vị tính',
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
                        setModalMain({ open: true, title: 'THÊM ĐƠN VỊ TÍNH' });
                    }}
                    title="ĐƠN VỊ TÍNH"
                >
                    <TableComponent columns={columns} dataSource={unit} />
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

export default UnitPage;
