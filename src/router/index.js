import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const Signature = r => require.ensure([], () => r(require('@/views/signature')), 'signature')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signature',
      name: 'signature',
      component: Signature
    }
  ]
})
