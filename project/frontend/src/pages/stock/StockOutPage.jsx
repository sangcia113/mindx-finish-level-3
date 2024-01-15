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
import { deleteData, getData, getDataByType, postData, putData } from '../../handleAPI/api';

// Destructuring component Text từ Typography
const { Text } = Typography;

// Mảng chứa các item breadcrumb
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Stock' }, { title: 'Out' }];

// Lưu trữ table
const table = 'stock-out';

const StockOutPage = () => {
    // Ghi log ra console khi component StockOutPage được chạy
    console.log('Run StockOutPage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Set ingredient cho thẻ Select
    const [ingredient, setIngredient] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [stockIn, setStockIn] = useState([]);

    // Set unit cho thẻ Select
    const [unit, setUnit] = useState([]);

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    // Sử dụng useEffect để gọi hàm handleGetData
    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        handleGetData();
        handleGetDataIngredient();
        handleGetDataStockIn();
        handleGetDataUnit();
    }, []);

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    // Hàm lấy Name Unit từ Ingredient
    const handleGetUnit = stockInId => {
        return unit.find(
            u =>
                u.id ===
                ingredient.find(
                    ing => ing.id === stockIn.find(si => si.id === stockInId)?.ingredientId
                )?.unitId
        )?.name;
    };

    const handleGetDataIngredient = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await getDataByType('ingredient');
        setIngredient(response.data);
    };

    const handleGetDataStockIn = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await getDataByType('stock-in');
        console.log(response);
        setStockIn(response.data);
    };

    const handleGetDataUnit = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await getDataByType('unit');
        setUnit(response.data);
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
            title: 'Nguyên liệu',
            dataIndex: 'ingredientId',
            key: 'ingredientId',
            ellipsis: true,
            sorter: (a, b) => a.ingredientId.length - b.ingredientId.length,
            render: record =>
                ingredient.find(
                    ing => ing.id === stockIn.find(si => si.id === record)?.ingredientId
                )?.name,
        },
        {
            title: 'DVT',
            dataIndex: 'unitId',
            key: 'unitId',
            sorter: (a, b) => a.unitId - b.unitId,
            render: (_, record) => handleGetUnit(record.ingredientId),
        },
        {
            title: 'Nhập kho',
            dataIndex: 'importQuantity',
            key: 'importQuantity',
            ellipsis: true,
            sorter: (a, b) => a.importQuantity - b.importQuantity,
            render: record => <Tag color="green">{record}</Tag>,
        },
        {
            title: 'Xuất kho',
            dataIndex: 'exportQuantity',
            key: 'exportQuantity',
            ellipsis: true,
            sorter: (a, b) => a.exportQuantity - b.exportQuantity,
            render: record => record !== 0 && <Tag color="red">{record}</Tag>,
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
                        setModalTitle('SỬA XUẤT KHO');
                        handleModal();
                    }}
                    textDelete={
                        <Text strong>
                            {
                                ingredient.find(
                                    i =>
                                        i.id ===
                                        stockIn.find(id => id.id === record.stockIn)?.ingredientId
                                )?.name
                            }
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
                <Select allowClear onChange={e => form.setFieldsValue({ unit: handleGetUnit(e) })}>
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
            // rules: [{ required: true, message: 'Vui lòng nhập số lượng nhập kho' }],
            typeInput: <Input readOnly />,
        },
        {
            label: 'Nhập kho',
            name: 'importQuantity',
            rules: [{ required: true, message: 'Vui lòng nhập số lượng nhập kho' }],
            typeInput: <InputNumber min={0} maxLength={10} style={{ width: '100%' }}></InputNumber>,
        },
        {
            label: 'Xuất kho',
            name: 'exportQuantity',
            rules: [{ required: true, message: 'Vui lòng nhập số lượng xuất kho' }],
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
                            setModalTitle('THÊM XUẤT KHO');
                            handleModal();
                        }}
                        renderChildren={() => (
                            // Component bảng dữ liệu
                            <TableComponent columns={columns} dataSource={dataSource} />
                        )}
                        title="XUẤT KHO"
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

export default StockOutPage;
