import Http from '../../lib/http'

/**
 * 接口请求地址对象
 */
const urls = {
  getToken: 'gateway/third/getToken',
  getProducts: 'gateway/productClient',
  signature: 'gateway/yzy/client/signature'
}

/**
 * 获取权限token
 * @param {String} sId
 */
const getToken = (sId) => {
  return Http.post(urls.getToken, {
    ssjLoanId: sId
  })
}

/**
 * 提交签名数据
 * @param {Object} params 上传参数 {
 *   @param {String} pictureBase64 图片资源
 *   @param {Array} trajectoryData 笔记轨迹
 *   @param {String} type 区分不同签名场景
 * }
 */
const signature = (params) => {
  return Http.post(urls.signature, params)
}

const getProducts = () => {
  return Http.get(urls.getProducts)
}

export default {
  getToken,
  getProducts,
  signature
}
