import * as $Accordion from '@radix-ui/react-accordion'
import HTML from '@repo/components/HTML'
import { cva, VariantProps } from 'class-variance-authority'
import { PlusIcon } from 'icons/Math'
import { ReactNode } from 'react'

type Props = VariantProps<typeof listClass> &
  Omit<$Accordion.AccordionSingleProps, 'type' | 'className'> & {
    items: { title: string; content?: string; children?: ReactNode }[]
    classes?: {
      list?: string
      item?: string
      trigger?: string
      content?: string
    }
  }

const listClass = cva('overflow-hidden', {
  variants: {
    color: {
      primary: '',
    },
  },
})

const itemClass = cva('group duration-150', {
  variants: {
    color: {
      primary: '',
    },
  },
})

const triggerClass = cva('flex w-full items-center justify-between', {
  variants: {
    color: {
      primary: '',
    },
  },
})

const contentClass = cva('!transition-[grid-template-rows] !duration-300 grid !grid-rows-[0fr] rdx-state-open:!grid-rows-[1fr]', {
  variants: {
    color: {
      primary: '',
    },
  },
})

export default function Accordion({ items, color = 'primary', classes, ...rest }: Props) {
  return (
    <$Accordion.Root type='single' className={listClass({ color, className: classes?.list })} collapsible {...rest}>
      {items.map(({ title, content, children }) => (
        <$Accordion.Item key={title} value={title} className={itemClass({ color, className: classes?.item })}>
          <$Accordion.Trigger className={triggerClass({ color, className: classes?.trigger })}>
            <p>{title}</p>
            <PlusIcon className='group-rdx-state-open:2nd:[&>path]:opacity-0 flex-shrink-0 duration-200' />
          </$Accordion.Trigger>
          <$Accordion.Content forceMount className={contentClass({ color, className: classes?.content })}>
            <div className='overflow-hidden'>
              {children}
              <HTML className='pt-2'>{content}</HTML>
            </div>
          </$Accordion.Content>
        </$Accordion.Item>
      ))}
    </$Accordion.Root>
  )
}
