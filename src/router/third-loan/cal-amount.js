// 资料完善
const AddInfo = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/add-info')), 'third-loan-calculate-amount')
// 增加个人资料
const AddOperator = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/add-info/add-operator')), 'third-loan-calculate-amount')
// 运营商认证
const AddPersonalData = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/add-info/add-personal-data')), 'third-loan-calculate-amount')
// 贷款审批
const LoanAssess = r => require.ensure([], () => r(require('@/views/third-loan/calculate-amount/loan-assess')), 'third-loan-calculate-amount')

export default [
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
  }
]
