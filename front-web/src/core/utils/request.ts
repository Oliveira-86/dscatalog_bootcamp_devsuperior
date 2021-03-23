import axios, { AxiosRequestConfig } from 'axios';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';
import qs from 'qs';

type LoginData = {
    username: string;
    password: string;
}

const URL_BASE = 'http://localhost:8080';

axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if (error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
});

export const makeResquest = (params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL: URL_BASE
    });
}

export const makePrivateRequest = (params: AxiosRequestConfig) => {
    const sessionData = getSessionData();

    const headers = {
        'Authorization': `Bearer ${sessionData.access_token}`
    }

    return makeResquest({ ...params, headers });
}

export const makeLogin = (loginData: LoginData) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const upload = qs.stringify({...loginData, grant_type: 'password' });

    return makeResquest({ url: '/oauth/token', data: upload, method: 'POST', headers });
}