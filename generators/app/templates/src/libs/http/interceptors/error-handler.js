import { Message } from 'iview';

export default (instance) => {
  // Add a response interceptor
  instance.interceptors.response.use(response => response, (error) => {
    // Do something with response error
    let content = '';
    if (error.response) {
      content = error.response.data && error.response.data.msg;
    } else {
      content = error.message;
    }

    content = content || '请求出错, 请稍后重试';

    Message.error({
      content,
      duration: 3
    });

    return Promise.reject(error);
  });
};
