// Thư viện axios được import để gửi yêu cầu HTTP
import axios from 'axios';

// Hàm lấy thông tin URL được import vào
import { appInfo } from '../constant/appInfo';
// Hàm xử lý thời gian từ file handleDateTime được import vào
import { handleDateTime } from '../utils/handle-date-time/handleDateTime';

// Các component tùy chỉnh đã được tạo trước đó được import vào
import { modalError, modalSuccess } from '../components/index';

const BASE_URL = appInfo.BASE_URL;

// Hàm lấy dữ liệu từ API
const handleGetData = (table, setDataSource) => {
    console.log('Run handleGetData....');
    axios
        .get(`${BASE_URL}/api/${table}`)
        .then(response => {
            // Chuyển đổi dữ liệu và cập nhật vào state
            const arrData = response.data.map(item => ({
                ...item,
                createdDate: new handleDateTime().convertDate(item.createdDate),
                key: item.id,
            }));
            setDataSource(arrData);
        })
        .catch(error => console.log(error));
};

// // Hàm lấy dữ liệu theo id từ API
// const handleGetDataById = (table, id, form, handleModal) => {
//     console.log('Run handleGetDataById....');
//     axios
//         .get(`${BASE_URL}/api/${table}/${id}`)
//         .then(response => {
//             form.setFieldsValue({ ...response.data[0] });
//             handleModal();
//         })
//         .catch(error => console.log(error));
// };

// Hàm thêm dữ liệu mới dùng API
const handleInsertData = (table, handleModal, reRender, ...arr) => {
    console.log('Run handleInsertData....');
    axios
        .post(`${BASE_URL}/api/${table}`, { ...arr[0] })
        .then(response => {
            // Đóng modal
            handleModal();
            // Gọi hàm xử lý response
            handleNotification(response, reRender);
        })
        .catch(error => console.log(error));
};

// Hàm cập nhật dữ liệu theo id dùng API
const handleUpdateDataById = (table, id, handleModal, reRender, ...arr) => {
    console.log('Run handleUpdateDataById....');
    axios
        .put(`${BASE_URL}/api/${table}/${id}`, { ...arr[0] })
        .then(response => {
            // Đóng modal
            handleModal();
            // Gọi hàm xử lý response
            handleNotification(response, reRender);
        })
        .catch(error => console.log(error));
};

// Hàm xóa dữ liệu theo id dùng API
const handleDeleteDataById = (table, id, reRender) => {
    console.log('Run handleDeleteDataById....');
    axios
        .delete(`${BASE_URL}/api/${table}/${id}`)
        .then(response => handleNotification(response, reRender))
        .catch(error => console.log(error));
};

// Hàm gửi thông báo thông qua mã phản hồi response
const handleNotification = (response, reRender) => {
    if (response.status === 200) {
        // Hiển thị thông báo thành công
        modalSuccess(response.data.message);
        // Rerender dữ liệu
        reRender();
    } else {
        // Hiển thị thông báo thất bại
        modalError(response.data.message);
    }
};

export {
    handleGetData,
    // handleGetDataById,
    handleInsertData,
    handleUpdateDataById,
    handleDeleteDataById,
};
