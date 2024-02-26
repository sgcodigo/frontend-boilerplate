// import { showBanner } from './layout'

export const cssvars = (vars: {}) => {
  return Object.entries(vars).reduce((vars, [name, value]) => {
    return value !== undefined ? { ...vars, [`--${name}`]: value } : vars
  }, {})
}

export const replaceTab = (url: string) => {
  return url.replace(/tab=[0-9]/g, '')
}

export const cookOptions = (options: Option[]) => {
  return options.map(option => (typeof option === 'string' ? { label: option, value: option } : option))
}

export const encodeQuery = (value: string) => value.toLowerCase().replaceAll(' ', '-')

export const removeHTMLTags = (str: string) => {
  const regex = /(<([^>]+)>)/gi
  return str.replace(regex, '').replace(/&nbsp;/g, ' ')
}

export const defaultErrorHandler = (portalId?: string) => (err: any) => {
  const message = err?.response?.data.message || err.data?.data?.message || err.data?.message || err?.message
  //   showBanner({ type: 'error', message, portalId })
}
