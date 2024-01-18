// Import React và hooks từ thư viện React
import React, { useEffect, useState } from 'react';

// Import các component cụ thể từ thư viện antd
import { DatePicker, Form, Input, Select, Tag, Typography } from 'antd';

// Import hàm dayjs
import dayjs from 'dayjs';

// Import các component tùy chỉnh từ đường dẫn tương đối
import {
    CardComponent,
    ContentComponent,
    DropdownComponent,
    FormComponent,
    ModalComponent,
    TableComponent,
} from '../../components/index';

// Import hàm xử lý thông báo từ file API cụ thể
import { handleNotification } from '../../handleAPI/handleNotification';

// Import các hàm xử lý thao tác dữ liệu từ file API cụ thể
import { deleteData, getData, getDataByType, postData, putData } from '../../handleAPI/api';
import { createInstance } from '../../utils';
import Password from 'antd/es/input/Password';

// Destructuring component Text từ Typography
const { Text } = Typography;

// Mảng chứa các item breadcrumb
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Others' }, { title: 'Staff' }];

const UserPage = () => {
    // Ghi log ra console khi component DishTypePage được chạy
    console.log('Run DishTypePage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Set account type cho thẻ Select
    const [role, setRole] = useState([]);

    // Set department cho thẻ Select
    const [department, setDepartment] = useState([]);

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    // Sử dụng useEffect để gọi hàm handleGetData
    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        // handleGetData();
        getUser();
        getRole();
        getDepartment();
    }, []);

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    const getRole = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await createInstance().read('/role');
        setRole(response.data);
    };

    const getDepartment = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await createInstance().read('/department');
        setDepartment(response.data);
    };

    const getUser = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await createInstance().read('/user');
        console.log(response.data);
        setDataSource(response.data);
    };

    const handleInsertData = async values => {
        try {
            const response = await createInstance().create('/user', values);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateData = async values => {
        // Cập nhật dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
    };

    const handleDeleteData = async id => {
        // Xóa dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
    };

    const onFinish = values => {
        // Xử lý khi hoàn thành biểu mẫu, kiểm tra và gọi các hàm cập nhật hoặc thêm mới dữ liệu
        values.id
            ? handleUpdateData({ ...values, birthday: dayjs(values.birthday).format('YYYY-MM-DD') })
            : handleInsertData({
                  ...values,
                  birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
              });
    };

    // Các cột trong bảng dữ liệu
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            render: record => (
                <Text strong ellipsis>
                    {record}
                </Text>
            ),
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            render: record => <Text ellipsis>{dayjs(record).format('YYYY-MM-DD')}</Text>,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a, b) => a.gender - b.gender,
            render: record => (
                <Tag color={record === 0 ? 'pink' : 'green'}>{record === 0 ? 'Nữ' : 'Nam'}</Tag>
            ),
        },
        {
            title: 'Number Phone',
            dataIndex: 'numberPhone',
            key: 'numberPhone',
            ellipsis: true,
            sorter: (a, b) => a.numberPhone - b.numberPhone,
        },
        {
            title: 'Pass',
            dataIndex: 'pass',
            key: 'pass',
            sorter: (a, b) => a.pass.length - b.pass.length,
        },
        {
            title: 'Role',
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
                    {role.find(item => item.id === record)?.name}
                </Tag>
            ),
        },
        {
            title: 'Department',
            dataIndex: 'departmentId',
            key: 'departmentId',
            sorter: (a, b) => a.departmentId - b.departmentId,
            render: record => (
                <Tag color={record === 1 ? 'cyan' : record === 2 ? 'purple' : 'blue'}>
                    {department.find(item => item.id === record)?.name}
                </Tag>
            ),
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() => handleDeleteData(record.id)}
                    actionEdit={() => {
                        form.setFieldsValue({
                            ...record,
                            birthday: dayjs(record.birthday),
                        });
                        setModalTitle('SỬA NHÂN VIÊN');
                        handleModal();
                    }}
                    textDelete={record.name}
                />
            ),
        },
    ];

    // Các trường trong biểu mẫu
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
                        <Select.Option key={item.id} value={item.id}>
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
                        <Select.Option key={item.id} value={item.id}>
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
                <Input allowClear maxLength={11} placeholder="Nhập số điện thoại" showCount />
            ),
        },
    ];

    // Trả về giao diện
    return (
        <>
            {/* Component hiển thị nội dung */}
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalTitle('THÊM NHÂN VIÊN');
                        handleModal();
                    }}
                    title="NHÂN VIÊN"
                >
                    <TableComponent columns={columns} dataSource={dataSource} />
                </CardComponent>
            </ContentComponent>
            {/* Component hiển thị hộp thoại modal */}
            <ModalComponent
                // Xử lý sau khi đóng modal
                afterClose={() => form.resetFields()}
                // Xử lý khi nhấn nút Hủy
                onCancel={handleModal}
                // Xử lý khi nhấn nút OK
                onOk={() => form.submit()}
                // Trạng thái mở hoặc đóng của modal
                open={modalOpen}
                renderChildren={() => (
                    // Component biểu mẫu
                    <FormComponent form={form} formFields={formFields} onFinish={onFinish} />
                )}
                // Tiêu đề của modal
                title={modalTitle}
            />
        </>
    );
};

export default UserPage;
