import { cookOptions } from '@pkg/utils'
import * as Select from '@radix-ui/react-select'

type Props = {
  value: string
  options: Option[]
  onChange: (value: string) => void
  className?: string
}
export default function Dropdown({ value, options, className, onChange }: Props) {
  const root = globalThis.document?.getElementById('app-root')
  const $options = cookOptions(options)
  const activeOption = $options.find(option => option.value === value)

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={`group inline-flex items-center ${className}`}>
        <span>{activeOption?.label}</span>
      </Select.Trigger>
      <Select.Portal container={root}>
        <Select.Content align='start' position='popper' className='animate-in animate-duration-150 z-10'>
          {$options.map(({ label, value }) => (
            <Select.Item key={value} value={value} className='cursor-pointer duration-150'>
              {label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
