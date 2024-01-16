import React from 'react';

import { Breadcrumb, Layout, Spin } from 'antd';

const { Content } = Layout;

const ContentComponent = ({ loading, items, children }) => (
    <Spin spinning={loading} tip="Vui lòng đợi...">
        <Content style={{ padding: 8 }}>
            <Breadcrumb items={items} style={{ margin: '12px 0 24px 2px' }} />
            {children}
        </Content>
    </Spin>
);

export default ContentComponent;
