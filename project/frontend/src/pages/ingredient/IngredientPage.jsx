// Import React và hooks từ thư viện React
import React, { useEffect, useState } from 'react';

// Import các component cụ thể từ thư viện antd
import { Form, Input, InputNumber, Select, Tag, Typography } from 'antd';

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
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Ingredient' }, { title: 'List' }];

// Lưu trữ table
const table = 'ingredient';

const IngredientPage = () => {
    // Ghi log ra console khi component UnitPage được chạy
    console.log('Run UnitPage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Set ingredient type cho thẻ Select
    const [ingredientType, setIngredientType] = useState([]);

    // Set unit cho thẻ Select
    const [unit, setUnit] = useState([]);

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        handleGetData();
        handleGetDataIngredientType();
        handleGetDataUnit();
    }, []);

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    const handleGetDataIngredientType = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData('ingredient-type');
        setIngredientType(data);
    };

    const handleGetDataUnit = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData('unit');
        setUnit(data);
    };

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
            render: record => ingredientType.find(item => item.id === record)?.name,
        },
        {
            title: 'DVT',
            dataIndex: 'unitId',
            key: 'unitId',
            sorter: (a, b) => a.unitId.length - b.unitId.length,
            render: record => unit.find(item => item.id === record)?.name,
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
                        setModalTitle('SỬA NGUYÊN LIỆU');
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
                        <Select.Option key={item.id} value={item.id}>
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
                        <Select.Option key={item.id} value={item.id}>
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
                            setModalTitle('THÊM NGUYÊN LIỆU');
                            handleModal();
                        }}
                        renderChildren={() => (
                            // Component bảng dữ liệu
                            <TableComponent columns={columns} dataSource={dataSource} />
                        )}
                        title="NGUYÊN LIỆU"
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

export default IngredientPage;
