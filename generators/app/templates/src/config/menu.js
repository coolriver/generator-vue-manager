/**
 * 左侧菜单配置选项, vue router会根据此配置生成应对的路由配置
 *
 * 下面的常量是和路由的view相关的，因为菜单里需要配置对应的view，所以为了维护方便，把view相关的也放在这个配置文件中
 */

const General = resolve => require(['@/views/general'], resolve);
const Menu1 = resolve => require(['@/views/menu1'], resolve);
const Menu2 = resolve => require(['@/views/menu2'], resolve);

const menuConf = {
  indexRedirect: '/general',
  list: [
    {
      title: '总览',
      icon: 'android-globe',
      routeLink: '/general',
      component: General,
      meta: {
        title: 'NDM-总览',
      },
    },
    {
      title: '下拉菜单',
      icon: 'stats-bars',
      children: [
        {
          title: '功能子菜单1',
          routeLink: '/function/menu1',
          component: Menu1,
          meta: {
            title: '功能子菜单1'
          },
        },
        {
          title: '功能子菜单2',
          routeLink: '/function/menu2',
          component: Menu2,
          meta: {
            title: '功能子菜单2'
          },
        }
      ]
    }
  ]
};

export default menuConf;
