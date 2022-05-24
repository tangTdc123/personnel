import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import about from '../views/About.vue'
import zuce from '../views/zuce.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/zuce',
    name: 'zuce',
    component: zuce
  },
  {
    path: '/about',
    name: 'About',
    component: about
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
