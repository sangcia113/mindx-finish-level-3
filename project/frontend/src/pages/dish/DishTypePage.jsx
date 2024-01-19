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

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Dish' }, { title: 'Type' }];

const formFields = [
    {
        label: 'Mã loại món ăn',
        name: 'code',
        rules: [{ required: true, message: 'Vui lòng nhập mã loại món ăn' }],
        typeInput: <Input maxLength={50} showCount allowClear />,
    },
    {
        label: 'Tên loại món ăn',
        name: 'name',
        rules: [{ required: true, message: 'Vui lòng nhập tên loại món ăn' }],
        typeInput: <Input maxLength={100} showCount allowClear />,
    },
];

const DishTypePage = () => {
    console.log('Run DishTypePage....');

    const [dishType, setDishType] = useState([]);

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
        readDishType();
    }, []);

    const readDishType = async () => {
        try {
            const response = await createInstance(accessToken).read('/dish/type');

            setDishType(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createDishType = async values => {
        try {
            const response = await createInstance(accessToken).create('/dish/type', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readDishType();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateDishType = async values => {
        try {
            const response = await createInstance(accessToken).update(
                `/dish/type/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readDishType();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeDishType = async id => {
        try {
            const response = await createInstance(accessToken).remove(`/dish/type/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readDishType();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateDishType(values) : createDishType(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeDishType(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa loại món ăn?
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
                        setModalMain({ open: true, title: 'SỬA LOẠI MÓN ĂN' });
                    }}
                />
            ),
        },
        {
            title: 'Mã loại món ăn',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: 'Tên loại món ăn',
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
                        setModalMain({ open: true, title: 'THÊM LOẠI MÓN ĂN' });
                    }}
                    title="LOẠI MÓN ĂN"
                >
                    <TableComponent columns={columns} dataSource={dishType} />
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

export default DishTypePage;
