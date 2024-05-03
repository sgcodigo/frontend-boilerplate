import Field, { FieldProps } from '@web/components/Form/Field'
import { HTMLInputTypeAttribute } from 'react'

type Props = Omit<FieldProps, 'children'> & { type?: HTMLInputTypeAttribute }

export default function Input({ name, type, placeholder, ...props }: Props) {
  return (
    <Field name={name} {...props}>
      {({ ref, value = '', onBlur, setValue }) => (
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          className='s-full px-5'
          placeholder={placeholder}
          onChange={e => setValue(e.target.value)}
        />
      )}
    </Field>
  )
}

export type InputProps = Props
