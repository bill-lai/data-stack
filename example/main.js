import lastingStack from '../src/index'

let object = {}
lastingStack.installMode('aaa', {
  getItem(key) {
    return new Promise(r => {
      setTimeout(() => r(object[key]), 1000)
    })
  },
  setItem(key, val) {
    return object[key] = val
  },
  removeItem(key) {
    delete object[key]
  }
})


lastingStack.setMode('aaa')

const stack = lastingStack({name: 'aa', decode: decodeURI, encode: encodeURI}, true)

stack.load(() => {
  stack.get(0).then((r) => console.log(r))
})
