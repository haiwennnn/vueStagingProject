import Server from '@/api-server'
/**
 * 接口请求地址对象
 */
const urls = {
  /**
   * 获取登录验证码
   * @param {String} mobileNo 手机号码
   */
  getSmsCode: Server.path.gw + 'wallet/datapush/h5SendSms'
}

export default urls
