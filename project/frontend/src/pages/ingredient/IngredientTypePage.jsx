// Import React và hooks từ thư viện React
import React, { useEffect, useState } from 'react';

// Import các component cụ thể từ thư viện antd
import { Form, Input, Typography } from 'antd';

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
import { deleteData, getData, postData, putData } from '../../handleAPI/api';

// Destructuring component Text từ Typography
const { Text } = Typography;

// Mảng chứa các item breadcrumb
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Ingredient' }, { title: 'Type' }];

// Lưu trữ table
const table = 'ingredient-type';

// Các trường trong biểu mẫu
const formFields = [
    {
        label: 'Loại nguyên liệu',
        name: 'name',
        rules: [{ required: true, message: 'Vui lòng nhập loại nguyên liệu' }],
        typeInput: <Input maxLength={100} showCount allowClear />,
    },
];

const IngredientTypePage = () => {
    // Ghi log ra console khi component IngredientTypePage được chạy
    console.log('Run IngredientTypePage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        handleGetData();
    }, []);

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    const handleGetData = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData(table);
        setDataSource(data);
    };

    const handleInsertData = async values => {
        // Thêm dữ liệu mới thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await postData(table, values);
        handleModal();
        handleNotification(response, handleGetData);
    };

    const handleUpdateData = async values => {
        // Cập nhật dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await putData(table, values.id, values);
        handleModal();
        handleNotification(response, handleGetData);
    };

    const handleDeleteData = async id => {
        // Xóa dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await deleteData(table, id);
        handleNotification(response, handleGetData);
    };

    const onFinish = values => {
        // Xử lý khi hoàn thành biểu mẫu, kiểm tra và gọi các hàm cập nhật hoặc thêm mới dữ liệu
        values.id ? handleUpdateData(values) : handleInsertData(values);
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: record => <Text strong>{record}</Text>,
            sorter: (a, b) => a.name.length - b.name.length,
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
                        form.setFieldsValue(record);
                        setModalTitle('SỬA LOẠI NGUYÊN LIỆU');
                        handleModal();
                    }}
                    textDelete={record.name}
                />
            ),
        },
    ];

    // Trả về giao diện
    return (
        <>
            {/* Component hiển thị nội dung */}
            <ContentComponent
                // Các mục trong breadcrumb
                items={itemsOfBreadcrumb}
                renderChildren={() => (
                    // Component thẻ card
                    <CardComponent
                        actionFunc={() => {
                            setModalTitle('THÊM LOẠI NGUYÊN LIỆU');
                            handleModal();
                        }}
                        renderChildren={() => (
                            // Component bảng dữ liệu
                            <TableComponent columns={columns} dataSource={dataSource} />
                        )}
                        title="LOẠI NGUYÊN LIỆU"
                    />
                )}
            />
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

export default IngredientTypePage;
