import Http from '../../lib/http'
const urls = {
  getProducts: 'gateway/productClient'
}

const getProducts = () => {
  console.log(this)
  return Http.get(urls.getProducts)
}

export default {
  getProducts
}
