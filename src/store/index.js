import Vue from 'vue'
import Vuex from 'vuex'

import account from "./modules/account";
import permission from "./modules/permission";
import user from "./modules/user";
import webSocket from "./modules/webSocket";

Vue.use(Vuex);


// export default new Vuex.Store({
const store = new Vuex.Store({
  modules: {
    account,
    permission,
    user,
    webSocket
  },
  strict: true
});

export default store