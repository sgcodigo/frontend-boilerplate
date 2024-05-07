import { Banner, Popup, bannersState, popupsState } from '@pkg/states/layout'
import { customAlphabet } from 'nanoid'
import { setRecoil } from './recoil-portal'

type Id = string | number

// Generated id start with number are invalid to be a DOM element id
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz')

function filterByIdOrIndex(items: any[], indexOrId: Id) {
  return items.filter((_, i) => (typeof indexOrId === 'string' ? _.id !== indexOrId : i !== indexOrId))
}

export function showPopup(popup: Popup) {
  setRecoil(popupsState, popups => [...popups, { id: nanoid(), ...popup }])
}

export function hidePopup(indexOrId?: Id) {
  setRecoil(popupsState, popups => (!indexOrId ? [] : filterByIdOrIndex(popups, indexOrId)))
}

export function showBanner(banner: Banner, autoHide: boolean = true) {
  const id = banner.id || nanoid()

  setRecoil(bannersState, banners => {
    const isExist = banners.find(({ id }) => id === banner.id)
    return isExist ? banners : [...banners, { id, ...banner }]
  })

  setTimeout(() => {
    autoHide && hideBanner(id)
  }, 5000)
}

export function hideBanner(indexOrId?: Id) {
  setRecoil(bannersState, popups => (!indexOrId ? [] : filterByIdOrIndex(popups, indexOrId)))
}
