import Vue from 'vue'
import Router from 'vue-router'
import CustomerInfo from '@/components/CustomerInfo'
import CustomerInfoMobile from '@/components/CustomerInfoMobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CustomerInfo',
      component: CustomerInfo
    },
    {
      path: '/mobile/',
      name: 'CustomerInfoMobile',
      component: CustomerInfoMobile
    }
  ]
})
