import { generateUUID } from '../util'

interface encode<T> { (data: T): any }
interface decode<T> { (data: any): T }

export interface StackArgs<T> {
  name?: string,
  encode?: encode<T>
  decode?: decode<T>
}

abstract class Stack<T> {
  protected length: string
  protected name: string
  protected keys: Array<string>
  protected encode: encode<T>
  protected decode: decode<T>

  constructor (args: StackArgs<T>) {
    const {name = generateUUID(), encode, decode} = args
    this.encode = encode
    this.decode = decode
    this.name = name
    this.length = name + '__length'
    this.keys = []
  }

  protected abstract init()
  protected abstract setLength(i: number)
  abstract getData()
  abstract push(data: T)
  abstract pop()
  abstract get(index: number)
  abstract clear()
  
  protected cogradient(length: number) {
    this.keys = []
    for (let i = 0; i < length; i++) {
      this.keys.push(this.getKey(i))
    }
  }
  
  protected getKey(index) {
    return this.name + '__' + index
  }

  getLength () {
    return this.keys.length
  }
}

export default Stack