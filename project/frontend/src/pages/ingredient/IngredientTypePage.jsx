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

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Ingredient' }, { title: 'Type' }];

const formFields = [
    {
        label: 'Mã loại nguyên liệu',
        name: 'code',
        rules: [{ required: true, message: 'Vui lòng nhập mã loại nguyên liệu' }],
        typeInput: <Input maxLength={50} showCount allowClear />,
    },
    {
        label: 'Tên loại nguyên liệu',
        name: 'name',
        rules: [{ required: true, message: 'Vui lòng nhập tên loại nguyên liệu' }],
        typeInput: <Input maxLength={100} showCount allowClear />,
    },
];

const IngredientTypePage = () => {
    console.log('Run IngredientTypePage....');

    const [ingredientType, setIngredientType] = useState([]);

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
        readIngredientType();
    }, []);

    const readIngredientType = async () => {
        try {
            const response = await createInstance().read('/ingredient/type');

            setIngredientType(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createIngredientType = async values => {
        try {
            const response = await createInstance().create('/ingredient/type', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readIngredientType();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateIngredientType = async values => {
        try {
            const response = await createInstance().update(
                `/ingredient/type/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readIngredientType();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeIngredientType = async id => {
        try {
            const response = await createInstance().remove(`/ingredient/type/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readIngredientType();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id ? updateIngredientType(values) : createIngredientType(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeIngredientType(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa loại nguyên liệu?
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
                        setModalMain({ open: true, title: 'SỬA LOẠI NGUYÊN LIỆU' });
                    }}
                />
            ),
        },
        {
            title: 'Mã loại nguyên liệu',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: 'Tên loại nguyên liệu',
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
                        setModalMain({ open: true, title: 'THÊM LOẠI NGUYÊN LIỆU' });
                    }}
                    title="LOẠI NGUYÊN LIỆU"
                >
                    <TableComponent columns={columns} dataSource={ingredientType} />
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

export default IngredientTypePage;
