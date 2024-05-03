import type { FieldProps } from '@web/components/Form/Field'
import { ComponentProps, createElement, FunctionComponent, JSXElementConstructor } from 'react'
import Submit, { SubmitProps } from './Submit'

type Props<T> = { field: T; submit: SubmitProps }

export default function SubmitField<T extends JSXElementConstructor<T>>({ field, submit, ...rest }: Props<T> & ComponentProps<T>) {
  return createElement<{ postfix: FieldProps['postfix'] }>(field as FunctionComponent, {
    variant: 'contain',
    postfix: ({ value, error }) => <Submit {...submit} state={error ? 'error' : !value ? 'disable' : undefined} width='inline' />,
    ...rest,
  })
}
