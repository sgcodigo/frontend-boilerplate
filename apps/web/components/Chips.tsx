import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { cookOptions } from '@repo/utils/index'
import { cva, VariantProps } from 'class-variance-authority'
import ScrollArea from 'components/ScrollArea'

type Props = Omit<ToggleGroup.ToggleGroupSingleProps | ToggleGroup.ToggleGroupMultipleProps, 'type'> &
  VariantProps<typeof classes> & {
    items: (Option | boolean | undefined)[]
    multiple?: boolean
  }

const classes = cva('border border-current duration-150 whitespace-nowrap rounded-full uppercase', {
  variants: {
    size: {
      sm: '',
      md: '',
    },
    color: {
      primary: '',
    },
  },
})

export default function Chips({ size = 'md', color = 'primary', items, multiple, className, onValueChange, ...rest }: Props) {
  const props = onValueChange ? {} : { 'data-state': 'on' }
  const filteredItems = items.filter(item => !!item) as Option[]

  return (
    <ScrollArea dir='horizontal' hideScrollbar className='-mx-5'>
      <ToggleGroup.Root
        {...(rest as object)}
        type={multiple ? 'multiple' : 'single'}
        className={`flex px-5 ${size === 'sm' ? 'space-x-0.5 lg:space-x-1' : 'space-x-1.5 lg:space-x-2'} ${className}`}
        onValueChange={(value: string & string[]) => value && onValueChange?.(value)}
      >
        {cookOptions(filteredItems)
          .filter(Boolean)
          .map(({ label, value }) => (
            <ToggleGroup.Item
              {...props}
              key={value}
              value={value}
              className={classes({ size, color, className: `${onValueChange ? 'cursor-pointer' : 'pointer-events-none'}` })}
            >
              {label}
            </ToggleGroup.Item>
          ))}
      </ToggleGroup.Root>
    </ScrollArea>
  )
}
