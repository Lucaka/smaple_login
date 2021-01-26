import { getToken,setToken,removeToken } from '../../api/cookiesex'

const state = {
  userToken: getToken('token') ? getToken('token') : null
}

const mutations = {
  USER_LOGIN(state) {
    setToken('token','HIHI')

    state.userToken = 'HIHI'
  },
  USER_LOGOUT(state) {
    removeToken('token')

    state.userToken = null
  }
};


const actions =  {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}