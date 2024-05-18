import * as RadixAccordion from '@radix-ui/react-accordion'
import { cva, VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'

type Props = VariantProps<typeof listClass> &
  Omit<RadixAccordion.AccordionSingleProps, 'type' | 'className'> & {
    items: { title: string; content: ReactNode }[]
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
      default: '',
    },
  },
})

const itemClass = cva('group duration-150', {
  variants: {
    color: {
      default: '',
    },
  },
})

const triggerClass = cva('flex w-full items-center justify-between', {
  variants: {
    color: {
      default: '',
    },
  },
})

const contentClass = cva('overflow-hidden !transition-[grid-template-rows] !duration-300 grid !grid-rows-[0fr] rdx-state-open:!grid-rows-[1fr]', {
  variants: {
    color: {
      default: '',
    },
  },
})

export default function Accordion({ items, color = 'default', classes, ...rest }: Props) {
  return (
    <RadixAccordion.Root type='single' className={listClass({ color, className: classes?.list })} collapsible {...rest}>
      {items.map(({ title, content }) => (
        <RadixAccordion.Item key={title} value={title} className={itemClass({ color, className: classes?.item })}>
          <RadixAccordion.Trigger className={triggerClass({ color, className: classes?.trigger })}>
            <p>{title}</p>
            {/* Replace with project based indicator icon */}
          </RadixAccordion.Trigger>
          <RadixAccordion.Content forceMount className={contentClass({ color, className: classes?.content })}>
            {content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}
