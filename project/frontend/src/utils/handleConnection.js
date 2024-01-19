import axios from 'axios';

const createInstance = accessToken => {
    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/api/menu`,
        timeout: 5000,
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });

    const create = (url, data, config) => instance.post(url, data, config);
    const read = (url, config) => instance.get(url, config);
    const update = (url, data, config) => instance.put(url, data, config);
    const remove = (url, config) => instance.delete(url, config);

    return { create, read, update, remove };
};

export default createInstance;
