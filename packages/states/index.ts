import { AtomEffect, atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const persistAtomEffect: AtomEffect<any> = param => {
  param.getPromise(isClientSideState).then(() => persistAtom(param))
}

export const tokenState = atom<string | undefined>({
  key: 'token',
  default: undefined,
  effects: [persistAtomEffect],
})

export const isClientSideState = atom({ key: 'client-side', default: false })
