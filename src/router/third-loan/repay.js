
// 第三方还款-主页
const ThirdRepayIndex = r => require.ensure([], () => r(require('@/views/third-loan/repay/index')), 'third-repay')
// 第三方还款-提前结清
const ThirdRepayAdvance = r => require.ensure([], () => r(require('@/views/third-loan/repay/advance')), 'third-repay')
// 第三方还款-借款记录
const ThirdRepayLoan = r => require.ensure([], () => r(require('@/views/third-loan/repay/loan')), 'third-repay')
// 第三方还款-还款记录
const ThirdRepayRepayment = r => require.ensure([], () => r(require('@/views/third-loan/repay/repayment')), 'third-repay')
// 第三方还款-本期明细
const ThirdRepayBill = r => require.ensure([], () => r(require('@/views/third-loan/repay/bill')), 'third-repay')
// 第三方还款-详情
const ThirdRepayDetail = r => require.ensure([], () => r(require('@/views/third-loan/repay/detail')), 'third-repay')
// 第三方还款-借据
const ThirdRepayAloan = r => require.ensure([], () => r(require('@/views/third-loan/repay/aloan')), 'third-repay')

export default [
  {
    path: '/third-loan/repay',
    name: 'thirdRepayIndex',
    component: ThirdRepayIndex
  },
  {
    path: '/third-loan/repay/advance',
    name: 'thirdRepayAdvance',
    component: ThirdRepayAdvance
  },
  {
    path: '/third-loan/repay/loan',
    name: 'thirdRepayLoan',
    component: ThirdRepayLoan
  },
  {
    path: '/third-loan/repay/repayment',
    name: 'thirdRepayRepayment',
    component: ThirdRepayRepayment
  },
  {
    path: '/third-loan/repay/bill',
    name: 'tthirdRepayBill',
    component: ThirdRepayBill
  },
  {
    path: '/third-loan/repay/detail',
    name: 'tthirdRepayDetail',
    component: ThirdRepayDetail
  },
  {
    path: '/third-loan/repay/aloan',
    name: 'thirdRepayAloan',
    component: ThirdRepayAloan
  }

]
