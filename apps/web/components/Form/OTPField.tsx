import { useInterval } from '@mantine/hooks'
import { useMutate } from '@pkg/hooks/useQuery'
import Field from '@web/components/Form/Field'
import { useEffect, useRef, useState } from 'react'

type Props = {
  name?: string
  user?: { code?: string; email?: string; mobile?: string; channel?: string }
  autoSubmit?: boolean
}

const codes = [1, 2, 3, 4, 5, 6]

export default function OTPField({ name = 'otp', user, autoSubmit }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <div>
      <Field<string> name={name}>
        {({ error, value = '', onBlur, setValue }) => (
          <div className='group relative'>
            <ul className='flex space-x-2 lg:space-x-4'>
              {codes.map((_, i) => (
                <li
                  key={i}
                  className={`flex-center inline-flex h-14 flex-1 ${error && 'ring-error'} ${(value.length === 6 ? i === 5 : value.length === i) && 'after:animate-blink after:h-0 after:w-[1px] group-focus-within:after:h-7'}`}
                  onClick={() => ref.current?.focus()}
                >
                  {value[i]}
                </li>
              ))}
            </ul>
            <input
              autoComplete='off'
              ref={ref}
              name={name}
              value={value}
              className='absolute inset-0 opacity-0'
              autoFocus
              onBlur={onBlur}
              onChange={e => {
                const value = e.target.value.replace(/\D/g, '')
                value.length <= codes.length && setValue(value)
                if (autoSubmit) value.length === codes.length && btnRef.current?.click()
              }}
            />
            {autoSubmit && <button ref={btnRef} type='submit' className='hidden' />}
          </div>
        )}
      </Field>
      {user && <RequestCode {...user} />}
    </div>
  )
}

const RequestCode = (user: Props['user']) => {
  const interval = useInterval(() => setSecond(s => s - 1), 1000)
  const [second, setSecond] = useState(30)
  const { mutate, isLoading } = useMutate<string>({ onSettled: () => setSecond(30) })

  const isZeroSecond = second === 0

  useEffect(() => {
    isZeroSecond && interval.stop()
  }, [isZeroSecond])

  return (
    <div className='mt-5'>
      {isZeroSecond ? (
        <button
          type='button'
          className={`${isLoading && 'cursor-progress'}`}
          onClick={() => !isLoading && mutate({ url: '/onboarding/request-sms-otp', payload: { ...user, isEmail: !!user?.email } })}
        >
          Resend code
        </button>
      ) : (
        <p>
          Request new code in <b>00:{second > 9 ? `${second}` : `0${second}`}</b>
        </p>
      )}
    </div>
  )
}
