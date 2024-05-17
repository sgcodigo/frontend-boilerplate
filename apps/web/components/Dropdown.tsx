import { cookOptions } from '@pkg/utils'
import * as Select from '@radix-ui/react-select'

type Props = Select.SelectProps & {
  value: string
  options: Option[]
  className?: string
  onValueChange: (value: string) => void
}

export default function Dropdown({ value, options, className, onValueChange, ...rest }: Props) {
  const $options = cookOptions(options)
  const { label } = $options.find(option => option.value === value) || $options[0]

  return (
    <Select.Root {...rest} value={value} onValueChange={onValueChange}>
      <Select.Trigger className={`group inline-flex items-center ${className}`}>
        <span>{label}</span>
      </Select.Trigger>
      <Select.Content align='start' position='popper' className='animate-in animate-duration-150 z-10'>
        {$options.map(({ label, value }) => (
          <Select.Item key={value} value={value} className='cursor-pointer duration-150'>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
