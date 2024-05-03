import { cookOptions } from '@pkg/utils'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { VariantProps, cva } from 'class-variance-authority'
import { useRouter } from 'next/router'
import { Fragment, HTMLAttributes, ReactNode, useState } from 'react'
import Dropdown from './Dropdown'
import ScrollArea from './ScrollArea'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  VariantProps<typeof item> & {
    name?: string
    options: Option[]
    panels?: ReactNode[]
    shallow?: boolean
    $default?: string
    children?: (value: string) => ReactNode
    syncRoute?: boolean
    responsive?: boolean
    removeQueriesOnChange?: string[]
  }

const list = cva('', {
  variants: {
    color: {
      primary: '',
    },
    variant: {},
  },
})

const item = cva('flex-shrink-0 duration-150', {
  variants: {
    color: {
      primary: '',
    },
    variant: {},
  },
})

export default function Tab({
  name = 'tab',
  color = 'primary',
  panels,
  options,
  shallow = true,
  variant,
  $default,
  children,
  className,
  syncRoute = true,
  responsive = true,
  removeQueriesOnChange = [],
  ...rest
}: Props) {
  const router = useRouter()
  const [value, setValue] = useState('')

  const $options = cookOptions(options)
  const { query } = router
  const queryValue = query[name] as string
  const $value = (syncRoute ? queryValue : value) || $default || $options[0]?.value || ''
  const activeIndex = $options.findIndex(option => option.value === $value)

  const handleChange = (value: string) => {
    if (syncRoute) {
      removeQueriesOnChange.forEach(element => delete query[element])
      router.push({ query: { ...query, ...(value ? { [name]: value } : undefined) } }, undefined, { shallow })
    } else {
      setValue(value)
    }
  }

  return (
    <Fragment>
      <div {...rest} className={`group font-serif [&_*]:uppercase ${className}`}>
        <ScrollArea dir='horizontal' className={`-mx-5 ${responsive && 'max-lg:hidden'}`}>
          <RadioGroup.Root value={$value} className={list({ variant })} onValueChange={handleChange}>
            {$options.map(({ label, value }) => (
              <RadioGroup.Item key={value} value={value} className={item({ color, variant })}>
                {label}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </ScrollArea>
        <Dropdown value={$value} options={$options} onChange={handleChange} className={`text-base lg:hidden ${!responsive && 'hidden'}`} />
      </div>
      {children && children($value)}
      {panels && panels[activeIndex]}
    </Fragment>
  )
}
