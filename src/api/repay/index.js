import Server from '@/api-server'

const urls = {
  /**
   * 获取还款信息
   * @method get
   */
  getRepaymentInfoNew: Server.path.ykdGw + 'clientRepayment/getRepaymentInfoNew',
  /**
   * 获取还款列表
   */
  getRecords: Server.path.ykdGw + 'clientRepayment/repay/record',
  /**
   * 获取借据
   * @method get
   * @path loanId
   */
  getIou: Server.path.ykdGw + 'queryDebt/',
  /**
   * 获取还款计划
   * @method get
   * @path loanId
   */
  getRepayPlan: Server.path.ykdGw + 'repay/plan/',
  /**
   * 获取借款记录
   * @method get
   */
  getBorrowList: Server.path.ykdGw + 'borrowList',
  /**
   * 获取本期还款明细
   * @method get
   * @query {String} contractId 合同id
   */
  getRepayBill: Server.path.ykdGw + 'clientRepayment/searchDetailData',
  /**
   * 获取银行卡列表
   * @method post
   * @param {String} loanId 业务Id
   */
  getBankcardList: Server.path.ykdGw + 'bankCard/infos',
  /**
   * 发起还款
   * @method post
   * 茫茫多的数据 TODO:接口详情
   * @param {String} type [A002还当期，A003提前结清，A005还下期]
   */
  triggerRepayment: Server.path.ykdGw + 'clientRepayment/repaymentNoMobile',

  /**
   * 识别银行卡H5接口
   * @method post
   * @param {Base64Str} base64File 图片base64(截取逗号后面的数据)
   */
  scanBankcardH5: Server.path.ykdGw + 'weixin/ajaxBankInfo',
  /**
   * 获取绑定银行卡验证码(新绑卡方式需绑定协议号协议号)
   * @method post
   * @param {String} loanId 业务Id
   * @param {String} bankCardNum 银行卡号
   * @param {String} bankCardType 银行卡类型 e.g:借记卡
   * @param {String} bankCode 银行编码 e.g:101
   * @param {String} bankName 银行名称 e.g:平安银行
   * @param {Base64Str} bankCardImg 正面图片base64
   * @param {Base64Str} bankCardImgVerso 背面图片base64
   * @param {String} mobileNum 用户手机号
   * @param {String} checkCode 信用卡背面3位数号码，此字段已废弃传空字符串
   * @param {String} expiredDate 过期时间，此字段已废弃传空字符串
   * @param {String} validCode 验证码
   */
  getBindBankcardSmsCode: Server.path.ykdGw + 'bank/preBindCard',
  /**
   * 保存银行卡(新绑卡方式需绑定协议号协议号)
   * @method post
   * 参数与获取验证码接口相同
   */
  saveBankcardNew: Server.path.ykdGw + 'bankCard/saveNew',

  /**
   * 根据获取到的ykd token获取用户信息
   */
  getUserInfo: Server.path.ykdGw + 'h5payment/getUserInfo'
}

export default urls
