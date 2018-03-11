import Http from '../../lib/http'
const urls = {
  getProducts: 'gateway1/productClient'
}

const getChinaRegion = () => {
  return Http.get(urls.getProducts)
}

export default {
  getChinaRegion
}
