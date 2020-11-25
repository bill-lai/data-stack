
import { StackArgs } from './core/Stack'
import CookieStack from './storage/cookie'
import ObjectStack from './storage/object'
import { Storage, StorageStack, AyncStorage, AyncStorageStack } from './core/StorageStack'

let mode = 'session'

const MapStack = {
  cookie: CookieStack,
  local: localStorage,
  session: sessionStorage,
  object: ObjectStack,
}

const isExixtsMode = m => ~Object.keys(MapStack).indexOf(m)

const installMode = (name: string, storage: Storage | AyncStorage) => {
  if (isExixtsMode(name)) {
    throw `已存在${name}模式，无法附加`
  } else {
    MapStack[name] = storage
  }
}

const setMode = (m: string) => {
  if (isExixtsMode(m)) {
    mode = m
  } else {
    throw `没有${m}模式`
  }
}

export default function grendStack<T>(args: StackArgs<T>): StorageStack<T>;
export default function grendStack<T>(args: StackArgs<T>, isAsync: boolean): AyncStorageStack<T>;
export default function grendStack<T>(args: StackArgs<T>, isAsync?: boolean) {
  if (isAsync) {
    return new AyncStorageStack<T>({Storage: MapStack[mode], ...args})
  } else {
    return new StorageStack<T>({Storage: MapStack[mode], ...args})
  }
}

grendStack.setMode = setMode
grendStack.installMode = installMode