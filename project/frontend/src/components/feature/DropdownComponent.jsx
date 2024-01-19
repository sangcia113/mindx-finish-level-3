import React from 'react';

import { Dropdown, Typography } from 'antd';

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
                    style: {
                        color: '#faad14',
                    },
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
