import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
import {
    Alert,
    Breadcrumb,
    Button,
    Card,
    Col,
    ConfigProvider,
    Form,
    Image,
    Input,
    Layout,
    Menu,
    Modal,
    Popconfirm,
    Row,
    Space,
    Table,
    Typography,
} from 'antd';
import {
    Bank2,
    Basket3Fill,
    CalculatorFill,
    CardChecklist,
    Cart4,
    CartFill,
    Cast,
    ChatRightDotsFill,
    HouseFill,
    MenuButtonWideFill,
    PencilFill,
    PersonVcard,
    PiggyBankFill,
    PlusSquareFill,
    TicketDetailedFill,
    Trash3Fill,
} from 'react-bootstrap-icons';
import { BrowserRouter } from 'react-router-dom';
import { handleDateTime } from './utils/handle-date-time/handleDateTime';

const { Content, Footer, Header, Sider } = Layout;
const { Link, Text } = Typography;

const TestOk = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiSuccessModal, contextHolderSuccessModal] = Modal.useModal();
    const [form] = Form.useForm();

    const successModal = content => {
        apiSuccessModal.success({
            title: 'Success',
            content,
        });
    };

    const fetchDataTable = () => {
        axios
            .get('http://localhost:3001/api')
            .then(response => {
                const arrData = response.data.map(item => ({
                    ...item,
                    Created_Date: new handleDateTime().convertDate(item.Created_Date),
                    key: item.Id,
                }));
                setDataSource(arrData);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getDataWithId = id => {
        axios
            .get(`http://localhost:3001/api/${id}`)
            .then(response => {
                console.log(response.data[0]);
                const { Id, Code, Name } = response.data[0];
                form.setFieldsValue({ id: Id, code: Code, name: Name });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleInsertDataTable = (code, name) => {
        axios
            .post('http://localhost:3001/api', { code, name })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setIsModalOpen(false);
                    successModal(response.data.message);
                    fetchDataTable();
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdateDataTable = (id, code, name) => {
        axios
            .put(`http://localhost:3001/api/${id}`, { code, name })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setIsModalOpen(false);
                    successModal(response.data.message);
                    fetchDataTable();
                }
            })
            .then(error => {
                console.log(error);
            });
    };

    const handleDeleteDataTable = id => {
        axios
            .delete(`http://localhost:3001/api/${id}`)
            .then(response => {
                response.status === 200 && fetchDataTable();
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchDataTable();
    }, []);

    const onFinish = values => {
        const { id, code, name } = values;
        console.log(!id);
        !id ? handleInsertDataTable(code, name) : handleUpdateDataTable(id, code, name);
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'Id',
            key: 'id',
            sorter: (a, b) => a.Id - b.Id,
        },
        {
            title: 'Code',
            dataIndex: 'Code',
            key: 'code',
            sorter: (a, b) => a.Code.length - b.Code.length,
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'name',
            sorter: (a, b) => a.Name.length - b.Name.length,
        },
        {
            title: 'Created Date',
            dataIndex: 'Created_Date',
            key: 'created_date',
            sorter: (a, b) => a.Created_Date.length - b.Created_Date.length,
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        id={record.Id}
                        shape="circle"
                        icon={<PencilFill color="white" />}
                        onClick={() => {
                            setIsModalOpen(true);
                            getDataWithId(record.Id);
                        }}
                        style={{ backgroundColor: '#ffc107' }}
                    />
                    <Popconfirm
                        title="VUI LÒNG XÁC NHẬN"
                        description={
                            <>
                                <Text>Bạn có chắc muốn xóa </Text>
                                <Text strong>{record.Name}</Text>
                                <Text> không?</Text>
                                <br />
                                <Text>Thao tác này không thể hoàn tác!</Text>
                            </>
                        }
                        onConfirm={() => handleDeleteDataTable(record.Id)}
                        style={{ textAlign: 'center' }}
                    >
                        <Button
                            shape="circle"
                            icon={<Trash3Fill color="white" />}
                            style={{ backgroundColor: '#dc3545' }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 18,
                        colorText: 'rgba(0, 0, 0, 1)',
                        controlHeight: 36,
                    },
                    components: {
                        Layout: {
                            headerBg: '#fff',
                            // siderBg: '#f5f5f5',
                            footerBg: '#fff',
                        },
                    },
                }}
            >
                <Layout style={{ minHeight: '100vh', margin: '10px' }}>
                    <Sider breakpoint="md" collapsedWidth="0" theme="light" width="260">
                        <Image
                            src={require('./utils/logo/logoWFC.png')}
                            width="260px"
                            preview={false}
                            alt="Logo WineFood"
                        ></Image>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['menu']}
                            items={[
                                { key: 1, label: 'Trang chủ', icon: <HouseFill color="#008034" /> },
                                { type: 'divider' },
                                {
                                    key: 'nav-menu',
                                    label: 'Thực đơn',
                                    icon: <MenuButtonWideFill color="#008034" />,
                                    children: [
                                        {
                                            key: 2,
                                            label: 'Danh sách',
                                            icon: <CardChecklist color="royalBlue" />,
                                        },
                                        {
                                            key: 3,
                                            label: 'Chi tiết',
                                            icon: <TicketDetailedFill color="royalBlue" />,
                                        },
                                    ],
                                },
                                { type: 'divider' },
                                {
                                    key: 'nav-dish',
                                    label: 'Món ăn',
                                    icon: <PiggyBankFill color="#008034" />,
                                    children: [
                                        {
                                            key: 4,
                                            label: 'Danh sách',
                                            icon: <CardChecklist color="royalBlue" />,
                                        },
                                        {
                                            key: 5,
                                            label: 'Chi tiết',
                                            icon: <TicketDetailedFill color="royalBlue" />,
                                        },
                                        {
                                            key: 6,
                                            label: 'Phân loại',
                                            icon: <Basket3Fill color="royalBlue" />,
                                        },
                                    ],
                                },
                                { type: 'divider' },
                                {
                                    key: 'nav-ingredient',
                                    label: 'Nguyên liệu',
                                    icon: <CartFill color="#008034" />,
                                    children: [
                                        {
                                            key: 7,
                                            label: 'Danh sách',
                                            icon: <CardChecklist color="royalBlue" />,
                                        },
                                        {
                                            key: 8,
                                            label: 'Chi tiết',
                                            icon: <TicketDetailedFill color="royalBlue" />,
                                        },
                                        {
                                            key: 9,
                                            label: 'Phân loại',
                                            icon: <Basket3Fill color="royalBlue" />,
                                        },
                                    ],
                                },
                                { type: 'divider' },
                                { key: 10, label: 'Quản lý kho', icon: <Bank2 color="#008034" /> },
                                { key: 11, label: 'Nhà cung cấp', icon: <Cart4 color="#008034" /> },
                                {
                                    key: 12,
                                    label: 'Nhân viên',
                                    icon: <PersonVcard color="#008034" />,
                                },
                                {
                                    key: 'nav-other',
                                    label: 'Khác',
                                    icon: <ChatRightDotsFill color="#008034" />,
                                    children: [
                                        {
                                            key: 13,
                                            label: 'Phòng ban',
                                            icon: <Cast color="#008034" />,
                                        },
                                        {
                                            key: 14,
                                            label: 'Đơn vị tính',
                                            icon: <CalculatorFill color="#008034" />,
                                        },
                                    ],
                                },
                            ]}
                        ></Menu>
                    </Sider>

                    <Layout>
                        <Header style={{ padding: '0px' }}>
                            <Alert
                                type="info"
                                showIcon={false}
                                banner
                                message={
                                    <Marquee
                                        pauseOnHover
                                        gradient={false}
                                        style={{
                                            fontSize: '28px',
                                            fontWeight: 'bold',
                                            color: '#008034',
                                        }}
                                    >
                                        PHẦN MỀM QUẢN LÝ THỰC ĐƠN HÀNG NGÀY
                                    </Marquee>
                                }
                                style={{ minHeight: '100%' }}
                            />
                        </Header>
                        <Content style={{ padding: '10px' }}>
                            <Breadcrumb
                                items={[{ title: 'Others' }, { title: 'Unit' }]}
                                style={{ marginBottom: '10px' }}
                            ></Breadcrumb>
                            <Card
                                title="BẢNG ĐƠN VỊ TÍNH"
                                bordered
                                hoverable
                                extra={
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<PlusSquareFill />}
                                        onClick={() => setIsModalOpen(true)}
                                    ></Button>
                                }
                                style={{ textAlign: 'center' }}
                            >
                                <Table columns={columns} dataSource={dataSource}></Table>
                            </Card>
                        </Content>
                        <Footer style={{ padding: '10px' }}>
                            <Row align="middle">
                                <Col
                                    span="12"
                                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                                >
                                    <Text>
                                        <Text strong>Released by © </Text>
                                        <Link
                                            strong
                                            href="https://zalo.me/0972868740"
                                            target="_blank"
                                        >
                                            WineFood Developer
                                        </Link>
                                        <Text strong> - Version </Text>1.1.0
                                    </Text>
                                </Col>
                                <Col span="12" style={{ display: 'flex', justifyContent: 'end' }}>
                                    <Text>
                                        <Text strong>Copyright © WineFood 2023.</Text> All rights
                                        reserved.
                                    </Text>
                                </Col>
                            </Row>
                        </Footer>
                    </Layout>
                </Layout>
                <Modal
                    title="THÊM MỚI ĐƠN VỊ TÍNH"
                    open={isModalOpen}
                    closeIcon={false}
                    footer={null}
                    forceRender
                    afterClose={() => form.resetFields()}
                    styles={{
                        header: { textAlign: 'center', marginBottom: '20px' },
                    }}
                >
                    <Form
                        form={form}
                        // layout='vertical'
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={onFinish}
                    >
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mã đơn vị tính"
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng nhập mã đơn vị tính' }]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Tên đơn vị tính"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đơn vị tính' }]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                            <Space>
                                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
                {contextHolderSuccessModal}
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default TestOk;
