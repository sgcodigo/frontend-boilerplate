import { cookOptions } from '@pkg/utils/index'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { cva, VariantProps } from 'class-variance-authority'
import ScrollArea from 'components/ScrollArea'

type Props = VariantProps<typeof list> & { options: Option[] } & (
    | (Omit<ToggleGroup.ToggleGroupSingleProps, 'type'> & { isMultiple?: false })
    | (Omit<ToggleGroup.ToggleGroupMultipleProps, 'type'> & { isMultiple: true })
  )

const list = cva('flex px-5', {
  variants: {
    size: {
      sm: 'space-x-0.5 lg:space-x-1',
      md: 'space-x-1.5 lg:space-x-2',
    },
    color: {
      default: '',
    },
  },
})

const item = cva('border border-current whitespace-nowrap rounded-full duration-150', {
  variants: {
    size: {
      sm: '',
      md: '',
    },
    color: {
      default: '',
    },
  },
})

export default function Chips({ size = 'md', color = 'default', options, isMultiple, className, ...rest }: Props) {
  const $options = cookOptions(options)

  return (
    <ScrollArea dir='horizontal' hideScrollbar className='-mx-5'>
      <ToggleGroup.Root {...(rest as object)} type={isMultiple ? 'multiple' : 'single'} className={list({ size, color, className })}>
        {$options.map(({ label, value }) => (
          <ToggleGroup.Item
            key={value}
            value={value}
            data-state={rest.onValueChange ? undefined : 'on'}
            className={item({ size, color, className: `${rest.onValueChange ? 'cursor-pointer' : 'pointer-events-none'}` })}
          >
            {label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </ScrollArea>
  )
}
