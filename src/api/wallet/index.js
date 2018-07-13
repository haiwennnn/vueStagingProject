import Server from '@/api-server'
/**
 * 接口请求地址对象
 */
const urls = {

  walletTestEnter: Server.path.gw + 'wallet/datapush/getData',
  /**
   * 入口token验证
   * @param {String} token 上面接口返回的token
   * @param {String} mobileNum 手机号,
   * @param {String} fjChnlCode 渠道ID,
   * @param {String} sign 签名,
   * @param {String} timestamp 时间戳
   */
  walletEnterTokenValidator: Server.path.gw + 'wallet/datapush/h5TokenValidator',
  /**
   * 获取登录验证码
   * @param {String} mobileNo 手机号码
   */
  getSmsCode: Server.path.gw + 'wallet/datapush/h5SendSms',
  /**
   * 钱包登录接口
   * @param {String} mobileNum
   * @param {String} validCode
   * @param {String} fjChnlCode 商户号
   */
  walletLogin: Server.path.gw + 'wallet/datapush/login',
  /**
   * 获取云科贷登录信息
   * @param {String} mobileNum 需要查询的手机号
   * @return {String} data.fintechUmuserId 用户id
   * @return {String} data.token 用户token
   * @return {String} data.url 重定向url
   */
  getYkdData: Server.path.gw + 'wallet/authorize/getYkdData',
  /**
   * 获取用户状态节点
   * @method get
   * @return
   *  W01--未实名认证
   *  W02--个人资料未完成
   *  W03--运营商认证未完成
   *  W04--个人资料或者运营商认证成功--还未调决策
   *  W05--个人资料或者运营商认证成功--调决策未出额度
   *  W06--额度获取成功--等待提现
   *  W07--额度获取失败
   *  W09--人脸视别成功
   *  W10--等待放款
   *  W11--成功放款(进件成功)
   * }
   */
  walletQueryNode: Server.path.gw + 'wallet/node/queryNode',
  /**
   * 用户身份证识别
   * @param {Base64} imageContent (逗号分割后的数据)
   * @param {Number} ocrMode [1,2] ['正面','背面']
   */
  userIdCardOcr: Server.path.gw + 'wallet/quota/idNoOcrUniversal',
  /**
   * 完成实名认证
   * "identityCardNo": this.idCardInfo.id,
   * @param {String} realName
   * @param {String} address
   * @param {String} nation
   * @param {Number} sex [1,0] [女,男]
   * @param {String} authority '发证机关？'
   * @param {Date String} validityfrom 有效期开始时间
   * @param {Date String} validityto 有效期结束时间
   * @param {Base64} idcardimg1 正面照片
   * @param {Base64} idcardimg2 背面照片
   * @param {Base64} photo 头像照片(h5形式没有头像)
   * @param {String} userType 区分云科贷云展业？
   * @param {String} validCode 这是啥子！！！
   */
  addRealAuth: Server.path.gw + 'wallet/quota/addRealNameAuthentication',
  /**
   * 检测钱包用户资料是否录入完成
   */
  walletCheckDataComplete: Server.path.gw + 'wallet/quota/checkDataComplete',
  /**
   * 输入默写验证码开始魔蝎认证
   * @method post
   * @param {String} password 服务密码
   */
  walletMoxie: Server.path.gw + 'wallet/quota/moxie',
  /**
   * 魔蝎短信验证码验证(图形验证码呢？)
   */
  walletMoxieSMS: Server.path.gw + 'wallet/quota/moxieSMS',
  /**
   * 查询个人资料
   */
  walletQueryPersonalData: Server.path.gw + 'wallet/quota/queryPersonalData',
  /**
   * 保存个人资料
   */
  walletSavePersonalData: Server.path.gw + 'wallet/quota/savePersonalData',
  /**
   * 钱包申请决策1
   * 录入资料完成后点击下一步调用此接口
   * 此接口会产生运营商数据未获取成功需等待的情况，一旦调用成功接着调用决策接口2结果一定即时返回
   */
  // walletDecisionApplyEvent: Server.path.gw + 'wallet/decision/applyevent',
  walletDecisionApplyEvent: Server.path.gw + 'wallet/decision/bmapplyevent',
  // walletDecisionApplyEvent: 'http://10.0.11.77:8085/malldoor/' + 'wallet/decision/bmapplyevent',
  /**
   * 钱包申请决策2
   * 决策1调用成功后调用决策2
   * 决策审批事件
   */
  // walletDecisionApproveEvent: Server.path.gw + 'wallet/decision/kangaroojumpevent',
  walletDecisionApproveEvent: Server.path.gw + 'wallet/decision/bmkangaroojumpevent',
  // walletDecisionApproveEvent: 'http://10.0.11.77:8085/malldoor/' + 'wallet/decision/bmkangaroojumpevent',
  /**
   * 提现环节，绑卡后
   * 百米暂不需要调用
   */
  // walletDecisionTienocardevent: Server.path.gw + 'wallet/decision/tienocardevent',
  walletDecisionTienocardevent: Server.path.gw + 'wallet/decision/bmtienocardevent',

  /**
   * 提现环节
   * 在人脸识别之前调用？？？
   * 百米不需要调用
   */
  walletDecisionCashevent: Server.path.gw + 'wallet/decision/bmgetcashevent',

  /**
   * 当前获取的额度信息及额度获取状态
   * @return {String} data.loanLimit 额度
   * @return {String} data.status 2成功，1失败，-1未获取，0获取中
   */
  walletShowQuota: Server.path.gw + 'wallet/quota/showQuota',
  /**
   * 银行卡列表
   */
  walletBankcardList: Server.path.gw + 'wallet/withdraw/bankCard/infos',
  /**
   * 发起银行卡绑定，获取短信验证码
   */
  walletBindBandcardSms: Server.path.gw + 'wallet/withdraw/bank/preBindCard',
  /**
   * 绑定银行卡到用户上
   */
  walletBindBandcardSave: Server.path.gw + 'wallet/withdraw/bankCard/saveNew',

  /**
   * 获取期限列表
   */
  getTenorList: Server.path.gw + 'wallet/datapush/getTenorList',
  /**
   * 还款试算
   * @method post
   * @param {String} term 贷款期限
   * @param {String} loanMoney 贷款金额
   */
  walletTrial: Server.path.gw + 'wallet/withdraw/trial',
  /**
   * 确认借款接口
   * @param {String} receiveBankName 银行名称
   * @param {String} receiveAcct 银行卡号
   * @param {String} receiveAcctName 用户名
   * @param {String} applyMoney 贷款金额
   * @param {String} tenor 期数
   * @return {String} data.loanId
   */
  confirmLoan: Server.path.gw + 'wallet/datapush/confirmLoan',

  /**
   * 获取钱包提现信息
   */
  getWalletLoanInfo: Server.path.gw + 'wallet/datapush/getLoanInfo',
  /**
   * 签名接口
   */
  walletSignature: Server.path.gw + 'wallet/quota/client/signature',
  /**
   * 查询签名状态
   */
  findSignatureStatus: Server.path.gw + 'wallet/datapush/signature',

  /**
   * 获取人脸识别随机数
   * @param {} loanId
   * @return {} data.request_id 用于区分每一次请求的唯一的字符串
   * @return {} data.time_used 整个请求所花费的时间，单位为毫秒
   * @return {} data.biz_no 作为上传视频接口的传入参数
   * @return {} data.token_random_number 作为上传视频接口的传入参数
   * @return {} data.random_number 用于活体验证朗读时的四位随机数
   * @return {} data.error_message 当请求失败时才会返回此字符串
   */
  getFaceRandom: Server.path.gw + 'wallet/openview/getrandom',
  /**
   * 上传人脸识别视频
   * @param {} loanId
   * @param {} biz_no 获取随机数接口返回的参数
   * @param {} token_random_number 获取随机数接口返回的参数
   * @param {} video_content 视频base64码，控制在20m内
   * @return {} data.token_video 本字段仅调用成功才返回,作为查询结果传入参数
   * @return {} data.request_id 用于区分每一次请求的唯一的字符串
   * @return {} data.time_used 整个请求所花费的时间，单位为毫秒
   * @return {} data.biz_no 作为查询结果传入参数
   * @return {} data.error_message 当请求失败时才会返回此字符串
   */
  uploadFaceVideo: Server.path.gw + 'wallet/openview/upvideo',
  /**
   * 获取人脸识别结果
   * @param {} loanId
   * @param {} biz_no 上传视频接口返回的参数
   * @param {} token_video 上传视频接口返回的参数
   */
  getFaceResult: Server.path.gw + 'wallet/openview/getresult',

  /**
   * 提现设备反欺诈
   * 在提现之前调用
   */
  getCashAntiFraud: Server.path.gw + 'wallet/equipment/cashFacilityInformation',
  /**
   * 借款设备反欺诈
   * 借款之前？？
   */
  getLoanAntiFraud: Server.path.gw + 'wallet/equipment/loanFacilityInformationReport',
  /**
   * 设备反欺诈所有接口
   */
  getAllAntiFraud: Server.path.gw + 'wallet/equipment/allFacilityInformationReport'

}

export default urls
