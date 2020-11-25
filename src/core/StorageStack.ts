import Stack, { StackArgs } from './Stack'

export interface Storage {
  removeItem: (key: string) => void
  setItem: (key: string, val: any) => void,
  getItem: (key: string) => any
}

export interface StorageStackArgs<T> extends StackArgs<T> {
  Storage: Storage
}

export class StorageStack<T> extends Stack<T> {
  private Storage: Storage

  constructor (args: StorageStackArgs<T>) {
    const {name, encode, decode, Storage} = args
    super({name, encode, decode})
    this.Storage = Storage
    this.init()
  }
  
  protected init() {
    let length = this.Storage.getItem(this.length) as any
    if (!length) {
      this.Storage.setItem(this.length, '0')
    } else {
      this.cogradient(Number(length))
    }
  }

  protected setLength (i) {
    this.Storage.setItem(this.length, i)
    this.cogradient(i)
  }

  getData () {
    let dataStr = this.Storage.getItem(this.keys[this.keys.length - 1])
    return this.decode ? this.decode(dataStr) : dataStr
  }

  push(data) {
    let length = this.getLength()
    this.Storage.setItem(this.getKey(length), this.encode(data))
    this.setLength(length + 1)
    return data
  }

  pop () {
    let length = this.getLength()
    let data = this.get(length - 1)
    this.setLength(length - 1)
    this.Storage.removeItem(this.getKey(length - 1))
    return data
  }

  get (index) {
    let key = this.getKey(index)
    let dataStr = this.Storage.getItem(key)
    return this.decode ? this.decode(dataStr) : dataStr
  }

  clear() {
    this.setLength(0)
    this.keys.forEach(key => this.Storage.removeItem(key))
    this.keys = []
  }
}



export interface AyncStorage {
  removeItem: (key: string) => Promise<void>
  setItem: (key: string, val: any) => Promise<void>,
  getItem: (key: string) => Promise<any>
}

export interface AsyncStorageStackArgs<T> extends StackArgs<T> {
  Storage: AyncStorage
}


export class AyncStorageStack<T> extends Stack<T> {
  private Storage: AyncStorage
  private loadCbs: Array<Function>

  constructor (args: AsyncStorageStackArgs<T>) {
    const {name, encode, decode, Storage} = args
    super({name, encode, decode})
    this.Storage = Storage
    this.loadCbs = []
    this.init()
  }

  protected async init() {
    let length = await this.Storage.getItem(this.length) as any
    if (!length) {
      this.Storage.setItem(this.length, '0')
    } else {
      this.cogradient(Number(length))
    }

    while (this.loadCbs.length) {
      this.loadCbs.pop()()
    }
  }

  protected async setLength (i) {
    await this.Storage.setItem(this.length, i)
    this.cogradient(i)
  }

  load(cb: Function) {
    this.loadCbs.push(cb)
  }

  async getData () {
    let dataStr = await this.Storage.getItem(this.keys[this.keys.length - 1])
    return this.decode ? this.decode(dataStr) : dataStr
  }

  async push(data) {
    let length = this.getLength()
    await this.Storage.setItem(this.getKey(length), this.encode(data))
    await this.setLength(length + 1)
    return data
  }

  async pop () {
    let length = this.getLength()
    let data = await this.get(length - 1)
    await this.setLength(length - 1)
    await this.Storage.removeItem(this.getKey(length - 1))
    return data
  }

  async get (index) {
    let key = this.getKey(index)
    let dataStr = await this.Storage.getItem(key)
    return this.decode ? this.decode(dataStr) : dataStr
  }

  async clear() {
    await this.setLength(0)
    await Promise.all(
      this.keys.map(key => this.Storage.removeItem(key))
    )
    this.keys = []
  }
}