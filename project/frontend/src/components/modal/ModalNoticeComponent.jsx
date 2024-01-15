// import React from 'react';
// import { Modal } from 'antd';

// const ModalNoticeComponent = ({ noticeType, title, content }) => {
//     const [api, contextHolder] = Modal.useModal();

//     const notice = () => {
//         switch (noticeType) {
//             case 'info':
//                 api.info({
//                     title,
//                     content,
//                 });
//                 break;
//             case 'success':
//                 api.success({
//                     title,
//                     content,
//                 });
//                 break;
//             case 'error':
//                 api.error({
//                     title,
//                     content,
//                 });
//                 break;
//             case 'warning':
//                 api.warning({
//                     title,
//                     content,
//                 });
//                 break;
//             default:
//                 break;
//         }
//     };

//     notice();

//     return <>{contextHolder}</>;
// };

// export default ModalNoticeComponent;

// import { Modal } from 'antd';

// const ModalNoticeComponent = ({ noticeType, title, content }) => {
//     switch (noticeType) {
//         case 'info':
//             console.log('info');
//             return Modal.info({ title, content, centered: true });
//         case 'success':
//             console.log('success');
//             return Modal.success({ title, content, centered: true });
//         case 'error':
//             console.log('error');
//             return Modal.error({ title, content, centered: true });
//         case 'warning':
//             console.log('warning');
//             return Modal.warning({ title, content, centered: true });
//         default:
//             break;
//     }
// };

// export default ModalNoticeComponent;

import { Modal } from 'antd';

// Hàm hiển thị thông báo modal error
const modalInfo = content => {
    Modal.info({ title: 'Thông tin!', content, centered: true });
};

// Hàm hiển thị thông báo modal success
const modalSuccess = content => {
    Modal.success({ title: 'Thành công!', content, centered: true });
};

// Hàm hiển thị thông báo modal error
const modalError = content => {
    Modal.error({ title: 'Thất bại!', content, centered: true });
};

// Hàm hiển thị thông báo modal error
const modalWarning = content => {
    Modal.warning({ title: 'Cảnh báo!', content, centered: true });
};

export { modalInfo, modalSuccess, modalError, modalWarning };
