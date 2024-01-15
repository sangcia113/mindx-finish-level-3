import React from 'react';

import { Col, Layout, Row, Space, Typography } from 'antd';
import { SuitHeartFill } from 'react-bootstrap-icons';

const { Footer } = Layout;
const { Link, Text } = Typography;

const FooterComponent = () => {
    return (
        // <Footer style={{ padding: '10px' }}>
        //     <Row>
        //         <Col sm={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
        //             <Text>
        //                 <Text strong>Released by © </Text>
        //                 <Link strong href="https://zalo.me/0972868740" target="_blank">
        //                     WineFood <SuitHeartFill color="red" /> Developer
        //                 </Link>
        //                 <Text strong> - Version </Text>
        //                 1.1.0
        //             </Text>
        //         </Col>
        //         <Col sm={12} style={{ display: 'flex', justifyContent: 'end' }}>
        //             <Text>
        //                 <Text strong>Copyright © WineFood 2023.</Text> All rights reserved.
        //             </Text>
        //         </Col>
        //     </Row>
        // </Footer>
        <Footer style={{ textAlign: 'center', padding: '10px 0' }}>
            <Row>
                <Col xs={24}>
                    <Space>
                        <Text strong style={{ fontSize: 16 }}>
                            Design by ©{' '}
                        </Text>
                        <Link
                            strong
                            href="https://zalo.me/0972868740"
                            target="_blank"
                            style={{ fontSize: 16 }}
                        >
                            PHAM THANH SANG <SuitHeartFill color="red" />
                        </Link>
                    </Space>
                </Col>
                <Col xs={24}>
                    <Space>
                        <Text strong style={{ fontSize: 16 }}>
                            Copyright © WineFood 2023.
                        </Text>
                        <Text style={{ fontSize: 16 }}> All rights reserved. </Text>
                    </Space>
                </Col>
            </Row>
        </Footer>
    );
};

export default FooterComponent;
