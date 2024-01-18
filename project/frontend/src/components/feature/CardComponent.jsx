import React from 'react';

import { Button, Card } from 'antd';

import { PlusCircleFill } from 'react-bootstrap-icons';

const CardComponent = ({ title, actionFunc, children }) => {
    return (
        <Card
            title={title}
            bordered
            hoverable
            extra={
                <Button
                    icon={<PlusCircleFill style={{ fontSize: 22, marginTop: 3 }} />}
                    onClick={() => actionFunc()}
                    shape={'circle'}
                    type={'primary'}
                />
            }
            style={{
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(4px)',
            }}
        >
            {children}
        </Card>
    );
};

export default CardComponent;
