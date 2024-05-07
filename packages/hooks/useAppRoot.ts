import { isClientSideState, tokenState } from '@pkg/states'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

type Options = {
  routes: { bare: string[]; guest: string[]; private: string[] }
}

export default function useAppRoot({ routes }: Options) {
  const token = useRecoilValue(tokenState)
  const router = useRouter()
  const [isClientSide, setClientSide] = useRecoilState(isClientSideState)

  useEffect(() => {
    setTimeout(() => {
      setClientSide(true)
    }, 100)
  }, [])

  useEffect(() => {
    if (isClientSide) {
      const restrictRoutes = routes[token ? 'guest' : 'private']
      setTimeout(() => {
        restrictRoutes.forEach(path => router.pathname.includes(path) && router.replace('/'))
      }, 0)
    }
  }, [token, router, isClientSide])

  return { isBareRoute: routes.bare.some(r => router.pathname.includes(r)) }
}
