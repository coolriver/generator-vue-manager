<template>
  <header class="app-header">
    <h1><%= projName %></h1>
    <div class="app-header-user">
      <span class="app-header-user-name">{{userInfo.name}}</span>
      <Icon class="app-header-user-arrow" type="arrow-down-b"></Icon>
      <div class="app-header-user-hover">
        <a href="/logout"><Icon type="log-out"></Icon>退出</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  props: ['userInfo'],
  data() {
    return {

    };
  }
};
</script>


<style lang="scss">
@import 'src/assets/scss/function';

body {
  padding-top: $headerHeight;
}

.app-header {
  height: $headerHeight;
  background: $colorHeaderBg;
  color: $white;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  min-width: $mainContemtMinWidth;

  h1 {
    line-height: $headerHeight;
    font-size: 32px;
    float: left;
    margin-left: 20px;
    // width: $asideWidth;
    text-align: center;
  }

  &-user {
    position: absolute;
    right: 50px;
    height: $headerHeight;
    line-height: $headerHeight;
    width: 130px;
    text-align: center;
    overflow: hidden;
    text-align: left;
    box-sizing: border-box;
    padding: 0 15px;

    &-name {
      display: inline-block;
      width: 75px;
      vertical-align: middle;
      @extend %ellipsis;
    }

    .ivu-icon {
      vertical-align: middle;
    }

    &:hover {
      background-color: $colorNavBg;
      height: $headerHeight * 2;

      .app-header-user-hover {
        display: block;
      }
    }

    &-hover {
      display: none;
      background-color: $colorNavBg;
      width: 100%;

      &:hover {
        display: block;
      }

      .ivu-icon {
        margin-right: 5px;
      }

      a {
        color: $white;
        padding: 10px;
        cursor: pointer;
      }
    }

    &-arrow {
      margin-left: 10px;
    }
  }
}
</style>
