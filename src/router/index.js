import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const ThirdLoanEnter = r => require.ensure([], () => r(require('@/views/thirdLoanEnter.vue')), 'third')

const Signature = r => require.ensure([], () => r(require('@/views/signature')), 'signature')

const Ui = r => require.ensure([], () => r(require('@/views/ui')), 'ui')

const RepayIndex = r => require.ensure([], () => r(require('@/views/repay')), 'repay')

const Form = r => require.ensure([], () => r(require('@/views/form')), 'form')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello-world',
      name: 'helloWorld',
      component: HelloWorld
    },
    {
      path: '/signature',
      name: 'signature',
      component: Signature
    },
    {
      path: '/ui',
      name: 'ui',
      component: Ui
    },
    {
      path: '/repay',
      name: 'repay',
      component: RepayIndex
    },
    {
      path: '/third-loan-enter',
      name: 'third-loan-enter',
      component: ThirdLoanEnter
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    }
  ]
})
