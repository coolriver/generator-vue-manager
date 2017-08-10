/**
 * 用户信息相关数据在这里管理
 */

import api from '@/api';
import * as types from '../mutation-types';

// initial state
const state = {
  detail: {}
};

const mutations = {
  [types.GET_USER_DETAIL](state, detail) {
    state.detail = detail;
  }
};

const actions = {
  getUserDetail({
    commit,
  }) {
    api.user.getDetail({}).then((data) => {
      commit(types.GET_USER_DETAIL, data);
    });
  }
};

export default {
  state,
  mutations,
  actions
};
