/**
 * 新的签字服务 返利网榕树
 */
const ThirdLoanEnter = r => require.ensure([], () => r(require('@/views/third-loan/services/third-loan-enter.vue')), 'services')
/**
 * 签字服务
 * @query {String} redirect 重定向地址
 */
const Signature = r => require.ensure([], () => r(require('@/views/third-loan/services/signature')), 'services')

const Protocol = r => require.ensure([], () => r(require('@/views/third-loan/services/protocol')), 'services')

const WxLogin = r => require.ensure([], () => r(require('@/views/third-loan/services/wx-login')), 'services')

const Framework = r => require.ensure([], () => r(require('@/views/third-loan/services/framework')), 'services')

export default [
  // {
  //   path: '/third-loan-enter',
  //   name: 'thirdLoanEnter',
  //   component: ThirdLoanEnter
  // },
  {
    path: '/third-loan/services/third-loan-enter',
    name: 'thirdLoanEnter1',
    component: ThirdLoanEnter
  },
  {
    path: '/third-loan/services/wx-login',
    name: 'wxLogin',
    component: WxLogin
  },
  {
    path: '/third-loan/services/signature',
    name: 'signature',
    component: Signature
  },
  {
    path: '/third-loan/services/protocol',
    name: 'protocol',
    component: Protocol
  },
  {
    path: '/third-loan/services/framework',
    name: 'framework',
    component: Framework
  }
]
