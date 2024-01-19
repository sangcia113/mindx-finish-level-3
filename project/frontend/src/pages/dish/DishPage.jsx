import React, { useEffect, useState } from 'react';
import {
    Alert,
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
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import {
    CardComponent,
    ContentComponent,
    DropdownComponent,
    ModalComponent,
    ModalConfirmComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
    TableComponent,
} from '../../components';

import { createInstance } from '../../utils';

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Dish' }, { title: 'List' }];
const { Text } = Typography;

const addSeperator = values => `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
    console.log('Run DishPage....');

    const [dish, setDish] = useState([]);

    const [dishDetail, setDishDetail] = useState([]);

    const [dishType, setDishType] = useState([]);

    const [ingredient, setIngredient] = useState([]);

    const [unit, setUnit] = useState([]);

    const [unitForStandard, setUnitForStandard] = useState('');

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

    useEffect(() => {
        console.log('Run useEffect');

        readIngredient();
        readDishType();
        readUnit();
        readDish();
    }, []);

    const readDishDetail = async id => {
        try {
            // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
            const response = await createInstance().read(`/dish/detail/${id}`);

            // Lấy dữ liệu từ API, giữ nguyên dữ liệu cũ và cập nhật dữ liệu mới vào hoặc ghi đè theo id
            // setDishDetail(prevState => ({ ...prevState, [id]: response.data }));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readUnitForStandard = key => e => {
        const unitId = ingredient.find(item => item._id === e)?.unitId;
        const unitCode = unit.find(item => item._id === unitId)?.code;
        setUnitForStandard(prevState => ({ ...prevState, [key]: unitCode }));
    };

    const readDishType = async () => {
        try {
            const response = await createInstance().read('/dish/type');

            setDishType(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readIngredient = async () => {
        try {
            const response = await createInstance().read('/ingredient/list');

            setIngredient(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readUnit = async () => {
        try {
            const response = await createInstance().read('/unit');

            setUnit(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readDish = async () => {
        try {
            const response = await createInstance().read('/dish/list');

            setDish(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createDish = async values => {
        try {
            const response = await createInstance().create('/dish/list', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readDish();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateDish = async values => {
        // Cập nhật dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        // const response = await putData(table, values.id, values);
        // handleModal();
        // handleNotification(response, handleGetData);
    };

    const removeDish = async id => {
        // Xóa dữ liệu thông qua API bất đồng bộ và xử lý thông báo sau đó cập nhật lại giao diện
        // const response = await deleteData(table, id);
        // handleNotification(response, handleGetData);
    };

    const onFinish = values => {
        values._id ? updateDish(values) : createDish(values);
    };

    const columns = [
        {
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <DropdownComponent
                    actionDelete={() =>
                        setModalConfirm({
                            onOk: () => removeDish(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa món ăn?
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
                        form.setFieldsValue(record);
                        setModalMain({ open: true, title: 'SỬA MÓN ĂN' });
                    }}
                />
            ),
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
            render: record => dishType.find(item => item._id === record)?.name,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY HH:mm'),
        },
    ];

    return (
        <>
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <CardComponent
                            actionFunc={() => {
                                setModalMain({ open: true, title: 'THÊM MÓN ĂN' });
                            }}
                            title="MÓN ĂN"
                        >
                            <TableComponent
                                columns={columns}
                                dataSource={dish}
                                expandable={{
                                    expandedRowRender: record => (
                                        <TableComponent
                                            bordered={true}
                                            columns={columnsDishDetail}
                                            // Lấy dữ liệu từ expandedData theo id
                                            dataSource={dishDetail[record._id]}
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
                                        event === true && readDishDetail(record._id);
                                        // Xóa dữ liệu trong khi đóng hàng mở rộng, tránh thất thoát memory
                                        event === false && delete dishDetail[record._id];
                                    },
                                }}
                            />
                        </CardComponent>
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
                                                                passages of Lorem Ipsum available,
                                                                but the majority have suffered
                                                                alteration in some form, by injected
                                                                humour, or randomised words.
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
            </ContentComponent>

            <ModalComponent
                afterClose={() => form.resetFields()}
                onCancel={() => setModalMain({ open: false })}
                onOk={() => form.submit()}
                open={modalMain.open}
                title={modalMain.title}
            >
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
                                <Select.Option key={item._id} value={item._id}>
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
                                                    onChange={readUnitForStandard(key)}
                                                >
                                                    {ingredient.map(item => (
                                                        <Select.Option
                                                            key={item._id}
                                                            value={item._id}
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

export default DishPage;
