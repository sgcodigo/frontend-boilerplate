import * as Dialog from '@radix-ui/react-dialog'
import { popupsState } from '@repo/states/layout'
import { hidePopup } from '@repo/utils/layout'
import ScrollArea from 'components/ScrollArea'
import { CloseIcon } from 'icons'
import { useRecoilValue } from 'recoil'

export default function Popup() {
  const popups = useRecoilValue(popupsState)

  return popups.map(({ id, children, className, onClose, ...rest }, index) => {
    const handleClose = () => hidePopup(id)
    return (
      <Dialog.Root modal={true} key={id} open={index + 1 === popups.length} onOpenChange={open => !open && handleClose()}>
        <div className='flex-center fixed inset-0 z-20 flex p-5  lg:p-10'>
          <Dialog.Overlay className='animate-in animate-y-0 animate-duration-150 absolute inset-0' />
          <Dialog.Content
            id={id}
            {...rest}
            forceMount
            className='animate-in animate-opacity-75 animate-duration-200 relative flex max-h-full justify-center overflow-hidden bg-white bg-left-bottom'
          >
            <CloseIcon
              className='z-5 absolute left-1.5 top-3 w-5 cursor-pointer lg:left-6 lg:top-6 lg:w-7'
              onClick={() => (onClose ? onClose() : handleClose())}
            />
            <ScrollArea className='max-h-full'>
              <div className={`w-full max-w-md p-6 pt-10 lg:p-14 ${className}`}>
                {children && (typeof children === 'function' ? children({ onClose: handleClose }) : children)}
              </div>
            </ScrollArea>
          </Dialog.Content>
        </div>
      </Dialog.Root>
    )
  })
}
