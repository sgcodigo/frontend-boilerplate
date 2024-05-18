import { tokenState } from '@pkg/states'
import request, { Request, Response, ResponseError } from '@pkg/utils/request'
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

type MutateOptions<TData> = UseMutationOptions<Response<TData>, ResponseError, Request, any> & {
  invalidateUrls?: string[]
}

export function useClient() {
  const [token, setToken] = useRecoilState(tokenState)

  return useCallback(
    <T = any>(url: string, config?: Request) => {
      return request<T>(url, { token, ...config })
        .then(res => res.data)
        .catch(err => {
          if (err?.response?.status === 401) setToken(undefined)
          return err
        })
    },
    [token],
  )
}

export function useFetch<TData extends any, TIncludeCode extends boolean = false>(
  url: string,
  $config?: Request & { key?: string; query?: {}; includeStatusCode?: TIncludeCode },
  options?: UseQueryOptions<
    TIncludeCode extends false ? TData : Response<TData>,
    ResponseError & { asdf: 'asdf' },
    TIncludeCode extends false ? TData : Response<TData>,
    any[]
  >,
) {
  const client = useClient()
  const { key, includeStatusCode = false, ...config } = { ...$config }

  return useQuery({
    queryKey: key ? [key, config.query] : [url, Object.values(config.payload || {})],
    queryFn: () => client(url, config).then(res => (includeStatusCode ? res : res.data)),
    ...options,
  })
}

export function useMutate<TData extends any>(options?: MutateOptions<TData>) {
  const client = useClient()
  const queryClient = useQueryClient()
  const defaultInvalidateUrls = options?.invalidateUrls || []

  const mutation = useMutation({
    mutationFn: ({ url = '', invalidateUrls = [], awaitInvalidateUrls = [], statusCodeHandling = true, ...config }) => {
      return client<TData>(url, { method: 'POST', ...config }).then(async res => {
        if (statusCodeHandling && res.code !== 0) return Promise.reject(res)
        const invalidates = [...invalidateUrls, ...defaultInvalidateUrls]
        for (const v of invalidates) {
          queryClient.invalidateQueries({ queryKey: [v] })
        }
        for (const v of awaitInvalidateUrls) {
          await queryClient.invalidateQueries({ queryKey: [v] })
        }
        return res
      })
    },
    ...options,
  })

  return mutation
}
