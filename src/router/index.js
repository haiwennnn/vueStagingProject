import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 第三方贷款公共部分
import ThirdLoanCommon from './third-loan/common'
// 第三方贷款获取额度
import ThirdLoanCalAmount from './third-loan/cal-amount'
// 第三方贷款提现
import ThirdLoanWithDrawCash from './third-loan/withdraw-cash'
// 第三方贷款还款
import ThirdLoanRepayRouter from './third-loan/repay'
// 第三方服务
import ThirdLoanServicesRouter from './third-loan/services'

const ThirdLoanEnter = r => require.ensure([], () => r(require('@/views/thirdLoanEnter.vue')), 'third')

// const Signature = r => require.ensure([], () => r(require('@/views/signature')), 'signature')

// const Signature1 = r => require.ensure([], () => r(require('@/views/signature/index1')), 'signature')

const Ui = r => require.ensure([], () => r(require('@/views/ui')), 'ui')

const TestPage = r => require.ensure([], () => r(require('@/views/third-loan/test')), 'repay')

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
      path: '/third-loan/test',
      name: 'test',
      component: TestPage
    },
    // {
    //   path: '/signature',
    //   name: 'signature',
    //   component: Signature
    // },
    // {
    //   path: '/auth/signature',
    //   name: 'authSignature1',
    //   component: Signature1
    // },
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
    ...ThirdLoanCommon,
    ...ThirdLoanCalAmount,
    ...ThirdLoanWithDrawCash,
    ...ThirdLoanRepayRouter,
    ...ThirdLoanServicesRouter
  ]
})
