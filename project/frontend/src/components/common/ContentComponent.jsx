import React from 'react';

import { Breadcrumb, Flex, Layout } from 'antd';

const { Content } = Layout;

const ContentComponent = ({ items, renderChildren }) => {
    return (
        <Content style={{ padding: '10px' }}>
            <Flex justify={'space-between'}>
                <Breadcrumb items={items} style={{ marginLeft: 50 }} />
            </Flex>
            {renderChildren()}
        </Content>
    );
};

export default ContentComponent;
