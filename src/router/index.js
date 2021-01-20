import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  routes: [{
    path: '/about',
    component: resolve => require(['@/components/system/about/index.vue'], resolve)
  },
  {
    path: '/home',
    component: resolve => require(['@/components/home/index.vue'], resolve)
  },
  {
    path: '/',
    component: resolve => require(['@/components/index.vue'], resolve)
  }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
