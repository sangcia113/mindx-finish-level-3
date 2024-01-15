import React from 'react';

import { Button, Card } from 'antd';

import { PlusLg } from 'react-bootstrap-icons';

const CardComponent = ({ title, actionFunc, renderChildren }) => {
    return (
        <Card
            title={title}
            bordered
            hoverable
            extra={
                <Button
                    // type={'primary'}
                    shape={'circle'}
                    icon={<PlusLg style={{ marginTop: '4px' }} />}
                    onClick={() => actionFunc()}
                    style={{ color: 'white', backgroundColor: 'dodgerblue' }}
                />
            }
            style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.4)' }}
        >
            {renderChildren()}
        </Card>
    );
};

export default CardComponent;
