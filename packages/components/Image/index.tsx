import { screens } from '@repo/utils/const'
import { cva, VariantProps } from 'class-variance-authority'
import $Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<ImageProps, 'fill' | 'alt' | 'sizes' | 'width' | 'height'> & {
  alt?: string
  sizes?: { sm?: string; md?: string; lg?: string; xl?: string; '2xl'?: string }
} & ({ fill: boolean; size?: never } | { fill?: never; size: number | [number, number] })

const classes = cva('object-center object-cover transition duration-500', {
  variants: { state: { idle: 'opacity-0 blur-lg', error: '', success: 'opacity-100 blur-none' } },
})

export default function Image({ alt = '', size, sizes, className, ...rest }: Props) {
  const [state, setState] = useState<VariantProps<typeof classes>['state']>('idle')

  const $sizes = sizes
    ? Object.entries(sizes).reduce((str, [screen, width]) => {
        const $media = screens[screen as keyof typeof screens]
        return `(min-width: ${$media}px) ${width}, ${str}`
      }, '100vw')
    : undefined

  const [width, height] = Array.isArray(size) ? size : [size, size]

  return (
    <$Image
      {...rest}
      alt={alt}
      sizes={$sizes}
      width={width}
      height={height}
      className={classes({ state, className })}
      onLoadingComplete={() => setState('success')}
    />
  )
}

export type { Props as ImageProps }
