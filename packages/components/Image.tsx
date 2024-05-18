import { screens } from '@pkg/utils/consts'
import { cva, VariantProps } from 'class-variance-authority'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<NextImageProps, 'alt' | 'sizes'> & {
  alt?: string
  sizes?: { sm?: string; md?: string; lg?: string; xl?: string; '2xl'?: string }
}

const classes = cva('object-center object-cover transition duration-500', {
  variants: {
    state: {
      idle: 'opacity-0 blur-lg',
      error: '',
      success: 'opacity-100 blur-none',
    },
  },
})

export default function Image({ alt = '', sizes, className, ...rest }: Props) {
  const [state, setState] = useState<VariantProps<typeof classes>['state']>('idle')

  const $sizes = sizes
    ? Object.entries(sizes).reduce((str, [screen, width]) => {
        const $media = screens[screen as keyof typeof screens]
        return `(min-width: ${$media}px) ${width}, ${str}`
      }, '100vw')
    : undefined

  return (
    <NextImage
      {...rest}
      alt={alt}
      sizes={$sizes}
      className={classes({ state, className })}
      onError={() => setState('error')}
      onLoadingComplete={() => setState('success')}
    />
  )
}

export type { Props as ImageProps }
