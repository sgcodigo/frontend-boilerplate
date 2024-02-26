// A simple workaround for accessing Recoil state outside of React components.
// Implementation is based on
// [https://github.com/facebookexperimental/Recoil/issues/289] and recoil-nexus.

import { RecoilValue, RecoilState, useRecoilCallback } from 'recoil'

type Portal = {
  get: <T>(atom: RecoilValue<T>) => T
  getPromise: <T>(atom: RecoilValue<T>) => Promise<T>
  set: <T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void
  reset: (atom: RecoilState<any>) => void
}

const throwUninitializedErr = () => {
  throw new Error('RecoilStatePortal is not initialized. Put RecoilStatePortal component inside the RecoilRoot.')
}

const portal: Portal = {
  get: throwUninitializedErr,
  getPromise: throwUninitializedErr,
  set: throwUninitializedErr,
  reset: throwUninitializedErr,
}

export default function RecoilStatePortal() {
  portal.get = useRecoilCallback<[atom: RecoilValue<any>], any>(
    ({ snapshot }) =>
      function <T>(atom: RecoilValue<T>) {
        return snapshot.getLoadable(atom).contents
      },
    [],
  )

  portal.getPromise = useRecoilCallback<[atom: RecoilValue<any>], Promise<any>>(
    ({ snapshot }) =>
      function <T>(atom: RecoilValue<T>) {
        return snapshot.getPromise(atom)
      },
    [],
  )

  portal.set = useRecoilCallback(({ transact_UNSTABLE }) => {
    return function <T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
      transact_UNSTABLE(({ set }) => {
        set(atom, valOrUpdater)
      })
    }
  }, [])

  portal.reset = useRecoilCallback(({ reset }) => reset, [])

  return null
}

export function getRecoil<T>(atom: RecoilValue<T>): T {
  return portal.get(atom)
}

export function getRecoilPromise<T>(atom: RecoilValue<T>): Promise<T> {
  return portal.getPromise(atom)
}

export function setRecoil<T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
  portal.set(atom, valOrUpdater)
}

export function resetRecoil(atom: RecoilState<any>) {
  portal.reset(atom)
}
