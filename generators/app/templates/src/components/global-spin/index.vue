<template>
  <Spin v-show="isShow" fix class="global-spin">
    <Icon type="load-a" size=26 class="demo-spin-icon-load"></Icon>
    <div>Loading</div>
  </Spin>
</template>

<script>
import { Spin, Icon } from 'iview';

export default {
  name: 'global-spin',
  data() {
    return {
      isShow: false
    };
  },
  components: {
    Spin,
    Icon
  },
  methods: {
    show() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    }
  }
};
</script>

<style lang="scss">
@import 'src/assets/scss/function';

$globalSpinWidth: 70px;
$globalSpinHeight: 62px;

.demo-spin-icon-load {
  animation: ani-demo-spin 1.5s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.global-spin {
  background: none;
  left: 50%;
  right: auto;
  top: 50%;
  bottom: auto;
  display: block;
  margin-left: - $globalSpinWidth / 2;
  margin-top: - $globalSpinHeight / 2px;
  width: auto;
  height: auto;

  .ivu-spin-text {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 6px 10px;
    border-radius: 8px;
  }
}
</style>

