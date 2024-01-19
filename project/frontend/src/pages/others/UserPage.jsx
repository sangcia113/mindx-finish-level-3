import React, { useEffect, useState } from 'react';
import { Alert, DatePicker, Form, Input, Select, Space, Tag, Typography } from 'antd';
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

const { Password } = Input;
const { Text } = Typography;

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Others' }, { title: 'User' }];

const UserPage = () => {
    console.log('Run DishTypePage....');

    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const [user, setUser] = useState([]);

    const [role, setRole] = useState([]);

    const [department, setDepartment] = useState([]);

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
        readUser();
        readRole();
        readDepartment();
    }, []);

    const readRole = async () => {
        try {
            const response = await createInstance(accessToken).read('/role');

            setRole(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readDepartment = async () => {
        try {
            const response = await createInstance(accessToken).read('/department');

            setDepartment(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readUser = async (page = 1, pageSize = 10) => {
        try {
            const response = await createInstance(accessToken).read(
                `/user?page=${page}&pageSize=${pageSize}`
            );

            setUser(response.data.data.map(item => ({ ...item, key: item._id })));

            setPagination({
                ...pagination,
                current: response.data.page,
                pageSize: response.data.pageSize,
                total: response.data.total,
            });
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createUser = async values => {
        try {
            const response = await createInstance(accessToken).create('/user', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readUser();
        } catch (error) {
            console.log(error);
            setModalError({ open: true, error });
        }
    };

    const updateUser = async values => {
        try {
            const response = await createInstance(accessToken).update(
                `/user/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readUser();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeUser = async id => {
        try {
            const response = await createInstance(accessToken).remove(`/user/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readUser();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id
            ? updateUser({ ...values, birthday: dayjs(values.birthday).format('DD/MM/YYYY') })
            : createUser({
                  ...values,
                  birthday: dayjs(values.birthday).format('DD/MM/YYYY'),
              });
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeUser(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa nhân viên?
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
                            birthday: dayjs(record.birthday, 'DD/MM/YYYY'),
                        });
                        setModalMain({ open: true, title: 'SỬA NHÂN VIÊN' });
                    }}
                />
            ),
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'code',
            key: 'code',
            ellipsis: true,
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            sorter: (a, b) => a.name.length - b.name.length,
            render: record => (
                <Text strong ellipsis>
                    {record}
                </Text>
            ),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            ellipsis: true,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            ellipsis: true,
            sorter: (a, b) => a.gender - b.gender,
            render: record => (
                <Tag color={record === 0 ? 'pink' : 'green'}>{record === 0 ? 'Nữ' : 'Nam'}</Tag>
            ),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'numberPhone',
            key: 'numberPhone',
            ellipsis: true,
            sorter: (a, b) => a.numberPhone - b.numberPhone,
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
            sorter: (a, b) => a.password.length - b.password.length,
        },
        {
            title: 'Phân quyền',
            dataIndex: 'roleId',
            key: 'roleId',
            ellipsis: true,
            sorter: (a, b) => a.roleId - b.roleId,
            render: record => (
                <Tag
                    color={
                        record === 1
                            ? 'volcano'
                            : record === 2
                            ? 'purple'
                            : record === 3
                            ? 'cyan'
                            : record === 4
                            ? 'lime'
                            : 'blue'
                    }
                >
                    {role.find(item => item._id === record)?.name}
                </Tag>
            ),
        },
        {
            title: 'Bộ phận',
            dataIndex: 'departmentId',
            key: 'departmentId',
            ellipsis: true,
            sorter: (a, b) => a.departmentId - b.departmentId,
            render: record => (
                <Tag color={record === 1 ? 'cyan' : record === 2 ? 'purple' : 'blue'}>
                    {department.find(item => item._id === record)?.name}
                </Tag>
            ),
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
            label: 'Mã nhân viên',
            name: 'code',
            rules: [{ required: true, message: 'Bạn chưa nhập mã nhân viên' }],
            typeInput: (
                <Input allowClear maxLength={10} placeholder="Nhập mã nhân viên" showCount />
            ),
        },
        {
            label: 'Tên nhân viên',
            name: 'name',
            rules: [{ required: true, message: 'Bạn chưa nhập tên nhân viên' }],
            typeInput: (
                <Input allowClear maxLength={50} placeholder="Nhập tên nhân viên" showCount />
            ),
        },
        {
            label: 'Ngày sinh',
            name: 'birthday',
            rules: [{ required: true, message: 'Bạn chưa chọn ngày sinh' }],
            typeInput: (
                <DatePicker
                    allowClear
                    format={'DD/MM/YYYY'}
                    placeholder="Chọn ngày sinh"
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Giới tính',
            name: 'gender',
            rules: [{ required: true, message: 'Bạn chưa chọn giới tính' }],
            typeInput: (
                <Select allowClear placeholder="Chọn giới tính">
                    <Select.Option value={1}>Nam</Select.Option>
                    <Select.Option value={0}>Nữ</Select.Option>
                </Select>
            ),
        },
        {
            label: 'Bộ phận',
            name: 'departmentId',
            rules: [{ required: true, message: 'Vui lòng chọn bộ phận' }],
            typeInput: (
                <Select allowClear placeholder="Chọn bộ phận">
                    {department.map(item => (
                        <Select.Option key={item._id} value={item._id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Chức vụ',
            name: 'roleId',
            rules: [{ required: true, message: 'Vui lòng chọn chức vụ' }],
            typeInput: (
                <Select allowClear placeholder="Chọn chức vụ">
                    {role.map(item => (
                        <Select.Option key={item._id} value={item._id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Mật khẩu',
            name: 'password',
            rules: [{ required: true, message: 'Vui lòng đặt mật khẩu' }],
            typeInput: (
                <Password allowClear maxLength={100} placeholder="Nhập mật khẩu" showCount />
            ),
        },
        {
            label: 'Số điện thoại',
            name: 'numberPhone',
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại' }],
            typeInput: (
                <Input allowClear maxLength={10} placeholder="Nhập số điện thoại" showCount />
            ),
        },
    ];

    return (
        <>
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalMain({ open: true, title: 'THÊM NHÂN VIÊN' });
                    }}
                    title="NHÂN VIÊN"
                >
                    <TableComponent
                        columns={columns}
                        dataSource={user}
                        onChange={(pagination, filters, sorter) => {
                            readUser(pagination.current, pagination.pageSize);
                        }}
                        pagination={pagination}
                    />
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

export default UserPage;
