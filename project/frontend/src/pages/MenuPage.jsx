import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { PersonFill } from 'react-bootstrap-icons';
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
} from '../components';

import { createInstance } from '../utils';

const itemsOfBreadcrumb = [{ title: '' }, { title: 'Menu' }, { title: 'List' }];
const { Text } = Typography;

let previousDishName = null;

const addSeperator = values => `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
    console.log('Run MenuPage....');

    const [menu, setMenu] = useState([]);

    const [dish, setDish] = useState([]);

    const [menuDetail, setMenuDetail] = useState([]);

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
        console.log('Run useEffect');

        readDish();
        readMenu();
    }, []);

    const handleFillData = async id => {
        // Assume 'data' is the data received from the server
        // const data = await getDataById('menu-detail', id);
        // let result = data.reduce((acc, cur) => {
        //     let menu = acc.find(menu => menu.id === cur.menuId);
        //     if (!menu) {
        //         menu = { id: cur.menuId, menuDate: dayjs(cur.menuDate), menuDetail: [] };
        //         acc.push(menu);
        //     }
        //     let detail = menu.menuDetail.find(detail => detail.servingSize === cur.servingSize);
        //     if (!detail) {
        //         detail = { dishId: [], servingSize: cur.servingSize };
        //         menu.menuDetail.push(detail);
        //     }
        //     !detail.dishId.includes(cur.dishId) && detail.dishId.push(cur.dishId);
        //     return acc;
        // }, []);
        // return result;
    };

    const readMenuDetail = async id => {
        try {
            const response = await createInstance(accessToken).read('/detail');

            setMenuDetail(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
        // console.log('Run readMenuDetail');
        // // Lấy dữ liệu từ API bất đồng bộ và cập nhật vào state
        // const data = await getDataById('menu-detail', id);
        // // Lấy dữ liệu từ API, giữ nguyên dữ liệu cũ và cập nhật dữ liệu mới vào hoặc ghi đè theo id
        // setDataSourceMenuDetail(prevState => ({ ...prevState, [id]: data }));
    };

    const readDish = async () => {
        try {
            const response = await createInstance(accessToken).read('/dish/list');

            setDish(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const readMenu = async () => {
        try {
            const response = await createInstance(accessToken).read('/list');

            setMenu(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const createMenu = async values => {
        try {
            const response = await createInstance(accessToken).create('/list', values);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalMain({ open: false });

            readMenu();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const updateMenu = async values => {
        try {
            const response = await createInstance(accessToken).update(
                `/list/${values._id}`,
                values
            );

            setModalMain({ open: false });

            setModalSuccess({ open: true, message: response?.data?.message });

            readMenu();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const removeMenu = async id => {
        try {
            const response = await createInstance(accessToken).remove(`/list/${id}`);

            setModalSuccess({ open: true, message: response?.data?.message });

            setModalConfirm({ open: false });

            readMenu();
        } catch (error) {
            setModalError({ open: true, error });
        }
    };

    const onFinish = values => {
        values._id
            ? updateMenu({ ...values, menuDate: dayjs(values.menuDate).format('YYYY-MM-DD') })
            : createMenu({
                  ...values,
                  menuDate: dayjs(values.menuDate).format('YYYY-MM-DD'),
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
                            onOk: () => removeMenu(record._id),
                            open: true,
                            message: (
                                <Space direction="vertical" align="center">
                                    Bạn có chắc muốn xóa bộ phận?
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
                        setModalMain({ open: true, title: 'SỬA BỘ PHẬN' });
                    }}
                />
            ),
        },
        {
            title: 'Ngày menu',
            dataIndex: 'menuDate',
            key: 'menuDate',
            render: record => (
                <Tag color="DodgerBlue" style={{ fontSize: 18 }}>
                    {dayjs(record).format('DD-MM-YYYY')}
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

    // Các cột trong bảng dữ liệu
    const columnsMenuDetail = [
        {
            title: 'Món ăn',
            dataIndex: 'dishName',
            key: 'dishName',
            ellipsis: true,
            onCell: (record, index) => calculatorCells(record, menuDetail),
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
            <ContentComponent items={itemsOfBreadcrumb} loading={false}>
                <CardComponent
                    actionFunc={() => {
                        setModalMain({ open: true, title: 'THÊM BỘ PHẬN' });
                    }}
                    title="BỘ PHẬN"
                >
                    <TableComponent
                        columns={columns}
                        dataSource={menu}
                        expandable={{
                            expandedRowRender: record => (
                                <TableComponent
                                    bordered={true}
                                    columns={columnsMenuDetail}
                                    // Lấy dữ liệu từ expandedData theo id
                                    dataSource={menuDetail[record._id]}
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
                                event === true && readMenuDetail(record._id);
                                // Xóa dữ liệu trong khi đóng hàng mở rộng, tránh thất thoát memory
                                event === false && delete menuDetail[record._id];
                            },
                        }}
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
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="_id" hidden>
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

export default MenuPage;
