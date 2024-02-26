import { HTMLAttributes, useEffect, useRef } from 'react'

/* For up-to-date props see https://docs.lottiefiles.com/dotlottie-player/properties */
type Props = HTMLAttributes<HTMLElement> & {
  src?: string
  mode?: 'bounce' | 'normal'
  loop?: boolean
  count?: number
  speed?: number
  hover?: boolean
  renderer?: string
  autoplay?: boolean
  controls?: boolean
  direction?: number
  background?: string
  intermission?: number
  onLoad?: EventListener
  onPlay?: EventListener
  onStop?: EventListener
  onLoop?: EventListener
  onFrame?: EventListener
  onPause?: EventListener
  onError?: EventListener
  onReady?: EventListener
  onFreeze?: EventListener
  onComplete?: EventListener
}

export default function DotLottie({
  loop = true,
  onLoad,
  onPlay,
  onStop,
  onLoop,
  onFrame,
  onPause,
  onError,
  onReady,
  onFreeze,
  onComplete,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const events = {
    load: onLoad,
    play: onPlay,
    stop: onStop,
    loop: onLoop,
    frame: onFrame,
    pause: onPause,
    error: onError,
    ready: onReady,
    freeze: onFreeze,
    complete: onComplete,
  }

  useEffect(() => {
    //@ts-ignore
    import('@dotlottie/player-component').then(() => {
      const lottie = ref.current
      if (lottie) {
        Object.entries(events).forEach(([name, handler]) => {
          handler && lottie.addEventListener(name, handler)
        })
      }
    })
  }, [])

  return <dotlottie-player ref={ref} loop={loop} {...rest} />
}

export type { Props as DotLottieProps }
