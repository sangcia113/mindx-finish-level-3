import React, { useRef } from 'react';
import { Button, Carousel, Col, Image, Row, Space } from 'antd';
import '../styles/WeeklyMenuPage.css'; // Tạo một file CSS để định dạng và thêm animation

const videoSource = require(`../assets/introduction/beefsteak-cut.mp4`);

const WeeklyMenuPage = () => {
    console.log('WeeklyMenuPage');

    const colRef = useRef(null);

    const handleDetailMenuClick = () => {
        if (colRef.current) {
            colRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <video autoPlay muted loop playsInline className="background-video">
                    <source src={videoSource} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ phát video này!
                </video>
                <div className="text-overlay">
                    <h1 className="animate-left">
                        WINEFOOD<br></br>WEEKLY<br></br>MENU
                    </h1>
                    <Button
                        size={'large'}
                        className="animate-right"
                        onClick={handleDetailMenuClick}
                    >
                        Detail Menu
                    </Button>
                </div>
            </Col>
            <Col xs={24} ref={colRef} className="weekly-menu-col">
                <Carousel autoplay>
                    <Space>
                        <Row>
                            <Col xs={24} sm={10}>
                                TEST
                            </Col>
                            <Col xs={24} sm={14}>
                                <Image
                                    src={require('../assets/dish/ca-basa-kho-to.jpg')}
                                    style={{
                                        borderRadius: 42,
                                        maxWidth: '80%',
                                        marginLeft: '10%',
                                    }}
                                />
                            </Col>
                        </Row>
                    </Space>
                </Carousel>
            </Col>
        </Row>
    );
};

export default WeeklyMenuPage;
