import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/components/login')
  },
  {
    path: '/searchList',
    name: 'searchList',
    component: () => import(/* webpackChunkName: "about" */ '@/components/searchList')
  }
]

export const DynamicRoutes = [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '@/components/error')
  },
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
