import axios from 'axios';
import { apiConf } from '@/config';
import showLoading from './interceptors/show-loading';
import errorHandler from './interceptors/error-handler';
import loginHandler from './interceptors/login-handler';

const instance = axios.create({
  timeout: apiConf.timeout
});

// 添加 showLoading 配置项
// 是否显示请求 loading
showLoading(instance);

// 添加 showDefaultError 配置项
// 是否默认错误处理
errorHandler(instance);

// 添加没有登录态时的登录操作
loginHandler(instance);


export default instance;
