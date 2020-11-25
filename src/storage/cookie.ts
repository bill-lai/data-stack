const Cookie = require('js-cookie')

export default {
  removeItem(key) {
    Cookie.remove(key);
  },
  setItem(key, val) {
    Cookie.set(key, val)
  },
  getItem(key) {
    return Cookie.get(key)
  }
}