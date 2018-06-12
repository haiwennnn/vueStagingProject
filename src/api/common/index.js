import Server from '@/api-server'

const urls = {
  /**
   * 上传图片资源
   * 图片上传统一处理到云科贷上面
   * 调用之前需要获取云科贷相关token
   * @method post
   * @param {Form} file 文件blob
   */
  uploadFile: Server.path.ykdGw + 'file/upload/ic',

  /**
   * 查询是否需要重新认证银行卡(获取协议号)
   * @method get
   * @path {String} 商户类型 [kaniu,wallet]
   */
  checkNeedReBindBankcard: Server.path.ykdGw + 'yzy/need/tiedCard/'
}

export default urls
