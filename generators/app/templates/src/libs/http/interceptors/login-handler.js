/**
 * 当请求接口返回需要登录时，将当面页面重定向到登录代理页面
 * 登录完成后，代理页面会将链接跳到代理页面的 redirectUrl 参数传的链接 ，也就是登录态丢失时的页面链接
 */

export default (instance) => {
  // Add a login interceptor
  instance.interceptors.response.use((response) => {
    const responseUrl = response.request.responseURL;
    const loginReg = /\/login.html$/;

    if (loginReg.test(responseUrl)) { // 接口返回需要登录
      const hrefCur = window.location.href;
      window.location.href = `/modules/login/proxy.json?redirectUrl=${encodeURIComponent(hrefCur)}`;
    }

    return response;
  });
};
