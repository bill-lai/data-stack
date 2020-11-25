const store = {}

export default {
  removeItem(key) {
    delete store[key]
  },
  setItem(key, val) {
    store[key] = val
  },
  getItem(key) {
    return store[key]
  }
}