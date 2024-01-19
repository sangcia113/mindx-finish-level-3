import React, { useRef } from 'react';
import { Button } from 'antd';
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
        <>
            <video autoPlay muted loop playsInline className="background-video">
                <source src={videoSource} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video này!
            </video>
            <div className="text-overlay">
                <h1 className="animate-left">
                    <br></br>WEEKLY<br></br>MENU
                </h1>
                <Button size={'large'} className="animate-right" onClick={handleDetailMenuClick}>
                    Detail Menu
                </Button>
            </div>
        </>
    );
};

export default WeeklyMenuPage;
