import Vue from 'vue'

var http = new Vue().http
console.log(http)
const urls = {
  getProducts: 'gateway/productClient'
}

const getProducts = () => {
  return http.get(urls.getProducts)
}

export default {
  getProducts
}
