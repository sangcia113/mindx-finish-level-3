// Các component tùy chỉnh đã được tạo trước đó được import vào
import { Modal } from 'antd';

// Hàm gửi thông báo thông qua mã phản hồi response
export const handleNotification = (response, reRender) => {
    if (response.status === 200) {
        // Hiển thị thông báo thành công
        Modal.success({
            title: 'Thành công!',
            content: response.data.message,
            centered: true,
            onOk: () => reRender(),
        });
    } else {
        // Hiển thị thông báo thất bại
        Modal.error({ title: 'Thất bại!', content: response.data.message, centered: true });
    }
};
