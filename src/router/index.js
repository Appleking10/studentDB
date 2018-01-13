import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import management from '@/components/management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path:'/mg/:msg',
      name: 'mg',
      component: management,
      props: true
    }
  ]
})
