import axios from 'axios';

const protocol = window.location.protocol
const host = window.location.host
export const BASE_URL = 'https://piloto-druid-spsa.appspot.com/'
// export const BASE_URL = 'https://piloto-druid-spsa.appspot.com/v31/'

// export const BASE_URL = 'https://oe-api.appspot.com/'

const instance = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com/'
    baseURL: BASE_URL
    // baseURL: 'http://192.168.1.11:8000/api/v1/'
    // baseURL: protocol + '//' + host + '/api/v1/'
    // baseURL: 'https://oviapp.herokuapp.com/api/v1/'
});

instance.interceptors.request.use(config => {
    // Do something before request is sent
    // console.log('INTECEPTOR')
    // console.log(config)
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;