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

// 获取额度
// 实名认证
const RealnameAuth = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/realname-auth')), 'third-loan-calculate-amount')
// 资料完善
const AddInfo = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/add-info')), 'third-loan-calculate-amount')
// 增加个人资料
const AddOperator = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/add-info/add-operator')), 'third-loan-calculate-amount')
// 运营商认证
const AddPersonalData = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/add-info/add-personal-data')), 'third-loan-calculate-amount')
// 贷款审批
const LoanAssess = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/loan-assess')), 'third-loan-calculate-amount')

// 提现
const CompleteCashInfo = r => require.ensure([], () => r(require('@/views/third-loan/withdraw-cash/complete-cash-info')), 'third-loan-withdraw-cash')
const FaceIdentify = r => require.ensure([], () => r(require('@/views/third-loan/withdraw-cash/face-identify')), 'third-loan-withdraw-cash')
const WithdrawCashSuccess = r => require.ensure([], () => r(require('@/views/third-loan/withdraw-cash/success')), 'third-loan-withdraw-cash')
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
    },
    {
      path: '/third-loan/calc/add-info',
      name: 'addInfo',
      component: AddInfo
    },
    {
      path: '/third-loan/calc/add-info/add-operator',
      name: 'addOperator',
      component: AddOperator
    },
    {
      path: '/third-loan/calc/add-info/add-personal-data',
      name: 'addPersonalData',
      component: AddPersonalData
    },
    {
      path: '/third-loan/calc/loan-assess',
      name: 'loanAssess',
      component: LoanAssess
    },
    {
      path: '/third-loan/withdraw-cash/complete-cash-info',
      name: 'completeCashInfo',
      component: CompleteCashInfo
    },
    {
      path: '/third-loan/withdraw-cash/face-identify',
      name: 'faceIdentify',
      component: FaceIdentify
    },
    {
      path: '/third-loan/withdraw-cash/success',
      name: 'withdrawCashSuccess',
      component: WithdrawCashSuccess
    }

  ]
})
