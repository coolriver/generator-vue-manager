import Vue from 'vue';
import Router from 'vue-router';
import menuConf from '@/config/menu';
import hooks from './hooks';

const getRoutesFromConf = () => menuConf.list.reduce(
  (result, item) => result.concat(item.children ? item.children : [item]), []) // 提取children到外层数组
  .filter(item => item.routeLink && item.component)
  .map((item) => {
    const { routeLink, component, meta } = item;
    return {
      path: routeLink,
      meta,
      component,
    };
  }).concat([{
    path: '/',
    redirect: menuConf.indexRedirect,
  }]);

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return {
      x: 0,
      y: 0
    };
  },
  routes: getRoutesFromConf(),
});

// 添加导航钩子
hooks(router);

export default router;
