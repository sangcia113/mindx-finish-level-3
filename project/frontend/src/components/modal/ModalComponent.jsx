import React from 'react';

import { Modal } from 'antd';

const ModalComponent = ({
    open,
    title,
    footer,
    onOk,
    onCancel,
    afterClose,
    width,
    renderChildren,
}) => {
    return (
        <Modal
            open={open}
            title={title}
            footer={footer}
            onOk={onOk}
            onCancel={onCancel}
            afterClose={afterClose}
            width={width}
            // Bắt buộc modal render children bên trong trước rồi mới hiển thị
            forceRender
            okText="Submit"
            styles={{
                header: { textAlign: 'center', marginBottom: '20px' },
                // body: { display: 'flex', justifyContent: 'flex-start' },
                footer: { textAlign: 'center' },
            }}
        >
            {renderChildren()}
        </Modal>
    );
};

export default ModalComponent;
