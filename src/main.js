import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/reset.styl'
import store from '@/store/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import * as cookie from '@/api/getcookie'
Vue.config.productionTip = false
Vue.use(iView)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    // store.state.token
    if (store.state.token || cookie.gettoken()) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    if (store.state.token || cookie.gettoken()) {
      if (to.fullPath === '/login' || to.fullPath === '/') {
        next({ path: 'home' })
      }
    } else {
      next()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
