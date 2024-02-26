import Field, { FieldProps } from '@repo/components/Field'
import { cookOptions } from '@repo/utils'
import { useId } from 'react'
import ReactSelect, { GroupBase, Props as ReactSelectProps, StylesConfig } from 'react-select'

type Props = Omit<FieldProps, 'children'> & {
  options: Option[]
  multiple?: boolean
  color?: string
  transform?: (val: any) => Option
  components?: Omit<ReactSelectProps['components'], 'DropdownIndicator'>
  customStyle?: StylesConfig<any, boolean, GroupBase<any>> | undefined
}

export default function Select({ name, color, options, multiple, components, placeholder, transform = val => val, customStyle, ...props }: Props) {
  const id = useId()
  const $options = cookOptions(options)

  return (
    <Field name={name} {...props}>
      {({ value = '', onBlur, setValue }) => {
        return (
          <ReactSelect
            instanceId={id}
            styles={customStyle}
            value={transform($options.filter(option => option.value === value))}
            options={$options}
            isMulti={multiple}
            className='!s-full'
            components={{
              ...components,
              DropdownIndicator: props => (
                <svg width='18' viewBox='0 0 18 18' fill='none'>
                  <path d='M4.5 6.75L9 11.25L13.5 6.75' stroke={color ?? '#2E353D'} strokeWidth='2' />
                </svg>
              ),
            }}
            placeholder={placeholder}
            classNamePrefix='react-select'
            onBlur={onBlur}
            onChange={(option: any) => {
              !multiple ? setValue(option.value) : setValue(option?.length > 0 ? option?.map((option: any) => option.value) : undefined)
              props.onChange && props.onChange(option)
            }}
          />
        )
      }}
    </Field>
  )
}
