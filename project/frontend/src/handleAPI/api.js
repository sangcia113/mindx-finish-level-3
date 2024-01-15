import axios from 'axios';
import { handleDateTime } from '../utils/handle-date-time/handleDateTime';
import { appInfo } from '../constant/appInfo';

const BASE_URL = appInfo.BASE_URL;

const getDataByType = async table => {
    try {
        return await axios.get(`${BASE_URL}/api/${table}`);
    } catch (error) {
        console.log(error);
    }
};

const getDataById = async (table, id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/${table}/${id}`);
        return response.data.map(item => ({
            ...item,
            key: item.id,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getData = async table => {
    try {
        const response = await axios.get(`${BASE_URL}/api/${table}`);
        return response.data.map(item => ({
            ...item,
            createdDate: new handleDateTime().convertDate(item.createdDate),
            key: item.id,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

const postData = async (table, data) => {
    try {
        return await axios.post(`${BASE_URL}/api/${table}`, data);
    } catch (error) {
        console.error(error);
    }
};

const putData = async (table, id, data) => {
    try {
        return await axios.put(`${BASE_URL}/api/${table}/${id}`, data);
    } catch (error) {
        console.error(error);
    }
};

const deleteData = async (table, id) => {
    try {
        return await axios.delete(`${BASE_URL}/api/${table}/${id}`);
    } catch (error) {
        console.error(error);
    }
};

export { getDataById, getDataByType, getData, postData, putData, deleteData };
