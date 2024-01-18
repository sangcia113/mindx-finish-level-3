import React, { useEffect, useState } from 'react';

import { Form, Input } from 'antd';

import {
    CardComponent,
    ContentComponent,
    DropdownComponent,
    FormComponent,
    ModalComponent,
    ModalSuccessComponent,
    TableComponent,
} from '../../components/index';

import { createInstance } from '../../utils';
import dayjs from 'dayjs';

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Others' }, { title: 'Department' }];

const formFields = [
    {
        label: 'Mã bộ phận',
        name: 'code',
        rules: [{ required: true, message: 'Vui lòng nhập mã bộ phận' }],
        typeInput: <Input maxLength={50} showCount allowClear />,
    },
    {
        label: 'Tên bộ phận',
        name: 'name',
        rules: [{ required: true, message: 'Vui lòng nhập tên bộ phận' }],
        typeInput: <Input maxLength={100} showCount allowClear />,
    },
];

const DepartmentPage = () => {
    console.log('Run DepartmentPage....');

    const [dataSource, setDataSource] = useState([]);

    const [modalMain, setModalMain] = useState({
        open: false,
        title: '',
    });

    const [modalSuccess, setModalSuccess] = useState({
        open: false,
        message: '',
    });

    const [form] = Form.useForm();

    useEffect(() => {
        console.log('Run useEffect');

        getDepartment();
    }, []);

    const getDepartment = async () => {
        try {
            const response = await createInstance().read('/department');

            setDataSource(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        }
    };

    const insertDepartment = async values => {
        try {
            const response = await createInstance().create('/department', values);

            setModalSuccess({ open: true, message: response?.data?.message });
        } catch (error) {
            console.log(error);
        }
    };

    const updateDepartment = async values => {
        const response = await createInstance().update('/department', values);
        console.log(response.data);
    };

    const deleteDepartment = async id => {
        const response = await createInstance().remove('/department', id);
        console.log(response.data);
    };

    const onFinish = values => {
        values.id ? updateDepartment(values) : insertDepartment(values);
    };

    const columns = [
        {
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() => deleteDepartment(record.id)}
                    actionEdit={() => {
                        form.setFieldsValue(record);
                        setModalMain({ open: true, title: 'SỬA BỘ PHẬN' });
                    }}
                    textDelete={record.name}
                />
            ),
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY'),
        },
    ];

    return (
        <>
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalMain({ open: true, title: 'THÊM BỘ PHẬN' });
                    }}
                    title="PHÒNG BAN"
                >
                    <TableComponent columns={columns} dataSource={dataSource} />
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

            <ModalSuccessComponent
                onOk={() => setModalSuccess({ open: false })}
                open={modalSuccess.open}
                message={modalSuccess.message}
            />
        </>
    );
};

export default DepartmentPage;
