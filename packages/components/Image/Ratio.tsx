import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import Image from 'components/Image'
import { ImageProps } from 'next/image'

export default function RatioImage({ src, className, ...rest }: { src: ImageProps['src'] } & AspectRatio.AspectRatioProps) {
  return (
    <AspectRatio.Root {...rest} className={`relative ${className}`}>
      <Image src={src} fill priority />
    </AspectRatio.Root>
  )
}
