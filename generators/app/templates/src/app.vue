<template>
  <div id="app" v-if="isUserInfoLoaded">
    <app-header :userInfo="userInfo"></app-header>
    <nav-aside></nav-aside>
    <div class="app-page">
      <div class="app-page-cnt">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header';
import NavAside from '@/components/nav-aside';
import api from '@/api';

export default {
  name: 'app',
  data() {
    return {
      isUserInfoLoaded: false,
      userInfo: {},
    };
  },
  created() {
    api.user.getDetail({})
      .then((data) => {
        this.userInfo = data;
        this.isUserInfoLoaded = true;
      })
  },
  computed: {
    isShowBack() {
      const {
        name
      } = this.$route;
      return name !== 'home';
    },

    title() {
      const route = this.$route;

      return (route.meta && route.meta.title) || '';
    }
  },

  components: {
    'app-header': Header,
    'nav-aside': NavAside,
  }
};

</script>
<style lang="scss">
@import './assets/scss/function';
@import './assets/scss/partials/reset';
@import './assets/scss/partials/common';

body {
  min-width: $mainContemtMinWidth;
}

.app-page {
  &-cnt {
    position: absolute;
    left: $asideWidth;
    top: $headerHeight;
    bottom: 0;
    right: 0;
    min-width: $mainContemtMinWidth - $asideWidth;
    box-sizing: border-box;
    overflow: auto;
  }
}

.ivu-page {
  text-align: center;
  margin-top: 15px;
}

.search-op {
  position: relative;
  margin-bottom: 15px;

  .ivu-input-group-append .ivu-btn-primary {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
    border-radius: 0 4px 4px 0;
  }
}
</style>
