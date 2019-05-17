import Vue from 'vue'
import Router from 'vue-router'
import CustomerInfo from '@/components/CustomerInfo'
import CustomerInfoMobile from '@/components/CustomerInfoMobile'
import AssistantSalary from '@/components/AssistantSalary'
import index from '@/components/index'
import CustomerAppointment from '@/components/CustomerAppointment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/customerInfo',
      name: 'CustomerInfo',
      component: CustomerInfo
    },
    {
      path: '/mobile/',
      name: 'CustomerInfoMobile',
      component: CustomerInfoMobile
    },
    {
      path: '/assistantSalary',
      name: 'AssistantSalary',
      component: AssistantSalary
    },
    {
      path: '/customerAppointment',
      name: 'CustomerAppointment',
      component: CustomerAppointment
    }
  ]
})
