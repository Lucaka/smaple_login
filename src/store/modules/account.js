// eslint-disable-next-line no-unused-vars
import { getRequest, postRequest, deleteRequest, putRequest } from '../../api/axios/request'

const state = {
  permissionRouter: null
}

const mutations = {
  SET_PERMISSION(state, routes) {
    state.permissionRouter = routes
  },
}

const actions = {
  login: function ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      postRequest('/api/login/loginAccount', userInfo)
        .then(res => {
          if (res.data.length > 0) {
            //登入成功
            commit('user/USER_LOGIN', userInfo.account, { root: true });
            resolve(userInfo.account);
          } else {
            //登入失敗
            // 拋出Error code
            reject('100001');
          }
        })
    });
  },
  create: function (userInfo) {
    return new Promise((resolve, reject) => {
      this.postRequest('/api/login/createAccount', userInfo)
        .then((response) => {
          resolve(response);
        })
        .catch(() => {
          reject('100002')
        });
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}