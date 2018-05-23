import Server from '@/api-server'
/**
 * 接口请求地址对象
 */
const urls = {
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
   * 获取用户状态节点
   */
  walletQueryNode: Server.path.gw + 'wallet/node/queryNode',
  /**
   * 用户身份证识别
   * @param {Base64} imageContent
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
   * 输入默写验证码开始默写认证
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
   * 当前获取的额度信息及额度获取状态
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
   * 还款试算
   */
  walletTrial: Server.path.gw + 'wallet/withdraw/trial'
}

export default urls
