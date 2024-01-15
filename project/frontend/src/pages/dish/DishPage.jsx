// Import React và hooks từ thư viện React
import React, { useEffect, useState } from 'react';

// Import các component cụ thể từ thư viện antd
import {
    Avatar,
    Button,
    Card,
    Col,
    Flex,
    Form,
    Input,
    InputNumber,
    List,
    Rate,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';

// Import các biểu tượng cụ thể từ thư viện @ant-design/icons
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

// Import các component tùy chỉnh từ đường dẫn tương đối
import {
    CardComponent,
    ContentComponent,
    DropdownComponent,
    ModalComponent,
    TableComponent,
} from '../../components/index';

// Import hàm xử lý thông báo từ file API cụ thể
import { handleNotification } from '../../handleAPI/handleNotification';

// Import các hàm xử lý thao tác dữ liệu từ file API cụ thể
import { deleteData, getData, getDataById, postData, putData } from '../../handleAPI/api';

// Destructuring component Text từ Typography
const { Text } = Typography;

// Mảng chứa các item breadcrumb
const itemsOfBreadcrumb = [{ title: '' }, { title: 'Dish' }, { title: 'List' }];

// Lưu trữ table
const table = 'dish';

// Hàm thêm dấu phẩy ngăn cách phần nghìn
const addSeperator = values => `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Hàm tình summary của table con
const calculatorSummary = record => {
    return addSeperator(
        record
            .reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue.standard * currentValue.price,
                0
            )
            .toFixed(2)
    );
};

// Các cột trong bảng dữ liệu
const columnsDishDetail = [
    {
        title: 'Tên nguyên liệu',
        dataIndex: 'ingredientName',
        key: 'ingredientName',
        ellipsis: true,
    },
    {
        title: 'Loại nguyên liệu',
        dataIndex: 'ingredientTypeName',
        key: 'ingredientTypeName',
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
        render: (_, record) => addSeperator((record.standard * record.price).toFixed(2)),
    },
];

const DishPage = () => {
    // Ghi log ra console khi component DishPage được chạy
    console.log('Run DishPage....');

    // Khởi tạo biến state sử dụng hook useState
    const [dataSource, setDataSource] = useState([]);

    // Khởi tạo biến state sử dụng hook useState
    const [modalOpen, setModalOpen] = useState(false);

    // Khởi tạo biến state sử dụng hook useState
    const [modalTitle, setModalTitle] = useState('');

    // Set ingredient cho thẻ Select
    const [dishType, setDishType] = useState([]);

    // Set ingredient cho thẻ Select
    const [ingredient, setIngredient] = useState([]);

    // Set ingredient cho thẻ Select
    const [unit, setUnit] = useState([]);

    // Set data source cho thẻ table expander
    const [dataSourceDishDetail, setDataSourceDishDetail] = useState([]);

    // Set unit cho thẻ standard
    const [unitForStandard, setUnitForStandard] = useState('');

    // Khởi tạo đối tượng form sử dụng hook useForm của Form
    const [form] = Form.useForm();

    useEffect(() => {
        // Ghi log ra console khi hook useEffect được kích hoạt
        console.log('Run useEffect');

        // Lấy dữ liệu ban đầu khi component được gắn
        handleGetData();
        handleGetDataDishType();
        handleGetDataIngredient();
        handleGetDataUnit();
    }, []);

    // Chuyển đổi trạng thái modalOpen giữa true và false
    const handleModal = () => setModalOpen(prevModalOpen => !prevModalOpen);

    const handleGetDataDishDetail = async id => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getDataById('dish-detail', id);
        // Lấy dữ liệu từ API, giữ nguyên dữ liệu cũ và cập nhật dữ liệu mới vào hoặc ghi đè theo id
        setDataSourceDishDetail(prevState => ({ ...prevState, [id]: data }));
    };

    const handleGetDataUnitForStandard = key => e => {
        const unitId = ingredient.find(item => item.id === e)?.unitId;
        const unitName = unit.find(item => item.id === unitId)?.name;
        setUnitForStandard(prevState => ({ ...prevState, [key]: unitName }));
    };

    const handleGetDataDishType = async () => {
        // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        const data = await getData('dish-type');
        setDishType(data);
    };

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
        // console.log(values);
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
            sorter: (a, b) => a.name.length - b.name.length,
            render: record => (
                <Tag color="DodgerBlue" style={{ fontSize: 18 }}>
                    {record}
                </Tag>
            ),
        },
        {
            title: 'Dish Type',
            dataIndex: 'dishTypeId',
            key: 'dishTypeId',
            ellipsis: true,
            sorter: (a, b) => a.dishTypeId - b.dishTypeId,
            render: record => dishType.find(item => item.id === record)?.name,
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
                        setModalTitle('SỬA MÓN ĂN');
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
            <ContentComponent
                items={itemsOfBreadcrumb}
                renderChildren={() => (
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <CardComponent
                                actionFunc={() => {
                                    setModalTitle('THÊM MÓN ĂN');
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
                                                    columns={columnsDishDetail}
                                                    // Lấy dữ liệu từ expandedData theo id
                                                    dataSource={dataSourceDishDetail[record.id]}
                                                    pagination={false}
                                                    summary={record => (
                                                        <Table.Summary.Row>
                                                            <Table.Summary.Cell colSpan={5}>
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
                                                event === true &&
                                                    handleGetDataDishDetail(record.id);
                                                // Xóa dữ liệu trong khi đóng hàng mở rộng, tránh thất thoát memory
                                                event === false &&
                                                    delete dataSourceDishDetail[record.id];
                                            },
                                        }}
                                    />
                                )}
                                title="MÓN ĂN"
                            />
                        </Col>
                        {/*  MENU LIST */}
                        <Col xs={24}>
                            <List
                                grid={{
                                    gutter: [16, 16],
                                    column: 2,
                                    xs: 1,
                                }}
                                pagination={{ pageSize: 4 }}
                                dataSource={[
                                    {
                                        dish: 'Tôm rim',
                                        dishType: 'Món mặn',
                                        image: require('../../assets/dish/thit-ba-roi-uop-shiokoji.jpg'),
                                        cost: 5,
                                        star: 4,
                                        review: 21,
                                        serve: 922,
                                    },
                                    {
                                        dish: 'Susu xào',
                                        dishType: 'Món xào',
                                        image: require('../../assets/dish/bao-tu-chay-toi-ot.jpg'),
                                        cost: 7,
                                        star: 3,
                                        review: 17,
                                        serve: 573,
                                    },
                                    {
                                        dish: 'Canh bầu',
                                        dishType: 'Món canh',
                                        image: require('../../assets/dish/ca-basa-kho-to.jpg'),
                                        cost: 3,
                                        star: 5,
                                        review: 35,
                                        serve: 853,
                                    },
                                    {
                                        dish: 'Cá ba sa kho tộ',
                                        dishType: 'Món mặn',
                                        image: require('../../assets/dish/goi-tai-heo.jpg'),
                                        cost: 7,
                                        star: 2,
                                        review: 11,
                                        serve: 364,
                                    },
                                    {
                                        dish: 'Đậu cô ve xào',
                                        dishType: 'Món xào',
                                        image: require('../../assets/dish/ca-thac-lac-kho-qua.jpg'),
                                        cost: 6,
                                        star: 1,
                                        review: 27,
                                        serve: 284,
                                    },
                                    {
                                        dish: 'Bún thái',
                                        dishType: 'Món mặn',
                                        image: require('../../assets/dish/ga-teriyaki.jpg'),
                                        cost: 8,
                                        star: 4,
                                        review: 34,
                                        serve: 194,
                                    },
                                    {
                                        dish: 'Rau muống xào',
                                        dishType: 'Món xào',
                                        image: require('../../assets/dish/oc-cana-chay-toi-ot.jpg'),
                                        cost: 5,
                                        star: 3,
                                        review: 12,
                                        serve: 739,
                                    },
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <Card hoverable bordered={false}>
                                            <Row gutter={[16, 16]} justify={'center'}>
                                                <Col lg={10}>
                                                    <Avatar
                                                        src={item.image}
                                                        size={{
                                                            xs: 280,
                                                            sm: 280,
                                                            md: 280,
                                                            lg: 190,
                                                            xl: 190,
                                                            xxl: 300,
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg={14}>
                                                    <Card.Meta
                                                        title={item.dish}
                                                        description={
                                                            <Space direction={'vertical'}>
                                                                <Flex justify={'space-between'}>
                                                                    <Tag
                                                                        color="#f50"
                                                                        style={{
                                                                            fontSize: 18,
                                                                            borderRadius: 24,
                                                                        }}
                                                                    >
                                                                        {`# ${item.dishType}`}
                                                                    </Tag>
                                                                    <Space>
                                                                        <Rate
                                                                            disabled
                                                                            defaultValue={item.star}
                                                                        />
                                                                    </Space>
                                                                </Flex>
                                                                <Flex
                                                                    justify={'space-between'}
                                                                    align={'center'}
                                                                >
                                                                    <Text type={'secondary'}>
                                                                        ({item.review} review)
                                                                    </Text>
                                                                    <Text type={'secondary'}>
                                                                        ({item.serve} served)
                                                                    </Text>
                                                                    <Text
                                                                        strong
                                                                        style={{
                                                                            fontSize: 28,
                                                                            color: 'green',
                                                                        }}
                                                                    >
                                                                        ${item.cost}
                                                                    </Text>
                                                                </Flex>
                                                                <Text type={'secondary'}>
                                                                    There are many variations of
                                                                    passages of Lorem Ipsum
                                                                    available, but the majority have
                                                                    suffered alteration in some
                                                                    form, by injected humour, or
                                                                    randomised words.
                                                                </Text>
                                                            </Space>
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                )}
            />
            {/* Component hiển thị hộp thoại modal */}
            <ModalComponent
                // Xử lý sau khi đóng modal
                afterClose={() => {
                    form.resetFields();
                    setUnitForStandard('');
                }}
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
                            label="Tên món ăn"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên món ăn' }]}
                        >
                            <Input maxLength={100} showCount allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Loại món ăn"
                            name="dishTypeId"
                            rules={[{ required: true, message: 'Vui lòng chọn loại món ăn' }]}
                        >
                            <Select allowClear>
                                {dishType.map(item => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.List name="dishDetail">
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
                                                    label="Chọn nguyên liệu"
                                                    name={[name, 'ingredientId']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng chọn nguyên liệu',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        allowClear
                                                        onChange={handleGetDataUnitForStandard(key)}
                                                    >
                                                        {ingredient.map(item => (
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
                                                    label="Tiêu chuẩn"
                                                    name={[name, 'standard']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập tiêu chuẩn',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        controls={false}
                                                        min={0.005}
                                                        maxLength={10}
                                                        suffix={unitForStandard[key]}
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

export default DishPage;
