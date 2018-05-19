import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const ThirdLoanEnter = r => require.ensure([], () => r(require('@/views/thirdLoanEnter.vue')), 'third')

const Signature = r => require.ensure([], () => r(require('@/views/signature')), 'signature')

const Ui = r => require.ensure([], () => r(require('@/views/ui')), 'ui')

const RepayIndex = r => require.ensure([], () => r(require('@/views/repay')), 'repay')

const Form = r => require.ensure([], () => r(require('@/views/form')), 'form')

const ThirdLoan = r => require.ensure([], () => r(require('@/views/third-loan/enter.vue')), 'third-loan')

// 第三方贷款公共部分
const Login = r => require.ensure([], () => r(require('@/views/third-loan/common/login')), 'third-loan-common')
const Main = r => require.ensure([], () => r(require('@/views/third-loan/common/main')), 'third-loan-common')

// 计算额度
const RealnameAuth = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/realname-auth')), 'third-loan-calculate-amount')

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
    },
    {
      path: '/third-loan',
      name: 'thirdLoanEnter',
      component: ThirdLoan
    },
    {
      path: '/third-loan/enter',
      name: 'thirdLoanEnter',
      component: ThirdLoan
    },
    {
      path: '/third-loan/login',
      name: 'login',
      component: Login
    },
    {
      path: '/third-loan/main',
      name: 'main',
      component: Main
    },
    {
      path: '/third-loan/calc/realname-auth',
      name: 'realnameAuth',
      component: RealnameAuth
    }
  ]
})
