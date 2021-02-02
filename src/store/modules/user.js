import { getToken, setToken, removeToken } from '../../api/cookiesex'

const state = {
  userToken: getToken('tokenID') ? getToken('tokenID') : null
}

const mutations = {
  USER_LOGIN(state, ID) {
    setToken('tokenID', ID);

    state.userToken = ID;
  },
  USER_LOGOUT(state) {
    removeToken('tokenID')

    state.userToken = null
    location.reload();
  }
};


const actions = {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}