const mainRouter = [
  {
    path:'/webchat',
    name:'webchat',
    component: () => import(/* webpackChunkName: "about" */ '@/components/navbar'),
    children  : [
      {
        path: 'chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "about" */ '@/components/chat')
      },
      {
        path: 'room',
        name: 'room',
        component: () => import(/* webpackChunkName: "about" */ '@/components/chat/wsTest.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '@/components/home')
      }
    ]
  },
];

export default mainRouter