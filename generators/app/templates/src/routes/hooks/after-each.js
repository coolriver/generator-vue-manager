export default {
  /**
   * 改变title标题
   * @param  {[type]} route [description]
   * @return {[type]}       [description]
   */
  replaceDocTitle(route) {
    const {
      title
    } = route.meta;

    if (title) {
      document.title = title;
    }
  },
};
