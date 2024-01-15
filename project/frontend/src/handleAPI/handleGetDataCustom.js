// Thư viện axios được import để gửi yêu cầu HTTP
import axios from 'axios';

// Hàm lấy thông tin URL được import vào
import { appInfo } from '../constant/appInfo';

const BASE_URL = appInfo.BASE_URL;

const handleGetDataCustom = (
    setDataCustom,
    tableFirst,
    tableSecond,
    dataFirst,
    dataSecond,
    mapFirst,
    mapSecond,
    where,
    order
) => {
    axios
        .get(`${BASE_URL}/api/custom`, {
            tableFirst,
            tableSecond,
            dataFirst,
            dataSecond,
            mapFirst,
            mapSecond,
            where,
            order,
        })
        .then(response => {
            console.log('Run handleGetDataCustom....');
            setDataCustom(response.data);
        })
        .catch(error => console.log(error));
};

export { handleGetDataCustom };
