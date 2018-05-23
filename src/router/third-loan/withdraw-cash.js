// 完成提现信息
const CompleteCashInfo = r => require.ensure([], () => r(require('@/views/third-loan/withdraw-cash/complete-cash-info')), 'third-loan-withdraw-cash')
// 人脸识别
const FaceIdentify = r => require.ensure([], () => r(require('@/views/third-loan/withdraw-cash/face-identify')), 'third-loan-withdraw-cash')
// 人脸识别成功后提现结果页面
const WithdrawCashSuccess = r => require.ensure([], () => r(require('@/views/third-loan/withdraw-cash/success')), 'third-loan-withdraw-cash')

export default [
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
