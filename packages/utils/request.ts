import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import { IncomingMessage } from 'http'
import qs from 'qs'

export type Request = AxiosRequestConfig & {
  req?: IncomingMessage
  type?: 'form' | 'csv' | 'multipart'
  token?: string
  payload?: any
  invalidateUrls?: string[]
  awaitInvalidateUrls?: string[]
  statusCodeHandling?: boolean
}

export type Response<T = any> = {
  data: T
  code: number
  message: string
}

export type ResponseError = {
  code: number
  data?: any
  message: string
}

export default function request<T = unknown>(url: string, config?: Request): AxiosPromise<Response<T>> {
  const formData = typeof window !== 'undefined' && new FormData()
  const { req, type, token, payload, method = 'GET', ...rest } = config || {}

  rest.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT

  const headers = rest.headers || {}

  if (token) {
    headers['Authorization'] = token ? 'Bearer ' + token : `${process.env.NEXT_PUBLIC_BASIC_AUTH_TOKEN}`
  }

  switch (type) {
    case 'multipart':
      headers['Content-Type'] = 'multipart/form-data'
      formData && Object.entries(payload).forEach(([name, value]) => formData.append(name, value as string))
      break
    case 'csv':
      headers['Accept'] = 'application/json'
      rest.responseType = 'blob'
      break

    case 'form':
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      break

    default:
      headers['Content-Type'] = 'application/json'
  }

  return axios({
    url,
    method,
    timeout: 50000,
    headers,
    [method !== 'GET' ? 'data' : 'params']: type === 'form' ? qs.stringify(payload) : type === 'multipart' ? formData : payload,
    ...rest,
  })
}
