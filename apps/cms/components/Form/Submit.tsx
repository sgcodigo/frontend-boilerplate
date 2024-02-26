import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'
import useField from '@repo/hooks/useField'
import { useEffect, useRef, useState } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'
import { Portal } from 'renex'
import Button, { ButtonProps } from '../Button'

type Props = ButtonProps & { portalId?: string; isTurnstile?: boolean }

function ReCaptcha() {
  const ref = useRef<TurnstileInstance>(null)
  const { formState, setValue } = useFormContext()

  function reset() {
    ref.current?.reset()
    setValue('token', undefined)
  }

  useEffect(() => {
    reset()
    return () => reset()
  }, [formState.submitCount])

  return (
    <Turnstile
      ref={ref}
      options={{ size: 'invisible' }}
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_KEY as string}
      onSuccess={value => setValue('token', value)}
    />
  )
}

export default function Submit({ state, portalId, isTurnstile, onClick, ...props }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { value } = useField('token')
  const { isValid, isSubmitting } = useFormState()
  const [isTurnstileLoading, setTurnstileLoading] = useState(false)

  useEffect(() => {
    if (value && isTurnstileLoading) {
      setTurnstileLoading(false)
      setTimeout(() => ref.current?.click(), 0)
    }
  }, [value, isTurnstileLoading])

  const button = (
    <>
      <Button
        $ref={ref}
        {...props}
        type='submit'
        state={state || (isTurnstileLoading || isSubmitting ? 'loading' : !isValid ? 'disable' : 'idle')}
        onClick={e => {
          onClick && onClick(e)
          if (isTurnstile && !value) {
            setTurnstileLoading(true)
            e.preventDefault()
          }
        }}
      />
      {isTurnstile && <ReCaptcha />}
    </>
  )

  return portalId ? <Portal root={`#${portalId}`}>{button}</Portal> : button
}

export type { Props as SubmitProps }
