// 第三方贷款公共部分
const ThirdLoan = r => require.ensure([], () => r(require('@/views/third-loan/enter.vue')), 'third-loan-common')
const Login = r => require.ensure([], () => r(require('@/views/third-loan/common/login')), 'third-loan-common')
const Main = r => require.ensure([], () => r(require('@/views/third-loan/common/main')), 'third-loan-common')
// 实名认证
const RealnameAuth = r => require.ensure([], () => r(require('@/views/third-loan/common/realname-auth')), 'third-loan-common-real-auth')

const BindBankcard = r => require.ensure([], () => r(require('@/views/third-loan/common/bankcard/bind-bankcard')), 'third-loan-common-bankcard')

const RebindBankcard = r => require.ensure([], () => r(require('@/views/third-loan/common/bankcard/rebind-bankcard')), 'third-loan-common-bankcard')

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
    path: '/third-loan/realname-auth',
    name: 'realnameAuth',
    component: RealnameAuth
  },
  {
    path: '/third-loan/bankcard/bind-bankcard',
    name: 'bindBankcard',
    component: BindBankcard
  },
  {
    path: '/third-loan/bankcard/rebind-bankcard',
    name: 'rebindBankcard',
    component: RebindBankcard
  }
]
