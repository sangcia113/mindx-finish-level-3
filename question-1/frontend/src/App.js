import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
    Layout,
    Modal,
    Table,
    Typography,
} from 'antd';
import dayjs from 'dayjs';

const App = () => {
    const [dataSource, setDataSource] = useState([]);
    const [totalTask, setTotalTask] = useState();
    const [showNotFinished, setShowNotFinished] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        loadTasksFromLocalStorage();
    }, []);

    useEffect(() => {
        handleCountTotalTask();
    }, [dataSource]);

    const loadTasksFromLocalStorage = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setDataSource(tasks.map((item, index) => ({ ...item, key: index.toString() })));
        setTotalTask(tasks.length);
    };

    const handleCountTotalTask = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const total = tasks.filter(item => item.status === 0).length;
        setTotalTask(total);
    };

    const handleCheckboxChange = (selectedRowKeys, selectedRows) => {
        const updatedTasks = dataSource.map(item => {
            if (selectedRowKeys.includes(item.key)) {
                return { ...item, status: 1 };
            } else {
                return { ...item, status: 0 };
            }
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setDataSource(updatedTasks);
    };

    const handleShowNotFinished = e => {
        const isChecked = e.target.checked;
        setShowNotFinished(isChecked);
    };

    const getFilteredDataSource = () => {
        return showNotFinished ? dataSource.filter(item => item.status === 0) : dataSource;
    };

    const handleLanguageSwitch = language => {
        setCurrentLanguage(language);
    };

    const getTextContent = (enText, vnText) => {
        return currentLanguage === 'en' ? enText : vnText;
    };

    const onFinish = values => {
        const { task, deadline } = values;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const checkIsExisted = tasks.find(
            item => item.task === task && item.deadline === dayjs(deadline).format('DD/MM/YYYY')
        );

        if (checkIsExisted) {
            Modal.error({
                title: 'Task is existed!',
            });
        } else {
            tasks.push({
                task,
                deadline: dayjs(deadline).format('DD/MM/YYYY'),
                status: 0,
            });

            localStorage.setItem('tasks', JSON.stringify(tasks));

            setDataSource([...tasks]);
        }
    };

    const columns = [
        {
            title: getTextContent('Task', 'Nhiệm vụ'),
            dataIndex: 'task',
            render: (_, record) =>
                record.status === 1 ? <del>{record.task}</del> : <b>{record.task}</b>,
            sorter: (a, b) => a.task.length - b.task.length,
        },
        {
            title: getTextContent('Deadline', 'Hạn cuối'),
            dataIndex: 'deadline',
            render: (_, record) =>
                record.status === 1 ? <del>{record.deadline}</del> : record.deadline,
        },
        {
            title: getTextContent('Countdown', 'Còn lại (ngày)'),
            dataIndex: 'deadline',
            render: (_, record) => {
                const now = dayjs();
                const deadline = dayjs(record.deadline, 'DD/MM/YYYY');
                const diffInDays = deadline.diff(now.startOf('day'), 'days');
                return diffInDays > 0 ? `${diffInDays} days` : 'Expired';
            },
            sorter: (a, b) => a.deadline.length - b.deadline.length,
        },
        {
            title: getTextContent('Status', 'Trạng thái'),
            dataIndex: 'status',
            render: record => (record === 1 ? 'Done' : 'Not Finished'),
        },
    ];

    return (
        <Layout style={{ height: '100vh' }}>
            <Flex vertical justify="center" align="center" style={{ margin: 'auto' }}>
                <Card
                    title={getTextContent(
                        `You have ${totalTask} tasks left!`,
                        `Bạn còn ${totalTask} nhiệm vụ!`
                    )}
                    extra={
                        <Checkbox onChange={handleShowNotFinished}>
                            {getTextContent('Show not finished', 'Hiển thị chưa hoàn thành')}
                        </Checkbox>
                    }
                >
                    <Table
                        columns={columns}
                        dataSource={getFilteredDataSource()}
                        rowSelection={{
                            type: 'checkbox',
                            onChange: handleCheckboxChange,
                        }}
                    />
                    <Form onFinish={onFinish} layout="inline">
                        <Form.Item
                            name="task"
                            rules={[{ required: true, message: 'Please input task!' }]}
                            style={{ width: '100%' }}
                        >
                            <Input placeholder="Enter task..." />
                        </Form.Item>

                        <Form.Item
                            name="deadline"
                            rules={[{ required: true, message: 'Please select date!' }]}
                            style={{ width: '100%', margin: '20px 0' }}
                        >
                            <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
                        </Form.Item>

                        <Button htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Form>
                </Card>
                <Typography.Text>
                    {getTextContent('Made by MindX', 'Được tạo bởi MindX')}
                </Typography.Text>
                <Flex>
                    <Typography.Text>
                        Available on <Button onClick={() => handleLanguageSwitch('en')}>EN</Button>
                        <Button onClick={() => handleLanguageSwitch('vn')}>VN</Button>
                    </Typography.Text>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default App;
