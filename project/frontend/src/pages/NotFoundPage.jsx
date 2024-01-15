import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang mà bạn đang truy cập không tồn tại!"
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    Back Home
                </Button>
            }
        />
    );
};
export default NotFoundPage;
