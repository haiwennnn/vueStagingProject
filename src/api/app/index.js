import Server from '@/api-server'

const urls = {

  /**
   * 获取ykd token
   * @method post
   * @param {String} ssjLoanId 第三方loanId
   */
  getToken: Server.path.ykdGw + 'third/getToken',
  /**
   * 获取返利网用户信息 by order_no
   * @path {String} order_no 用户订单号
   */
  getUserLoginInfo: Server.path.ykdGw + 'yunkd/fl/getToken/',
  /**
   * 提交签名数据
   * @param {String} pictureBase64 图片资源
   * @param {Array} trajectoryData 笔记轨迹
   * @param {String} type 区分不同签名场景
   */
  signature: Server.path.ykdGw + 'yzy/client/signature',
  /**
   * 获取合同列表
   * @method post
   * @param {String} type 查询合同类型
   */
  getContractList: Server.path.ykdGw + 'yzy/contract/list',
  /**
   * 成功签字后通知后端接口
   * @path (String) order_no 跳转过来时 传递的订单id
   */
  signSuccessCall: Server.path.ykdGw + 'yunkd/fl/callSignSuccess/',
  /**
   * 查询openId是否被绑定
   * @method post
   * @param {String} openId 微信openId
   */
  wxCheckBind: Server.path.ykdUm + 'weixin/checkBind',
  // wxCheckBind: 'http://10.0.11.90:8080/marvel-user-web/weixin/checkBind',

  /**
   * 微信绑定openId
   * @method post
   * @param {String} openId 微信openId
   * @param {String} mobileNum 手机号
   * @param {String} validCode 验证码
   */
  wxBind: Server.path.ykdUm + 'weixin/bindOpenId',
  // wxBind: 'http://10.0.11.90:8080/marvel-user-web/weixin/bindOpenId',
  /**
   * 微信绑定验证码获取
   * @method post
   * @param {String} mobileNo 手机号码
   */
  wxBindSmsSend: Server.path.ykdUm + 'public/sms/send'

}

export default urls
