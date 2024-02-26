import Hls from 'hls.js'
import { MediaHTMLAttributes, useEffect, useRef } from 'react'

type Props = MediaHTMLAttributes<HTMLVideoElement> & {
  src: string
}

export default function Video({ src, className, ...rest }: Props) {
  const hls = useRef<Hls | null>(null)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current

    if (video) {
      if (Hls.isSupported()) {
        hls.current = new Hls()
        hls.current.loadSource(src)
        hls.current.attachMedia(video)
        hls.current.on(Hls.Events.MANIFEST_PARSED, () => video.play())
      } else {
        video.setAttribute('src', src.replace('.m3u8', '.mp4'))
        video.play() // Having autoplay isn't enough for android mobile
      }
    }
  }, [])

  return <video ref={ref} {...rest} loop muted autoPlay className={`s-full object-cover ${className}`} />
}
