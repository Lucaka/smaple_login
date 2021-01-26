import Vue from 'vue'
import App from './App.vue'



import './assets/bootstrap'
import './assets/css/all.scss'

import { getRequest,postRequest,deleteRequest,putRequest } from './api/axios/request'
import { getToken,setToken,removeToken } from './api/cookiesex'

import router from './router'
import store from './store'

/////////// 全局引用
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

Vue.prototype.getToken = getToken;
Vue.prototype.setToken = setToken;
Vue.prototype.removeToken = removeToken;
///////////

Vue.config.productionTip = false;


const whiteList = ['/','/searchList'];

router.beforeEach((to, from, next) => {

  //是否為登入狀態
  if (!store.state.user.userToken) {
    //進入白名單(login)
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/'})
    }
  } else {
    //是否有權限清單
    if (!store.state.permission.permissionRouter) {
      // 查詢權限
      store.dispatch('permission/queryPermission').then(() => {
        next({path: to.path})
      })
    } else {
      next()
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
