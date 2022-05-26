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

router.beforeEach((to,from,next)=>{
    if(to.path == '/' || to.path == '/zuce'){
      next()
    }else{

        Vue.prototype.$http.get('/api/istoken').then((result) => {
          if(result.data.code == 200){
            next()
          }
        }).catch(() => {
          Vue.prototype.$message({type:"error",message:"你还未登录"})
          next('/')
        });

    }




})

export default router
