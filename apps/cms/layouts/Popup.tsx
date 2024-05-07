import { popupsState } from '@pkg/states/layout'
import { hidePopup } from '@pkg/utils/layout'
import { useRecoilValue } from 'recoil'

export default function Popup() {
  const popups = useRecoilValue(popupsState)

  return popups.map(({ id, children, className, onClose, ...rest }, index) => {
    const handleClose = () => hidePopup(id)
    return ''
  })
}
