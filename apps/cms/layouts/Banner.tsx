import { useElementSize } from '@mantine/hooks'
import { bannersState, popupsState } from '@pkg/states/layout'
import { cva } from 'class-variance-authority'
import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'
import { Portal } from 'renex'

const classes = cva('text-center inset-x-0 top-0 animate-in animate-opacity-100 animate-y-0', {
  variants: {
    type: {
      info: '',
      error: '',
      success: '',
    },
  },
})

export default function Banner() {
  const popups = useRecoilValue(popupsState)
  const banners = useRecoilValue(bannersState)
  const { ref, height } = useElementSize()

  const lastPopupId = popups[popups.length - 1]?.id

  useEffect(() => {
    document.body.style.setProperty('--banner-height', `${height / 16}rem`)
  }, [height, banners])

  return (
    <div id='banner-center' ref={ref} className='z-5 relative divide-y divide-white/25'>
      {banners.map(({ type = 'error', portalId, message, className, ...rest }, index) => {
        return (
          <Portal
            {...rest}
            as='div'
            key={index}
            root={`#${portalId || lastPopupId}`}
            fallback
            className={classes({ type, className: `${className} ${lastPopupId && 'absolute z-10'}` })}
          >
            {message}
          </Portal>
        )
      })}
    </div>
  )
}
