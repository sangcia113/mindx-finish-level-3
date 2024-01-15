// Import React và hooks từ thư viện React
import React, { useEffect, useState } from 'react';

// Import các component cụ thể từ thư viện antd
import { Form, Input, InputNumber, Select, Typography } from 'antd';

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
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Stock' }, { title: 'In' }];

// Lưu trữ table
const table = 'stock-in';

// Hàm thêm dấu phẩy ngăn cách phần nghìn
const addSeperator = values => `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const StockInPage = () => {
    // Ghi log ra console khi component StockInPage được chạy
    console.log('Run StockInPage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Set ingredient cho thẻ Select
    const [ingredient, setIngredient] = useState([]);

    // Set unit cho thẻ Select
    const [unit, setUnit] = useState([]);

    // Set supplier cho thẻ Select
    const [supplier, setSupplier] = useState([]);

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        handleGetData();
        handleGetDataIngredient();
        handleGetDataUnit();
        handleGetDataSupplier();
    }, []);

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    // Hàm lấy Name Unit
    const handleGetUnit = ingredientId =>
        unit.find(item => item.id === ingredient.find(item => item.id === ingredientId)?.unitId)
            ?.name;

    // Hàm tính tổng tiền
    const calculatorTotal = () =>
        form.getFieldValue('importQuantity') * form.getFieldValue('price');

    const handleGetDataIngredient = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData('ingredient');
        setIngredient(data);
    };

    const handleGetDataUnit = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData('unit');
        setUnit(data);
    };

    const handleGetDataSupplier = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData('supplier');
        setSupplier(data);
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
            title: 'Ingredient',
            dataIndex: 'ingredientId',
            key: 'ingredientId',
            sorter: (a, b) => a.ingredientId - b.ingredientId,
            render: record => (
                <Text strong>{ingredient.find(item => item.id === record)?.name}</Text>
            ),
        },
        {
            title: 'Unit',
            dataIndex: 'unitId',
            key: 'unitId',
            render: (_, record) => {
                return handleGetUnit(record.ingredientId);
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'importQuantity',
            key: 'importQuantity',
            sorter: (a, b) => a.importQuantity - b.importQuantity,
            render: record => addSeperator(record),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: record => addSeperator(record),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            ellipsis: true,
            render: (_, record) => (
                <Text strong>{addSeperator(record.importQuantity * record.price)}</Text>
            ),
        },
        {
            title: 'Supplier',
            dataIndex: 'supplierId',
            key: 'supplierId',
            ellipsis: true,
            sorter: (a, b) => a.supplierId - b.supplierId,
            render: record => supplier.find(item => item.id === record)?.name,
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
                            unit: handleGetUnit(record.ingredientId),
                            total: record.importQuantity * record.price,
                        });
                        setModalTitle('SỬA NHẬP KHO');
                        handleModal();
                    }}
                    textDelete={
                        <Text strong>
                            {ingredient.find(item => item.id === record.ingredientId)?.name}
                        </Text>
                    }
                />
            ),
        },
    ];

    // Các trường trong biểu mẫu
    const formFields = [
        {
            label: 'Nguyên liệu',
            name: 'ingredientId',
            rules: [{ required: true, message: 'Vui lòng chọn nguyên liệu' }],
            typeInput: (
                <Select allowClear onChange={e => form.setFieldValue('unit', handleGetUnit(e))}>
                    {ingredient.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            label: 'Đơn vị tính',
            name: 'unit',
            // rules: [{ required: true, message: 'Vui lòng chọn đơn vị tính' }],
            typeInput: <Input readOnly />,
        },
        {
            label: 'Số lượng',
            name: 'importQuantity',
            rules: [{ required: true, message: 'Vui lòng nhập số lượng' }],
            typeInput: (
                <InputNumber
                    formatter={value => addSeperator(value)}
                    maxLength={10}
                    min={0}
                    onChange={() => form.setFieldValue('total', calculatorTotal())}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Đơn giá',
            name: 'price',
            rules: [{ required: true, message: 'Vui lòng nhập đơn giá' }],
            typeInput: (
                <InputNumber
                    controls={false}
                    formatter={value => addSeperator(value)}
                    maxLength={10}
                    min={0}
                    onChange={() => form.setFieldValue('total', calculatorTotal())}
                    suffix="VND"
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Thành tiền',
            name: 'total',
            // rules: [{ required: true, message: 'Vui lòng chọn đơn vị tính' }],
            typeInput: (
                <InputNumber
                    controls={false}
                    formatter={value => addSeperator(value)}
                    maxLength={10}
                    min={0}
                    readOnly
                    suffix="VND"
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: 'Nhà cung cấp',
            name: 'supplierId',
            rules: [{ required: true, message: 'Vui lòng chọn nhà cung cấp' }],
            typeInput: (
                <Select allowClear>
                    {supplier.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
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
                            setModalTitle('THÊM NHẬP KHO');
                            handleModal();
                        }}
                        renderChildren={() => (
                            // Component bảng dữ liệu
                            <TableComponent columns={columns} dataSource={dataSource} />
                        )}
                        title="NHẬP KHO"
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

export default StockInPage;
