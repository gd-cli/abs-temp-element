import axios from 'axios';

const BASE_URL = process.env.NODE_ENV !== 'production' ? '/' : '/'; // 请求路径
const TIMEOUT = 3000; // 超时时间
class HttpRequest {
  constructor() {
    this.baseUrl = BASE_URL;
    this.timeout = TIMEOUT;
  }

  setInterceptors(instance) {
    instance.interceptors.request.use((config) => {
      console.log('请求拦截');
      return config;
    }, err => Promise.reject(err));
    instance.interceptors.response.use((res) => {
      console.log('请求拦截');
      return res;
    }, err => Promise.reject(err));
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseUrl: this.baseUrl,
      timeout: this.timeout,
    };
    this.setInterceptors(instance, options.url);
    return instance(config);
  }
}
export default new HttpRequest();
