/**
 * 服务器地址
 */

const servers = {
  put: {
    app: 'https://app.chinacreditech.com/app/customer/',
    base: 'https://app.chinacreditech.com/',
    um: 'um/',
    attachment: 'gateway/',
    gw: 'gateway/'
  },
  uat: {
    app: 'https://test-app.chinacreditech.com/app/customer/',
    base: 'https://test-app.chinacreditech.com/',
    um: 'um/',
    attachment: 'gateway/',
    gw: 'gateway/'
  }
}

const get = (platform) => {
  return servers[platform]
}

export default {
  get
}
