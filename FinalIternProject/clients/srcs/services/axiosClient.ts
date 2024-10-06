import { CONFIG_SSO } from '@constants';
import axios from 'axios';
import queryString from 'query-string';

const api = axios.create({
    baseURL: CONFIG_SSO.BASE.HOME,
    paramsSerializer: params => queryString.stringify(params),
});

api.interceptors.request.use(async (config: any)=> {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers,
    };
    config.data;
    return config;
});

api.interceptors.response.use(res => {
    if (res.data && res.status === 200) {
        return res.data;
    }
    throw new Error('Error');
}, error => {
    console.log(`Error api ${JSON.stringify(error)}`)
    throw new Error(error.response)
},
);

export default api;