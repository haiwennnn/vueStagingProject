import Server from '@/api-server'

const urls = {
  /**
   * 上传图片资源
   * 图片上传统一处理到云科贷上面
   * 调用之前需要获取云科贷相关token
   * @method post
   * @param {Form} file 文件blob
   */
  uploadFile: Server.path.ykdGw + 'file/upload/ic'
}

export default urls
