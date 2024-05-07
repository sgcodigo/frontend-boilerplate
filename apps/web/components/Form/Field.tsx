import useField, { UseFieldReturn } from '@pkg/hooks/useField'
import Error from '@web/components/Form/Error'
import { cva, VariantProps } from 'class-variance-authority'
import { HTMLAttributes, ReactNode } from 'react'

type Props<T = string> = Omit<HTMLAttributes<HTMLDivElement>, 'prefix' | 'children' | 'onChange'> &
  VariantProps<typeof classes> & {
    name: string
    label?: string
    prefix?: (arg: UseFieldReturn<T>) => ReactNode
    postfix?: (arg: UseFieldReturn<T>) => ReactNode
    children: (field: UseFieldReturn<T>) => ReactNode
    placeholder?: string
    onChange?: (v: any) => void
  }

const classes = cva('text-base w-full h-12 lg:h-14 relative duration-150 ring-1 ring-inset', {
  variants: {
    state: {
      idle: '',
      error: '',
      disabled: 'cursor-not-allowed pointer-events-none',
    },
    variant: {
      contain: '',
      outline: '',
    },
  },
})

export default function Field<T>({ name, label, prefix, postfix, variant = 'outline', children, className, onChange, ...rest }: Props<T>) {
  const field = useField<T>(name, { onChange })
  const error = field.error?.trim()

  return (
    <fieldset className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className='mb-2 block text-sm'>
          {label}
        </label>
      )}
      <div {...rest} className={classes({ variant, state: rest.state ?? (error ? 'error' : 'idle') })}>
        {prefix && prefix(field)}
        {children(field)}
        {postfix && postfix(field)}
      </div>
      <Error msg={error} />
    </fieldset>
  )
}

export type { Props as FieldProps }
