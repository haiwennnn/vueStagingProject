import Server from '@/api-server'

const urls = {

  /**
   * 获取ykdtoken
   * @method post
   * @param {String} ssjLoanId 第三方loanId
   */
  getToken: Server.path.ykdGw + 'third/getToken',

  /**
   * 提交签名数据
   * @param {String} pictureBase64 图片资源
   * @param {Array} trajectoryData 笔记轨迹
   * @param {String} type 区分不同签名场景
   */
  signature: Server.path.ykdGw + 'yzy/client/signature',
  /**
   * 获取合同列表
   * @param {String} type 查询合同类型
   */
  getContractList: Server.path.ykdGw + 'yzy/contract/list'
}

// /**
//  * 获取权限token
//  * @param {String} sId
//  */
// const getToken = (sId) => {
//   return Http.post(urls.getToken, {
//     ssjLoanId: sId
//   })
// }

// /**
//  * 提交签名数据
//  * @param {Object} params 上传参数 {
//  * @param {String} pictureBase64 图片资源
//  * @param {Array} trajectoryData 笔记轨迹
//  * @param {String} type 区分不同签名场景
//  * }
//  */
// const signature = (params) => {
//   return Http.post(urls.signature, params)
// }

export default urls
