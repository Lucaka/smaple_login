import Vue from 'vue'
import Vuex from 'vuex'

import permission from "./modules/permission";
import user from "./modules/user";

Vue.use(Vuex);


// export default new Vuex.Store({
const store = new Vuex.Store({
  modules: {
    permission,
    user
  },
  strict: true
});

export default store