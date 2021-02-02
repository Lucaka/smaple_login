// 測試用
import testRouter from './testRouter'
// 全部的route
import allRouter from '@/router/allRouter'
// login和沒有權限的route
import router, { DynamicRoutes } from '@/router'
// 判斷權限
import { recursionRouter } from '@/utils/recursionRouter'

const state = {
  permissionRouter: null
}

const mutations = {
  SET_PERMISSION(state, routes) {
    state.permissionRouter = routes
  },
  REMOVE_PERMISSION(state) {
    state.permissionRouter = null
  }
}


const actions = {
  queryPermission: function ({ commit }) {

    //查詢使用者權限
    let permissionList = testRouter
    // filter 權限
    let routes = recursionRouter(permissionList.data, allRouter)


    // DynamicRoutes.push(...routes)


    // eslint-disable-next-line no-console
    console.log('queryPermission', [...routes])

    // 動態增加router
    router.addRoutes(DynamicRoutes)
    router.addRoutes([...routes])

    // 完整權限的清單
    commit('SET_PERMISSION', routes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}