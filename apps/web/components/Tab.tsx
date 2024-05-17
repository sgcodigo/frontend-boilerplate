import { cookOptions } from '@pkg/utils'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { VariantProps, cva } from 'class-variance-authority'
import { useRouter } from 'next/router'
import { Fragment, ReactNode, useState } from 'react'
import ScrollArea from './ScrollArea'

type Props = VariantProps<typeof item> & {
  options: Option[]
  children: ReactNode[] | ((value: string) => ReactNode)
  $default?: string
  name?: string
  shallow?: boolean
  syncRoute?: boolean
  removeQueriesOnChange?: string[]
}

const list = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
})

const item = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
})

export default function Tab({
  options,
  variant = 'default',
  $default,
  children,
  name = 'tab',
  shallow = true,
  syncRoute = true,
  removeQueriesOnChange = [],
}: Props) {
  const router = useRouter()
  const [value, setValue] = useState('')

  const $options = cookOptions(options)
  const curValue = (syncRoute ? (router.query[name] as string) : value) || $default || $options[0].value

  const handleChange = (value: string) => {
    if (syncRoute) {
      const { query } = router
      removeQueriesOnChange.forEach(element => delete query[element])
      router.push({ query: { ...query, ...(value ? { [name]: value } : undefined) } }, undefined, { shallow })
    } else {
      setValue(value)
    }
  }

  return (
    <Fragment>
      <ScrollArea dir='horizontal'>
        <RadioGroup.Root value={curValue} className={list({ variant })} onValueChange={handleChange}>
          {$options.map(({ label, value }) => (
            <RadioGroup.Item key={value} value={value} className={item({ variant })}>
              {label}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </ScrollArea>
      {typeof children === 'function' ? children(curValue) : children[$options.findIndex(option => option.value === curValue)]}
    </Fragment>
  )
}
