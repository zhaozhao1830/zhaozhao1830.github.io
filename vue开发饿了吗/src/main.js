// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入vue-resource
import VueResource from 'vue-resource'

// 引入CSS样式
import "./common/stylus/index.styl"

// 1. 定义（路由）组件。
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'


Vue.config.productionTip = false;

//全局注册
Vue.use(VueRouter)
Vue.use(VueResource)


// 2.  定义路由
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller },
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes,
  linkActiveClass:"active"
})
// 4. 创建和挂载根实例。
const app = new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

router.replace('/goods')
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
