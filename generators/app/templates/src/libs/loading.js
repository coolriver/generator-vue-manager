import Vue from 'vue';
import GlobalSpin from '@/components/global-spin';

let loadingCount = 0;
let timeoutId = null;

const newInstance = () => {
  const Instance = new Vue({
    data: {},
    render(h) {
      return h(GlobalSpin, {
        props: {}
      });
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const globalSpin = Instance.$children[0];

  return {
    show() {
      globalSpin.show();
    },
    close() {
      globalSpin.close();
    },
    component: globalSpin
  };
};

const spinGlobal = newInstance();

export default {
  show() {
    loadingCount++;
    if (loadingCount === 1) {

      timeoutId = setTimeout(() => {
        spinGlobal.show();
      }, 0); // 300毫秒数据未返回显示loading
    }
  },

  close() {
    clearTimeout(timeoutId);
    if (loadingCount >= 1) {
      loadingCount--;
    }

    if (loadingCount === 0) {
      // 异步处理，防止同步调用 show 和 close 问题
      setTimeout(() => {
        spinGlobal.close();
      }, 0);
    }
  }
};
