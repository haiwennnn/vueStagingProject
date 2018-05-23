// 第三方贷款公共部分
const ThirdLoan = r => require.ensure([], () => r(require('@/views/third-loan/enter.vue')), 'third-loan-common')
const Login = r => require.ensure([], () => r(require('@/views/third-loan/common/login')), 'third-loan-common')
const Main = r => require.ensure([], () => r(require('@/views/third-loan/common/main')), 'third-loan-common')
// 实名认证
const RealnameAuth = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/realname-auth')), 'third-loan-common')

export default [
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
