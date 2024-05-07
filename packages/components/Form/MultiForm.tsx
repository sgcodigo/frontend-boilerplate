import { createElement, Dispatch, HTMLAttributes, ReactHTML, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { FieldValues, NonUndefined, useFormContext } from 'react-hook-form'
import Form, { FormChildFunc, FormProps } from './Form'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  as?: keyof ReactHTML
  forms: (Omit<FormProps<any>, 'children' | 'onSuccess'> & {
    children: ReactNode | FormChildFunc<any, { step: number; setStep: SetStep }>
    autoIncrement?: boolean
    onSuccess?: (params: Parameters<NonUndefined<FormProps<any>['onSuccess']>>['0'] & { setStep: SetStep }) => void
  })[]
  children?: (arg: { step: number; values: any; setStep: SetStep }) => ReactNode
}

type SetStep = Dispatch<SetStateAction<number>>

type ErrorHandler = (v: Props['forms'][number]['onError']) => FormProps<any>['onError']

type SuccessHandler = (v: Props['forms'][number]['onSuccess'], autoIncrement?: boolean) => FormProps<any>['onSuccess']

const Listener = ({ step, children }: { step: number; children: ReactNode }) => {
  const { reset } = useFormContext()

  useEffect(() => {
    reset({}, { keepValues: true })
  }, [step])

  return <>{children}</>
}

export default function Multi({ as = 'div', forms, children, ...rest }: Props) {
  const [step, setStep] = useState<number>(1)
  const [values, setValues] = useState<FieldValues>({})

  const handleError: ErrorHandler = onError => {
    return ({ values: $values, ...rest }) => {
      onError && onError({ ...rest, values: { ...$values, ...values } })
    }
  }

  const handleSuccess: SuccessHandler = (onSuccess, autoIncrement) => {
    return ({ values: $values, ...rest }) => {
      const newValues = { ...values, ...$values }
      setValues(newValues)
      onSuccess && onSuccess({ values: $values, ...rest, setStep })
      autoIncrement && setStep(n => (forms.length === n ? n : n + 1))
    }
  }

  return createElement(
    as,
    rest,
    <>
      {children && children({ step, values, setStep })}
      {forms.map(({ children, className = '', transform, autoIncrement = true, onError, onSuccess, ...rest }, i) => {
        const isActive = step === i + 1
        return (
          <Form
            key={i}
            {...rest}
            className={`${!isActive && '!invisible !hidden'} ${className}`}
            onError={handleError(onError)}
            onSuccess={handleSuccess(onSuccess, autoIncrement)}
            transform={transform ? val => transform({ ...values, ...val }) : undefined} //Note: {...values,...val} order matters
          >
            {isActive ? (
              typeof children !== 'function' ? (
                <Listener step={step}>{children}</Listener>
              ) : (
                props => <Listener step={step}>{children({ step, ...props, values: { ...values, ...props.values }, setStep })}</Listener>
              )
            ) : null}
          </Form>
        )
      })}
    </>,
  )
}
