<template>
  <aside class="app-aside">
    <Menu ref="menu" class="app-aside-nav" width="165px" theme="dark" accordion :active-name="openMenu" :open-names="curOpenMenu">
      <template v-for="(menu, index) in list">
        <Submenu :key="index" :name="`${index}`" v-if="menu.children">
          <template slot="title">
            <Icon :type="menu.icon"></Icon>{{menu.title}}
          </template>
          <router-link v-for="(item, subIndex) in menu.children" :key="subIndex" :to="item.routeLink">
            <Menu-item :name="item.routeLink">{{item.title}}</Menu-item>
          </router-link>
        </Submenu>
        <router-link :key="index" :to="menu.routeLink" v-else>
          <Menu-item :name="menu.routeLink">
            <Icon :type="menu.icon"></Icon>{{menu.title}}
          </Menu-item>
        </router-link>
      </template>
    </Menu>
  </aside>
</template>

<script>
import menuConf from '@/config/menu';

export default {
  name: 'nav-aside',
  data() {
    const { list } = menuConf;
    return {
      list,
      curOpenMenu: []
    };
  },
  computed: {
    openMenu() {
      return this.$route.path;
    },
  },
  watch: {
    ['$route'](newRoute) {
      console.log(newRoute);
      const { path } = newRoute;
      const { list } = this;
      let hasFound = false;

      // 根据当前路由，算出要展开menu哪个菜单
      for (let i = 0; i < list.length; i++) {
        const menu = list[i];

        // 一级菜单为当前路由，或者已经找到了二级菜单，直接结束搜索
        if (menu.routeLink === path || hasFound) {
          break;
        }

        if (menu.children) {
          // 遍历二级菜单
          for (var j = 0; j < menu.children.length; j++) {
            var item = menu.children[j];

            if (item.routeLink === path) {
              // 找到啦，就是这个子菜单，把它的父菜单作为open状态
              this.curOpenMenu[0] = `${i}`;

              setTimeout(() => { // 还要手动更新一下，这个组件参数也是蛋疼。。。
                this.$refs.menu.updateOpened();
              }, 0);

              hasFound = true;
              break;
            }
          }
        }
      }
    }
  }
};
</script>


<style lang="scss">
@import 'src/assets/scss/function';

.app-aside {
  position: absolute;
  left: 0;
  bottom: 0;
  top: $headerHeight;
  background-color: $colorNavBg;
  width: $asideWidth;
  color: $white;

  &-nav {
    background: none;
    border: none;
    border-radius: 0;
    margin-top: 15px;

    .ivu-collapse-item {
      .ivu-collapse-header {
        color: $white;
        padding-left: 0px;

        &>.ivu-icon {
          display: none;

          &.show {
            display: inline-block;
          }
        }
      }
    }

    .ivu-collapse-content {
      overflow: hidden;
      color: $white;
      padding: 0;
      background-color: $colorHeaderBg;

      &-box {
        padding: 0 0 0 10px;
      }
    }
  }

  &-title {
    font-size: 16px;
    display: inline-block;
    width: 100px;
  }

  &-icon {
    font-size: 16px;
    margin-right: 5px;
  }

  &-item {
    height: 38px;
    line-height: 38px;
    padding-left: 20px;
    color: $white;
    cursor: pointer;
    position: relative;
  }

  &-arrow {
    position: absolute;
    right: 15px;
    top: 12px;
  }

  .ivu-menu {
    background-color: $colorNavBg;
  }

  .ivu-menu-dark.ivu-menu-vertical {
    .ivu-menu-submenu-title {
      background-color: $colorNavBg;

      &:hover {
        background-color: $colorHeaderBg;
      }
    }

    .ivu-menu-item:hover {
      background-color: $colorHeaderBg;
    }
  }
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #fff;
  background: #2d8cf0;
  border: none;
}
</style>
