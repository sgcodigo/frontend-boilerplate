import { HTMLAttributes, ReactNode } from 'react'
import { atom } from 'recoil'

export type Popup = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  id?: string
  children?: ReactNode | ((args: { onClose: Function }) => ReactNode)
  onClose?: Function
}

export type Banner = HTMLAttributes<HTMLDivElement> & {
  type?: 'info' | 'error' | 'success'
  message: ReactNode
  portalId?: string
}

export const popupsState = atom<Popup[]>({
  key: 'POPUPS',
  default: [],
})

export const bannersState = atom<Banner[]>({
  key: 'BANNERS',
  default: [],
})
