import React from 'react';
import { ContentComponent } from '../components';
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Image,
    List,
    Progress,
    Rate,
    Row,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import {
    CheckCircleFilled,
    DownOutlined,
    HeartFilled,
    LikeOutlined,
    MessageFilled,
    MessageOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';

const { Text, Title } = Typography;

const HomePage = () => {
    const dataSource = [
        {
            key: '14',
            id: '14',
            menu: (
                <Text ellipsis>
                    <Space>
                        <Avatar src={require('../assets/dish/banh-tom-chien.jpg')} size={'large'} />
                        2023-10-31
                    </Space>
                </Text>
            ),
            servingSize: '52',
            budget: '1.925.856',
            average: '22.860',
            completion: <Progress size={'small'} status={'success'} percent={100} />,
        },
        {
            key: '13',
            id: '13',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/bao-tu-chay-toi-ot.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.825.163',
            average: '23.583',
            completion: <Progress size={'small'} status={'success'} percent={100} />,
        },
        {
            key: '12',
            id: '12',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/ca-basa-kho-to.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '2.047.472',
            average: '25.291',
            completion: <Progress size={'small'} status={'success'} percent={100} />,
        },
        {
            key: '11',
            id: '11',
            menu: (
                <Space>
                    <Avatar
                        src={require('../assets/dish/ca-hoi-shio-koji-ap-chao.jpg')}
                        size={'large'}
                    />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.926.862',
            average: '23.593',
            completion: <Progress size={'small'} status={'exception'} percent={67} />,
        },
        {
            key: '10',
            id: '10',
            menu: (
                <Space>
                    <Avatar
                        src={require('../assets/dish/ca-thac-lac-kho-qua.jpg')}
                        size={'large'}
                    />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.845.204',
            average: '22.173',
            completion: <Progress size={'small'} status={'success'} percent={100} />,
        },
        {
            key: '9',
            id: '9',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/ga-teriyaki.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.184.492',
            average: '21.435',
            completion: (
                <Progress
                    size={'small'}
                    status={'active'}
                    percent={58}
                    strokeColor={'DodgerBlue'}
                />
            ),
        },
        {
            key: '8',
            id: '8',
            menu: (
                <Space>
                    <Avatar
                        src={require('../assets/dish/oc-cana-chay-toi-ot.jpg')}
                        size={'large'}
                    />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.793.482',
            average: '21.542',
            completion: (
                <Progress
                    size={'small'}
                    status={'active'}
                    percent={78}
                    strokeColor={'DodgerBlue'}
                />
            ),
        },
        {
            key: '7',
            id: '7',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/banh-tom-chien.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.986.592',
            average: '22.356',
            completion: (
                <Progress
                    size={'small'}
                    status={'active'}
                    percent={82}
                    strokeColor={'DodgerBlue'}
                />
            ),
        },
        {
            key: '6',
            id: '6',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/bao-tu-chay-toi-ot.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.947.000',
            average: '22.363',
            completion: (
                <Progress
                    size={'small'}
                    status={'active'}
                    percent={92}
                    strokeColor={'DodgerBlue'}
                />
            ),
        },
        {
            key: '5',
            id: '5',
            menu: (
                <Space>
                    <Avatar
                        src={require('../assets/dish/ca-hoi-shio-koji-ap-chao.jpg')}
                        size={'large'}
                    />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.869.000',
            average: '22.743',
            completion: <Progress size={'small'} status={'exception'} percent={70} />,
        },
        {
            key: '4',
            id: '4',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/ga-teriyaki.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.947.000',
            average: '22.256',
            completion: <Progress size={'small'} status={'exception'} percent={70} />,
        },
        {
            key: '3',
            id: '3',
            menu: (
                <Space>
                    <Avatar
                        src={require('../assets/dish/oc-cana-chay-toi-ot.jpg')}
                        size={'large'}
                    />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '2.082.000',
            average: '22.743',
            completion: <Progress size={'small'} status={'exception'} percent={70} />,
        },
        {
            key: '2',
            id: '2',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/ca-basa-kho-to.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.992.000',
            average: '22.235',
            completion: <Progress size={'small'} status={'exception'} percent={70} />,
        },
        {
            key: '1',
            id: '1',
            menu: (
                <Space>
                    <Avatar src={require('../assets/dish/banh-tom-chien.jpg')} size={'large'} />
                    2023-10-31
                </Space>
            ),
            servingSize: '52',
            budget: '1.820.000',
            average: '22.743',
            completion: <Progress size={'small'} status={'exception'} percent={70} />,
        },
    ];

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Menu',
            dataIndex: 'menu',
            key: 'menu',
            render: record => <Text strong>{record}</Text>,
        },
        {
            title: 'Số người',
            dataIndex: 'servingSize',
            key: 'servingSize',
            ellipsis: true,
        },
        {
            title: 'Ngân sách',
            dataIndex: 'budget',
            key: 'budget',
            ellipsis: true,
        },
        {
            title: 'Trung bình',
            dataIndex: 'average',
            key: 'average',
            ellipsis: true,
        },
        {
            title: 'Hoàn thành',
            dataIndex: 'completion',
            key: 'completion',
            ellipsis: true,
        },
    ];

    const IconText = ({ icon, text }) => (
        <Space style={{ fontSize: 16 }}>
            {icon}
            {text}
        </Space>
    );

    const dataTrending = [
        {
            top: 1,
            dish: 'Tôm rim',
            image: require('../assets/dish/banh-tom-chien.jpg'),
            serve: 922,
            percentage: 84,
        },
        {
            top: 2,
            dish: 'Susu xào',
            image: require('../assets/dish/bao-tu-chay-toi-ot.jpg'),
            serve: 573,
            percentage: 76,
        },
        {
            top: 3,
            dish: 'Canh bầu',
            image: require('../assets/dish/ca-basa-kho-to.jpg'),
            serve: 853,
            percentage: 59,
        },
        {
            top: 4,
            dish: 'Cá ba sa kho tộ',
            image: require('../assets/dish/ca-hoi-shio-koji-ap-chao.jpg'),
            serve: 364,
            percentage: 47,
        },
        {
            top: 5,
            dish: 'Đậu cô ve xào',
            image: require('../assets/dish/ca-thac-lac-kho-qua.jpg'),
            serve: 284,
            percentage: 45,
        },
        {
            top: 6,
            dish: 'Bún thái',
            image: require('../assets/dish/ga-teriyaki.jpg'),
            serve: 194,
            percentage: 34,
        },
        {
            top: 7,
            dish: 'Rau muống xào',
            image: require('../assets/dish/oc-cana-chay-toi-ot.jpg'),
            serve: 739,
            percentage: 16,
        },
    ];

    const dataReview = [
        {
            id: 1,
            displayName: 'Thu Thao',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-1.jpeg'),
            review: 'We recently had dinner with friends at Dimas Can Zheng and we all we will be back!',
            star: 1,
            totalReview: 124,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 2,
            displayName: 'Thien Nguyen',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-2.jpeg'),
            review: 'We recently had dinner with friends at Dimas Can Zheng and we all environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 3,
            totalReview: 42,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 3,
            displayName: 'Bao Nhan',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-3.jpeg'),
            review: 'We recently had dinner with friends at Dimas Can  pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 2,
            totalReview: 75,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 4,
            displayName: 'Trong',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-4.jpeg'),
            review: 'We recently had dinner with friends at Dimas Can Zheng Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 2,
            totalReview: 25,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 5,
            displayName: 'Quoc Hung',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-5.png'),
            review: 'We recently had dinner with friends at Dimas Can Zheng and we pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 4,
            totalReview: 72,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 6,
            displayName: 'Bach',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-6.jpeg'),
            review: 'We recently had dinner with friends at Dimas Can Zheng and we all pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 2,
            totalReview: 46,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 7,
            displayName: 'Le Quy',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-7.jpeg'),
            review: 'We recently had dinner with  the evening. Thanks to the team and we will be back!',
            star: 2,
            totalReview: 25,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 8,
            displayName: 'Thu Thuy',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-8.jpeg'),
            review: 'We recently had dinner with we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 7,
            totalReview: 63,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 9,
            displayName: 'Hao Nguyen',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-9.jpeg'),
            review: 'We all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 5,
            totalReview: 153,
            createdDate: '03/11/2023 12:42 AM',
        },
        {
            id: 10,
            displayName: 'Vu Le',
            department: 'OFF',
            avatar: require('../assets/avatar/avt-10.jpeg'),
            review: 'We recently had dinner we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!',
            star: 2,
            totalReview: 63,
            createdDate: '03/11/2023 12:42 AM',
        },
    ];

    const dataFavorite = [
        {
            dish: 'Tôm rim',
            image: require('../assets/dish/thit-ba-roi-uop-shiokoji.jpg'),
            star: 4,
            comment: 21,
            like: 41,
            serve: 922,
            percentage: 12,
        },
        {
            dish: 'Susu xào',
            image: require('../assets/dish/bao-tu-chay-toi-ot.jpg'),
            star: 3,
            comment: 17,
            like: 15,
            serve: 573,
            percentage: 12,
        },
        {
            dish: 'Canh bầu',
            image: require('../assets/dish/ca-basa-kho-to.jpg'),
            star: 5,
            comment: 35,
            like: 75,
            serve: 853,
            percentage: 12,
        },
        {
            dish: 'Cá ba sa kho tộ',
            image: require('../assets/dish/goi-tai-heo.jpg'),
            star: 2,
            comment: 11,
            like: 12,
            serve: 364,
            percentage: 12,
        },
        {
            dish: 'Đậu cô ve xào',
            image: require('../assets/dish/ca-thac-lac-kho-qua.jpg'),
            star: 1,
            comment: 27,
            like: 41,
            serve: 284,
            percentage: 12,
        },
        {
            dish: 'Bún thái',
            image: require('../assets/dish/ga-teriyaki.jpg'),
            star: 4,
            comment: 34,
            like: 57,
            serve: 194,
            percentage: 12,
        },
        {
            dish: 'Rau muống xào',
            image: require('../assets/dish/oc-cana-chay-toi-ot.jpg'),
            star: 3,
            comment: 12,
            like: 23,
            serve: 739,
            percentage: 12,
        },
    ];

    const itemsBreadcrumb = [{ title: 'Home' }, { title: '' }];

    return (
        <ContentComponent items={itemsBreadcrumb} loading={false}>
            <>
                <Row gutter={[16, 16]}>
                    <Col xs={12} lg={6}>
                        <Card size={'small'}>
                            <Text strong type={'secondary'} style={{ fontSize: 14 }}>
                                NGÂN SÁCH HÔM NAY
                            </Text>
                            <Title level={4} style={{ margin: 10 }}>
                                1.928.000
                            </Title>
                            <Tag
                                color="DodgerBlue"
                                style={{
                                    fontSize: 20,
                                    boxShadow: '10 10 20 0 rgba(155, 155, 155, 0.75)',
                                }}
                            >
                                +36% <ArrowUp />
                            </Tag>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Card size={'small'}>
                            <Text strong type={'secondary'} style={{ fontSize: 14 }}>
                                SỐ NGƯỜI HÔM NAY
                            </Text>
                            <Title level={4} style={{ margin: 10 }}>
                                47
                            </Title>
                            <Tag
                                color="OrangeRed"
                                style={{
                                    fontSize: 20,
                                    boxShadow: '10 10 20 0 rgba(155, 155, 155, 0.75)',
                                }}
                            >
                                -14% <ArrowDown />
                            </Tag>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Card size={'small'}>
                            <Text strong type={'secondary'} style={{ fontSize: 14 }}>
                                TRUNG BÌNH / NGƯỜI
                            </Text>
                            <Title level={4} style={{ margin: 10 }}>
                                21.880
                            </Title>
                            <Tag
                                color="DodgerBlue"
                                style={{
                                    fontSize: 20,
                                    boxShadow: '10 10 20 0 rgba(155, 155, 155, 0.75)',
                                }}
                            >
                                +11% <ArrowUp />
                            </Tag>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Card size={'small'}>
                            <Text strong type={'secondary'} style={{ fontSize: 14 }}>
                                NGÂN SÁCH CÒN LẠI
                            </Text>
                            <Title level={4} style={{ margin: 10 }}>
                                5.327.839
                            </Title>
                            <Tag
                                color="OrangeRed"
                                style={{
                                    fontSize: 20,
                                    boxShadow: '10 10 20 0 rgba(155, 155, 155, 0.75)',
                                }}
                            >
                                -21% <ArrowDown />
                            </Tag>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
                    <Col sm={24} lg={12}>
                        <Card
                            title="NGÂN SÁCH"
                            extra={
                                <Dropdown
                                    menu={{
                                        items: [
                                            { key: 1, label: 'Day' },
                                            { key: 2, label: 'Week' },
                                            { key: 3, label: 'Month' },
                                            { key: 4, label: 'Year' },
                                        ],
                                        onClick: e => console.log(e),
                                    }}
                                    arrow
                                >
                                    <Button
                                        style={{
                                            color: '#fff',
                                            backgroundColor: 'DodgerBlue',
                                            boxShadow: '10 10 20 0 rgba(155, 155, 155, 0.75)',
                                        }}
                                    >
                                        <Space>
                                            Day <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            }
                        >
                            <Chart
                                type={'area'}
                                height={350}
                                series={[
                                    {
                                        name: 'Chi phí',
                                        data: [
                                            12900000, 13001000, 13100000, 12990000, 13100000,
                                            13001100, 12990000, 12991100, 13010010, 12999999,
                                            12988999, 13100001,
                                        ],
                                    },
                                ]}
                                options={{
                                    chart: {
                                        type: 'area',
                                        stacked: false,
                                        zoom: {
                                            type: 'x',
                                            enabled: true,
                                            autoScaleYaxis: true,
                                        },
                                        toolbar: {
                                            autoSelected: 'zoom',
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                    },
                                    markers: {
                                        size: 0,
                                    },
                                    // title: {
                                    // text: 'BUDGET',
                                    // align: 'left',
                                    // },
                                    fill: {
                                        type: 'gradient',
                                        // colors: 'DodgerBlue',
                                        gradient: {
                                            shadeIntensity: 1,
                                            inverseColors: false,
                                            opacityFrom: 0.5,
                                            opacityTo: 0,
                                            stops: [0, 90, 100],
                                        },
                                    },
                                    yaxis: {
                                        labels: {
                                            formatter: val =>
                                                `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                        },
                                        title: {
                                            text: 'Budget',
                                        },
                                    },
                                    xaxis: {
                                        categories: [
                                            'Jan',
                                            'Feb',
                                            'Mar',
                                            'Apr',
                                            'May',
                                            'Jun',
                                            'Jul',
                                            'Aug',
                                            'Sep',
                                            'Oct',
                                            'Nov',
                                            'Dec',
                                        ],
                                    },
                                    tooltip: {
                                        shared: false,
                                        y: {
                                            formatter: val =>
                                                `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                        },
                                    },
                                }}
                            />
                        </Card>
                    </Col>
                    <Col sm={24} lg={12}>
                        <Card title="TOP MÓN ĂN">
                            <Chart
                                type={'bar'}
                                height={350}
                                options={{
                                    annotations: {
                                        points: [
                                            {
                                                // x: 'Bananas',
                                                seriesIndex: 0,
                                                label: {
                                                    borderColor: '#775DD0',
                                                    offsetY: 0,
                                                    style: {
                                                        color: 'black',
                                                        background: '#775DD0',
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    chart: {
                                        height: 350,
                                        type: 'bar',
                                    },
                                    plotOptions: {
                                        bar: {
                                            borderRadius: 10,
                                            columnWidth: '50%',
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                    },
                                    // title: {
                                    //     text: 'CHI PHÍ MỖI THÁNG',
                                    //     align: 'left',
                                    // },
                                    stroke: {
                                        width: 2,
                                    },

                                    grid: {
                                        row: {
                                            colors: ['#fff', '#f2f2f2'],
                                        },
                                    },
                                    xaxis: {
                                        labels: {
                                            rotate: -45,
                                        },
                                        categories: [
                                            'Cá basa kho tộ',
                                            'Gà kho gừng',
                                            'Đậu hủ dồn thịt',
                                            'Gà chiên nước mắm',
                                            'Dưa hấu',
                                            'Thịt kho trứng',
                                            'Thịt kho mắm ruốc',
                                            'Canh cải',
                                            'Cá chiên mắm gừng',
                                            'Cá diêu hồng nấu ngót',
                                            'Đậu cô ve xào',
                                            'Bì chả',
                                        ],
                                        tickPlacement: 'on',
                                    },
                                    yaxis: {
                                        title: {
                                            text: '回',
                                        },
                                    },
                                    fill: {
                                        type: 'gradient',
                                        gradient: {
                                            shade: 'light',
                                            type: 'horizontal',
                                            shadeIntensity: 0.25,
                                            gradientToColors: undefined,
                                            inverseColors: true,
                                            opacityFrom: 0.85,
                                            opacityTo: 0.85,
                                            stops: [50, 0, 100],
                                        },
                                    },
                                }}
                                series={[
                                    {
                                        name: '回',
                                        data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 35],
                                    },
                                ]}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
                    {/* TABLE ANALYTICS */}
                    <Col xs={24} lg={14} xl={16} xxl={18}>
                        <Card>
                            <Title
                                level={5}
                                style={{
                                    fontSize: 24,
                                    margin: '10px 0 40px 0',
                                }}
                            >
                                CHI TIẾT THỰC ĐƠN GẦN ĐÂY
                            </Title>
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                size={'small'}
                                scroll={{ x: true }}

                                // style={{ height: 350 }}
                            />
                        </Card>
                    </Col>
                    {/* DAILY MENU */}
                    <Col xs={24} lg={10} xl={8} xxl={6}>
                        <Card>
                            <Title
                                level={5}
                                style={{
                                    fontSize: 24,
                                    margin: '10px 0 40px 0',
                                }}
                            >
                                THỰC ĐƠN 06/Nov/2023
                            </Title>
                            <List
                                itemLayout={'vertical'}
                                pagination={{ pageSize: 1 }}
                                dataSource={[
                                    {
                                        day: 2,
                                        menu: [
                                            {
                                                id: 1,
                                                dish: 'Tôm rim',
                                                size: 52,
                                                image: require('../assets/dish/banh-tom-chien.jpg'),
                                            },
                                            {
                                                id: 2,
                                                dish: 'Susu xào',
                                                size: 52,
                                                image: require('../assets/dish/ca-basa-kho-to.jpg'),
                                            },
                                            {
                                                id: 3,
                                                dish: 'Canh bầu',
                                                size: 52,
                                                image: require('../assets/dish/ga-teriyaki.jpg'),
                                            },
                                            {
                                                id: 4,
                                                dish: 'Tráng miệng',
                                                size: 52,
                                                image: require('../assets/dish/oc-cana-chay-toi-ot.jpg'),
                                            },
                                        ],
                                    },
                                    {
                                        day: 3,
                                        menu: [
                                            {
                                                id: 1,
                                                dish: 'Cá ba sa kho tộ',
                                                size: 52,
                                                image: require('../assets/dish/cha-gio-chay-shiokoji.jpg'),
                                            },
                                            {
                                                id: 2,
                                                dish: 'Đậu cô ve xào',
                                                size: 52,
                                                image: require('../assets/dish/goi-tai-heo.jpg'),
                                            },
                                            {
                                                id: 3,
                                                dish: 'Canh mướp',
                                                size: 52,
                                                image: require('../assets/dish/salad-dau-giam.jpg'),
                                            },
                                            {
                                                id: 4,
                                                dish: 'Tráng miệng',
                                                size: 52,
                                                image: require('../assets/dish/thit-ba-roi-chay-toi-ot.jpg'),
                                            },
                                        ],
                                    },
                                    {
                                        day: 4,
                                        menu: [
                                            {
                                                id: 1,
                                                dish: 'Bún thái',
                                                size: 52,
                                                image: require('../assets/dish/banh-tom-chien.jpg'),
                                            },
                                            {
                                                id: 2,
                                                dish: 'Rau muống xào',
                                                size: 52,
                                                image: require('../assets/dish/ca-basa-kho-to.jpg'),
                                            },
                                            {
                                                id: 3,
                                                dish: 'Canh cải',
                                                size: 52,
                                                image: require('../assets/dish/ga-teriyaki.jpg'),
                                            },
                                            {
                                                id: 4,
                                                dish: 'Tráng miệng',
                                                size: 52,
                                                image: require('../assets/dish/oc-cana-chay-toi-ot.jpg'),
                                            },
                                        ],
                                    },
                                ]}
                                renderItem={item =>
                                    item.menu.map(menu => (
                                        <List.Item
                                            key={menu.dish}
                                            extra={
                                                <Image
                                                    src={menu.image}
                                                    width={140}
                                                    style={{
                                                        borderRadius: 24,
                                                    }}
                                                />
                                            }
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Title type={'secondary'} level={5}>
                                                        #{menu.id}
                                                    </Title>
                                                }
                                                title={menu.dish}
                                                description={
                                                    <Space direction={'vertical'} size={'middle'}>
                                                        <Tag
                                                            color="blue"
                                                            style={{
                                                                boxShadow:
                                                                    '10 10 20 0 rgba(155, 155, 155, 0.75)',
                                                            }}
                                                        >
                                                            {`${menu.size} người`}
                                                        </Tag>
                                                        <Space size={'middle'}>
                                                            <IconText
                                                                icon={<StarOutlined />}
                                                                text="31"
                                                                key="star-outlined"
                                                            />
                                                            <IconText
                                                                icon={<LikeOutlined />}
                                                                text="42"
                                                                key="like-outlined"
                                                            />
                                                            <IconText
                                                                icon={<MessageOutlined />}
                                                                text="7"
                                                                key="message-outlined"
                                                            />
                                                        </Space>
                                                    </Space>
                                                }
                                            />
                                        </List.Item>
                                    ))
                                }
                            />
                        </Card>
                    </Col>
                </Row>
                {/* TOP TRENDING */}
                <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
                    <Col xs={24} lg={12}>
                        <Card>
                            <Title
                                level={5}
                                style={{
                                    fontSize: 24,
                                    margin: '10px 0 40px 0',
                                }}
                            >
                                TOP TRENDING
                            </Title>
                            <List
                                pagination={{ pageSize: 5 }}
                                dataSource={dataTrending}
                                renderItem={item => (
                                    <List.Item
                                        extra={
                                            <Space size={'small'}>
                                                <Image
                                                    src={require('../assets/others/up-trend.png')}
                                                    width={70}
                                                    preview={false}
                                                />
                                                <Space size={'small'} direction="vertical">
                                                    <Text strong>{item.serve}</Text>
                                                    <Text type={'secondary'}>Serve</Text>
                                                    <Text strong>({item.percentage}%)</Text>
                                                </Space>
                                            </Space>
                                        }
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Space size={'middle'}>
                                                    <Title type={'secondary'} level={3}>
                                                        #{item.top}
                                                    </Title>
                                                    <Image
                                                        src={item.image}
                                                        width={160}
                                                        style={{
                                                            borderRadius: 24,
                                                        }}
                                                    />
                                                </Space>
                                            }
                                            title={item.dish}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    {/* REVIEWS */}
                    <Col xs={24} lg={12}>
                        <Card>
                            <Title
                                level={5}
                                style={{
                                    fontSize: 24,
                                    margin: '10px 0 40px 0',
                                }}
                            >
                                REVIEWS
                            </Title>
                            <List
                                pagination={{ pageSize: 3 }}
                                dataSource={dataReview}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} size={64} />}
                                            title={item.displayName}
                                            description={
                                                <Space direction={'vertical'}>
                                                    <Text
                                                        type={'secondary'}
                                                        style={{ fontSize: 14 }}
                                                    >
                                                        {item.createdDate}
                                                        <br />
                                                        {item.totalReview} reviews
                                                    </Text>
                                                    <Rate
                                                        disabled
                                                        defaultValue={item.star}
                                                        style={{
                                                            fontSize: 16,
                                                            color: '#f90',
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 16 }}>
                                                        {item.review}
                                                    </Text>
                                                </Space>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
                {/*  MOST FAVORITES */}
                <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
                    <Col xs={24}>
                        <Card>
                            <Title
                                level={5}
                                style={{
                                    fontSize: 24,
                                    margin: '10px 0 40px 0',
                                }}
                            >
                                MOST FAVORITES
                            </Title>
                            <List
                                grid={{
                                    gutter: [16, 16],
                                    xs: 1,
                                    sm: 3,
                                    md: 3,
                                    lg: 3,
                                    xl: 6,
                                    xxl: 6,
                                }}
                                pagination={{ pageSize: 6 }}
                                dataSource={dataFavorite}
                                renderItem={item => (
                                    <List.Item>
                                        <Card
                                            hoverable
                                            bordered={false}
                                            cover={
                                                <Image
                                                    src={item.image}
                                                    style={{
                                                        borderRadius: 28,
                                                    }}
                                                />
                                            }
                                            style={{
                                                borderRadius: 28,
                                            }}
                                        >
                                            <Card.Meta
                                                title={item.dish}
                                                description={
                                                    <Space size={'middle'} direction={'vertical'}>
                                                        <Rate
                                                            disabled
                                                            defaultValue={item.star}
                                                            style={{
                                                                fontSize: 16,
                                                                color: '#f90',
                                                            }}
                                                        />
                                                        <Text
                                                            type={'secondary'}
                                                            strong
                                                            style={{ fontSize: 16 }}
                                                        >
                                                            <HeartFilled style={{ color: 'red' }} />{' '}
                                                            {item.like} Like it
                                                        </Text>
                                                        <Text
                                                            type={'secondary'}
                                                            strong
                                                            style={{ fontSize: 16 }}
                                                        >
                                                            <MessageFilled /> {item.comment} Review
                                                        </Text>
                                                        <Text
                                                            type={'secondary'}
                                                            strong
                                                            style={{ fontSize: 16 }}
                                                        >
                                                            <CheckCircleFilled
                                                                style={{ color: 'green' }}
                                                            />{' '}
                                                            {item.serve} Served
                                                        </Text>
                                                    </Space>
                                                }
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </>
        </ContentComponent>
    );
};

export default HomePage;
// - Thống kê số liệu
// + Ngân sách menu hôm nay
// + Số người hôm nay
// + Chi phí cho 1 người
// + Ngân sách còn lại bao nhiêu

// + Bảng dữ liệu gồm: menu, số người, tổng ngân sách, trung bình 1 người, đã hoàn thành chưa?
// + Biểu đổ ngân sách theo ngày, tuần, tháng, năm
// + Biểu đồ ngân sách cho

// - Menu ngày: dạng list item

// - Top 10 món ăn được ưa thích nhất: list
// - Danh sách tat ca món ăn va binh luan

// Marquee ảnh món ăn https://preview.themeforest.net/item/drora-bootstrap-restaurant-admin-dashboard-html-template/full_Page_preview/20016533?_ga=2.227338334.254427025.1698845217-2040931186.1698552929
