import axios, { Method } from 'axios';
import { CLIENT_ID, CLIENT_SECRET, getSessionData } from './auth';
import qs from 'qs';
import history from './history';


type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

type LoginData = {
    username: string;
    password: string;
}

const URL_BASE = 'http://localhost:8080';

axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if (error.response.status === 401) {
        history.push('/admin/auth/login');
    }
    return Promise.reject(error);
});

export const makeResquest = ({ method='GET', url, data, params, headers }:RequestParams) => {
    return axios({
        method,
        url: `${URL_BASE}${url}`,
        data,
        params,
        headers
    });
}

export const makePrivateRequest = ({ method='GET', url, data, params, }: RequestParams) => {
    const sessionData = getSessionData();

    const headers = {
        'Authorization': `Bearer ${sessionData.access_token}`
    }

    return makeResquest({ method, url, data, params, headers });
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