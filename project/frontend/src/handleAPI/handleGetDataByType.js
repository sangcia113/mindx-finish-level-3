// Thư viện axios được import để gửi yêu cầu HTTP
import axios from 'axios';

// Hàm lấy thông tin URL được import vào
import { appInfo } from '../constant/appInfo';

const BASE_URL = appInfo.BASE_URL;

const handleGetDataAccountType = async setAccountType => {
    axios
        .get(`${BASE_URL}/api/account_type`)
        .then(response => {
            console.log('Run handleGetDataAccountType....');
            setAccountType(response.data);
        })
        .catch(error => console.log(error));
    try {
        return await axios.get(`${BASE_URL}/api/account-type`);
    } catch (error) {
        console.error(error);
    }
};

const handleGetDataDepartment = setDepartment => {
    axios
        .get(`${BASE_URL}/api/department`)
        .then(response => {
            console.log('Run handleGetDataDepartment....');
            setDepartment(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataDish = setDish => {
    axios
        .get(`${BASE_URL}/api/dish`)
        .then(response => {
            console.log('Run handleGetDataDish....');
            setDish(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataDishType = setDishType => {
    axios
        .get(`${BASE_URL}/api/dish_type`)
        .then(response => {
            console.log('Run handleGetDataDishType....');
            setDishType(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataIngredient = setIngredient => {
    axios
        .get(`${BASE_URL}/api/ingredient`)
        .then(response => {
            console.log('Run handleGetDataIngredient....');
            setIngredient(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataIngredientDetail = setIngredientDetail => {
    axios
        .get(`${BASE_URL}/api/ingredient_detail`)
        .then(response => {
            console.log('Run handleGetDataIngredientDetail....');
            setIngredientDetail(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataIngredientType = setIngredientType => {
    axios
        .get(`${BASE_URL}/api/ingredient_type`)
        .then(response => {
            console.log('Run handleGetDataIngredientType....');
            setIngredientType(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataMenu = setMenu => {
    axios
        .get(`${BASE_URL}/api/menu`)
        .then(response => {
            console.log('Run handleGetDataMenu....');
            setMenu(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataStaff = setStaff => {
    axios
        .get(`${BASE_URL}/api/staff`)
        .then(response => {
            console.log('Run handleGetDataStaff....');
            setStaff(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataSupplier = setSupplier => {
    axios
        .get(`${BASE_URL}/api/supplier`)
        .then(response => {
            console.log('Run handleGetDataSupplier....');
            setSupplier(response.data);
        })
        .catch(error => console.log(error));
};

const handleGetDataUnit = setUnit => {
    axios
        .get(`${BASE_URL}/api/unit`)
        .then(response => {
            console.log('Run handleGetDataUnit....');
            setUnit(response.data);
        })
        .catch(error => console.log(error));
};

export {
    handleGetDataAccountType,
    handleGetDataDepartment,
    handleGetDataDish,
    handleGetDataDishType,
    handleGetDataIngredient,
    handleGetDataIngredientDetail,
    handleGetDataIngredientType,
    handleGetDataMenu,
    handleGetDataStaff,
    handleGetDataSupplier,
    handleGetDataUnit,
};
