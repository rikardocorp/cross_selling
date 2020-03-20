import axios from 'axios';

const protocol = window.location.protocol
const host = window.location.host
export const BASE_URL = 'https://piloto-druid-spsa.appspot.com/'
// export const BASE_URL = 'https://piloto-druid-spsa.appspot.com/v22/'
// export const BASE_VERSION = 'v22'
export const BASE_OECHSLE = 'https://www.oechsle.pe'
export const BASE_SERVER_API_2 = 'http://a0e40fb5.ngrok.io/'
// export const BASE_URL_FAST = 'https://piloto-druid-spsa.appspot.com/ver2/v11/'
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
    console.log('ERROR AXIOS')
    return Promise.reject(error);
});

export default instance;