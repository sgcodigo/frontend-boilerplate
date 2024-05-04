import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'
import useField from '@pkg/hooks/useField'
import { ComponentProps, FunctionComponent, createElement, useEffect, useRef, useState } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'
import { Portal } from 'renex'
import type { ButtonProps } from 'web/components/Button'

type Props<T extends TButton> = ComponentProps<T> & { button: T; portalId?: string; isTurnstile?: boolean }

type TButton = FunctionComponent<ButtonProps>

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

export default function Submit<T extends TButton>({ state, button, portalId, isTurnstile, onClick, ...props }: Props<T>) {
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

  const $button = (
    <>
      {createElement(button, {
        ...props,
        $ref: ref,
        type: 'submit',
        state: state || (isTurnstileLoading || isSubmitting ? 'loading' : !isValid ? 'disable' : 'idle'),
        onClick: e => {
          onClick && onClick(e)
          if (isTurnstile && !value) {
            setTurnstileLoading(true)
            e.preventDefault()
          }
        },
      })}
      {isTurnstile && <ReCaptcha />}
    </>
  )

  return portalId ? <Portal root={`#${portalId}`}>{$button}</Portal> : $button
}

export type { Props as SubmitProps }
