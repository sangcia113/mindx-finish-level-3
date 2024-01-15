// Import React và hooks từ thư viện React
import React, { useEffect, useState } from 'react';

// Import các component cụ thể từ thư viện antd
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Table,
    Tag,
    Typography,
} from 'antd';

// Import các biểu tượng cụ thể từ thư viện react-bootstrap-icons
import { PersonFill } from 'react-bootstrap-icons';

import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

// Import hàm dayjs
import dayjs from 'dayjs';

// Import các component tùy chỉnh từ đường dẫn tương đối
import {
    CardComponent,
    ContentComponent,
    DropdownComponent,
    ModalComponent,
    TableComponent,
} from '../components/index';

// Import hàm xử lý thông báo từ file API cụ thể
import { handleNotification } from '../handleAPI/handleNotification';

// Import các hàm xử lý thao tác dữ liệu từ file API cụ thể
import { deleteData, getData, getDataById, postData, putData } from '../handleAPI/api';

// Destructuring component Text từ Typography
const { Text } = Typography;

// Mảng chứa các item breadcrumb
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Menu' }, { title: 'List' }];

// Lưu trữ table
const table = 'menu';

let previousDishName = null;

// Hàm thêm dấu phẩy ngăn cách phần nghìn
const addSeperator = values => `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Hàm tình summary của table con
const calculatorSummary = record => {
    return addSeperator(
        record
            .reduce(
                (accumulator, currentValue) =>
                    accumulator +
                    currentValue.standard * currentValue.servingSize * currentValue.price,
                0
            )
            .toFixed(2)
    );
};

// Hàm tính rowspan cột đầu tiên trong table con
const calculatorCells = (record, data) => {
    let rowSpan = 1;

    if (previousDishName !== null && previousDishName === record.dishName) {
        rowSpan = 0;
    } else {
        previousDishName = record.dishName;
        // Tính số lần xuất hiện của giá trị 'dishName' trong dataSourceDishDetail
        rowSpan = data[record.menuId].filter(item => item.dishName === record.dishName).length;
    }
    return { rowSpan };
};

const MenuPage = () => {
    // Ghi log ra console khi component MenuPage được chạy
    console.log('Run MenuPage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Set dish cho thẻ Select
    const [dish, setDish] = useState([]);

    // Set data source cho thẻ table expander
    const [dataSourceMenuDetail, setDataSourceMenuDetail] = useState([]);

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        handleGetData();
        handleGetDataDish();
    }, []);

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    const handleFillData = async id => {
        // Assume 'data' is the data received from the server
        const data = await getDataById('menu-detail', id);

        let result = data.reduce((acc, cur) => {
            let menu = acc.find(menu => menu.id === cur.menuId);
            if (!menu) {
                menu = { id: cur.menuId, menuDate: dayjs(cur.menuDate), menuDetail: [] };
                acc.push(menu);
            }
            let detail = menu.menuDetail.find(detail => detail.servingSize === cur.servingSize);
            if (!detail) {
                detail = { dishId: [], servingSize: cur.servingSize };
                menu.menuDetail.push(detail);
            }
            !detail.dishId.includes(cur.dishId) && detail.dishId.push(cur.dishId);

            return acc;
        }, []);

        return result;
    };

    const handleGetDataMenuDetail = async id => {
        console.log('Run handleGetDataMenuDetail');
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getDataById('menu-detail', id);
        // Lấy dữ liệu từ API, giữ nguyên dữ liệu cũ và cập nhật dữ liệu mới vào hoặc ghi đè theo id
        setDataSourceMenuDetail(prevState => ({ ...prevState, [id]: data }));
    };

    const handleGetDataDish = async () => {
        console.log('Run handleGetDataDish');
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData('dish');
        setDish(data);
    };

    const handleGetData = async () => {
        console.log('Run handleGetData');
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData(table);
        setDataSource(data);
    };

    const handleInsertData = async values => {
        console.log('Run handleInsertData');
        // Thêm dữ liệu mới thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await postData(table, values);
        handleModal();
        handleNotification(response, handleGetData);
    };

    const handleUpdateData = async values => {
        console.log('Run handleUpdateData');
        // Cập nhật dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await putData(table, values.id, values);
        handleModal();
        handleNotification(response, handleGetData);
    };

    const handleDeleteData = async id => {
        console.log('Run handleDeleteData');
        // Xóa dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        const response = await deleteData(table, id);
        handleNotification(response, handleGetData);
    };

    const onFinish = values => {
        console.log('Run onFinish');
        // Xử lý khi hoàn thành biểu mẫu, kiểm tra và gọi các hàm cập nhật hoặc thêm mới dữ liệu
        values.id
            ? handleUpdateData({ ...values, menuDate: dayjs(values.menuDate).format('YYYY-MM-DD') })
            : handleInsertData({
                  ...values,
                  menuDate: dayjs(values.menuDate).format('YYYY-MM-DD'),
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
            title: 'Ngày menu',
            dataIndex: 'menuDate',
            key: 'menuDate',
            render: record => (
                <Tag color="DodgerBlue" style={{ fontSize: 18 }}>
                    {dayjs(record).format('YYYY-MM-DD')}
                </Tag>
            ),
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
                    actionEdit={async () => {
                        const data = await handleFillData(record.id);
                        form.setFieldsValue(data[0]);
                        setModalTitle('SỬA THỰC ĐƠN');
                        handleModal();
                    }}
                    textDelete={dayjs(record.menuDate).format('YYYY-MM-DD')}
                />
            ),
        },
    ];

    // Các cột trong bảng dữ liệu
    const columnsMenuDetail = [
        {
            title: 'Món ăn',
            dataIndex: 'dishName',
            key: 'dishName',
            ellipsis: true,
            onCell: (record, index) => calculatorCells(record, dataSourceMenuDetail),
        },
        {
            title: 'Nguyên liệu',
            dataIndex: 'ingredientName',
            key: 'ingredientName',
            ellipsis: true,
        },
        {
            title: 'DVT',
            dataIndex: 'unitName',
            key: 'unitName',
        },
        {
            title: 'Tiêu chuẩn',
            dataIndex: 'standard',
            key: 'standard',
            ellipsis: true,
        },
        {
            title: 'Số người',
            dataIndex: 'servingSize',
            key: 'servingSize',
            ellipsis: true,
        },
        {
            title: 'Tổng nguyên liệu',
            dataIndex: 'total',
            key: 'total',
            ellipsis: true,
            render: (_, record) => addSeperator((record.standard * record.servingSize).toFixed(2)),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            ellipsis: true,
            render: record => addSeperator(record),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            ellipsis: true,
            render: (_, record) =>
                addSeperator((record.standard * record.servingSize * record.price).toFixed(2)),
        },
    ];

    return (
        <>
            <ContentComponent
                items={itemsOfBreadcrumb}
                renderChildren={() => (
                    <CardComponent
                        actionFunc={() => {
                            setModalTitle('THÊM MENU');
                            handleModal();
                        }}
                        renderChildren={() => (
                            <TableComponent
                                columns={columns}
                                dataSource={dataSource}
                                expandable={{
                                    expandedRowRender: record => (
                                        <TableComponent
                                            bordered={true}
                                            columns={columnsMenuDetail}
                                            // Lấy dữ liệu từ expandedData theo id
                                            dataSource={dataSourceMenuDetail[record.id]}
                                            pagination={false}
                                            summary={record => (
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell colSpan={7}>
                                                        <Text strong>Tổng cộng</Text>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell>
                                                        <Text strong ellipsis>
                                                            {calculatorSummary(record)}
                                                        </Text>
                                                    </Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}
                                        />
                                    ),
                                    // expandRowByClick: true,
                                    onExpand: (event, record) => {
                                        // Gọi hàm để lấy dữ liệu từ API cho hàng được mở rộng
                                        event === true && handleGetDataMenuDetail(record.id);
                                        // Xóa dữ liệu trong khi đóng hàng mở rộng, tránh thất thoát memory
                                        event === false && delete dataSourceMenuDetail[record.id];
                                    },
                                }}
                            />
                        )}
                        title="MENU"
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
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ngày menu"
                            name="menuDate"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày menu' }]}
                        >
                            <DatePicker allowClear style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.List name="menuDetail">
                            {(fields, { add, remove }) => (
                                <>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            block
                                            icon={<PlusOutlined />}
                                            onClick={() => add()}
                                        >
                                            Thêm trường dữ liệu
                                        </Button>
                                    </Form.Item>
                                    {fields.map(({ key, name }) => (
                                        <Row key={key} gutter={[8, 8]}>
                                            <Col xs={14}>
                                                <Form.Item
                                                    label="Chọn món ăn"
                                                    name={[name, 'dishId']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng chọn món ăn',
                                                        },
                                                    ]}
                                                >
                                                    <Select mode={'multiple'} allowClear>
                                                        {dish.map(item => (
                                                            <Select.Option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8}>
                                                <Form.Item
                                                    label="Số người ăn"
                                                    name={[name, 'servingSize']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập số người ăn',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        controls={false}
                                                        min={1}
                                                        maxLength={10}
                                                        suffix={<PersonFill />}
                                                        parser={value => {
                                                            if (value) {
                                                                return String(parseInt(value, 10));
                                                            }
                                                            return value;
                                                        }}
                                                        style={{ width: '100%' }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <CloseOutlined onClick={() => remove(name)} />
                                        </Row>
                                    ))}
                                </>
                            )}
                        </Form.List>
                    </Form>
                )}
                // Tiêu đề của modal
                title={modalTitle}
            />
        </>
    );
};

export default MenuPage;
