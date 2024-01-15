// Import React và hooks từ thư viện React
import React, { useEffect, useState } from 'react';

// Import các component cụ thể từ thư viện antd
import { Dropdown, Form, Input, InputNumber, Popconfirm, Select, Typography } from 'antd';

// Import các biểu tượng cụ thể từ thư viện react-bootstrap-icons
import { PencilFill, ThreeDotsVertical, Trash3Fill } from 'react-bootstrap-icons';

// Import các component tùy chỉnh từ đường dẫn tương đối
import {
    CardComponent,
    ContentComponent,
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
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Dish' }, { title: 'Detail' }];

// Lưu trữ table
const table = 'dish-detail';

// Component chính: DishDetailPage
const DishDetailPage = () => {
    // Ghi log ra console khi component DishDetailPage được chạy
    console.log('Run DishDetailPage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Set dish cho thẻ Select
    const [dish, setDish] = useState([]);

    // Set ingredient cho thẻ Select
    const [ingredient, setIngredient] = useState([]);

    // Set unit cho thẻ Select
    const [unit, setUnit] = useState([]);

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        handleGetData();
        handleGetDataDish();
        handleGetDataIngredient();
        handleGetDataUnit();
    }, []);

    const reRender = () => {
        // Ghi log ra console khi hàm reRender được gọi
        console.log('Run reRender');

        // Lấy dữ liệu lại để render lại component
        handleGetData();
    };

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    const handleGetDataDish = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await getDataByType('dish');
        setDish(response.data);
    };

    const handleGetDataIngredient = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const response = await getDataByType('ingredient');
        setIngredient(response.data);
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
        const response = await postData(table, { ...values });
        handleModal();
        handleNotification(response, reRender);
    };

    const handleUpdateData = async values => {
        // Cập nhật dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await putData(table, values.id, { ...values });
        handleModal();
        handleNotification(response, reRender);
    };

    const handleDeleteData = async id => {
        // Xóa dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await deleteData(table, id);
        handleNotification(response, reRender);
    };

    const onFinish = values => {
        // Xử lý khi hoàn thành biểu mẫu, kiểm tra và gọi các hàm cập nhật hoặc thêm mới dữ liệu
        values.id ? handleUpdateData(values) : handleInsertData(values);
    };

    const handleGetUnit = ingredientId =>
        unit.find(item => item.id === ingredient.find(item => item.id === ingredientId)?.unitId)
            ?.name;

    // Các cột trong bảng dữ liệu
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Dish',
            dataIndex: 'dishId',
            key: 'dishId',
            sorter: (a, b) => a.dishId - b.dishId,
            render: record => <Text strong>{dish.find(item => item.id === record)?.name}</Text>,
        },
        {
            title: 'Ingredient',
            dataIndex: 'ingredientId',
            key: 'ingredientId',
            sorter: (a, b) => a.ingredientId - b.ingredientId,
            render: record => ingredient.find(item => item.id === record)?.name,
        },
        {
            title: 'Standard',
            dataIndex: 'standard',
            key: 'standard',
            sorter: (a, b) => a.standard - b.standard,
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            sorter: (a, b) => a.unit - b.unit,
            render: (_, record) => {
                return handleGetUnit(record.ingredientId);
            },
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
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: 'Edit',
                                icon: <PencilFill />,
                                onClick: () => {
                                    form.setFieldsValue({
                                        ...record,
                                        unit: handleGetUnit(record.ingredientId),
                                    });
                                    setModalTitle('SỬA CHI TIẾT MÓN ĂN');
                                    handleModal();
                                },
                            },
                            {
                                key: '2',
                                label: (
                                    <Popconfirm
                                        title="VUI LÒNG XÁC NHẬN"
                                        description={
                                            <Text>
                                                Bạn có chắc muốn xóa{' '}
                                                <Text strong>
                                                    {
                                                        dish.find(item => item.id === record.dishId)
                                                            ?.name
                                                    }
                                                </Text>{' '}
                                                không?
                                                <br />
                                                Thao tác này không thể hoàn tác!
                                            </Text>
                                        }
                                        onConfirm={() => handleDeleteData(record.id)}
                                    >
                                        <Text type={'danger'}>Remove</Text>
                                    </Popconfirm>
                                ),
                                icon: <Trash3Fill color="red" />,
                            },
                        ],
                    }}
                    arrow={true}
                    placement={'bottomLeft'}
                >
                    <ThreeDotsVertical />
                </Dropdown>
            ),
        },
    ];

    // Các trường trong biểu mẫu
    const formFields = [
        {
            label: 'Món ăn',
            name: 'dishId',
            rules: [{ required: true, message: 'Vui lòng chọn món ăn' }],
            typeInput: (
                <Select allowClear>
                    {dish.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
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
            rules: [{ required: true, message: 'Vui lòng chọn đơn vị tính' }],
            typeInput: <Input readOnly />,
        },
        {
            label: 'Tiêu chuẩn',
            name: 'standard',
            rules: [{ required: true, message: 'Vui lòng nhập tiêu chuẩn' }],
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
                        title="CHI TIẾT MÓN ĂN"
                        actionFunc={() => {
                            setModalTitle('THÊM CHI TIẾT MÓN ĂN');
                            handleModal();
                        }}
                        renderChildren={() => (
                            // Component bảng dữ liệu
                            <TableComponent columns={columns} dataSource={dataSource} />
                        )}
                    />
                )}
            />
            {/* Component hiển thị hộp thoại modal */}
            <ModalComponent
                // Trạng thái mở hoặc đóng của modal
                open={modalOpen}
                // Tiêu đề của modal
                title={modalTitle}
                // Xử lý khi nhấn nút OK
                onOk={() => form.submit()}
                // Xử lý khi nhấn nút Hủy
                onCancel={handleModal}
                // Xử lý sau khi đóng modal
                afterClose={() => form.resetFields()}
                renderChildren={() => (
                    // Component biểu mẫu
                    <FormComponent form={form} onFinish={onFinish} formFields={formFields} />
                )}
            />
        </>
    );
};

export default DishDetailPage;
