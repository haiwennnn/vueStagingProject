import Http from '../../lib/http'
const urls = {
  getProducts: 'gateway/productClient'
}

const getProducts = () => {
  return Http.get(urls.getProducts)
}

export default {
  getProducts
}
