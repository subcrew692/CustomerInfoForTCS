import Vue from 'vue'
import Router from 'vue-router'
import CustomerInfo from '@/components/CustomerInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CustomerInfo',
      component: CustomerInfo
    }
  ]
})
