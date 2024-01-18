// Import React và hooks từ thư viện React
import React from 'react';

// Import các component cụ thể từ thư viện antd
import { Dropdown, Modal, Typography } from 'antd';

// Import các biểu tượng cụ thể từ thư viện ant-design/icons
import { ExclamationCircleFilled } from '@ant-design/icons';

// Import các biểu tượng cụ thể từ thư viện react-bootstrap-icons
import { PencilFill, ThreeDotsVertical, Trash3Fill } from 'react-bootstrap-icons';

// Destructuring component Text từ Typography
const { Text } = Typography;

const DropdownComponent = ({ actionDelete, actionEdit }) => (
    <Dropdown
        arrow={true}
        menu={{
            items: [
                {
                    key: '2',
                    label: 'Edit',
                    icon: <PencilFill />,
                    onClick: actionEdit,
                },
                {
                    key: '3',
                    label: <Text type={'danger'}>Delete</Text>,
                    icon: <Trash3Fill color="red" />,
                    onClick: actionDelete,
                },
            ],
        }}
        placement={'bottomLeft'}
    >
        <ThreeDotsVertical />
    </Dropdown>
);

export default DropdownComponent;
