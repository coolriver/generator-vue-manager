export default [{
  path: '/home',
  name: 'home',
  alias: '/',
  component: resolve => import('../views/home').then(resolve),
  meta: {
    title: '首页' // 网页标题
  }
}];
