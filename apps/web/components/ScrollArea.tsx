import { Root, Scrollbar, Thumb, Viewport } from '@radix-ui/react-scroll-area'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof path> & {
    dir?: 'vertical' | 'horizontal'
    hideScrollbar?: boolean
  }

const path = cva('rdx-orientation-horizontal:py-0.5 rdx-orientation-vertical:px-0.5', {
  variants: {
    size: {
      sm: 'rdx-orientation-horizontal:h-1 rdx-orientation-vertical:w-1.5',
      md: 'rdx-orientation-horizontal:h-3 rdx-orientation-vertical:w-2.5',
    },
    color: {},
    display: {
      none: 'opacity-0',
    },
  },
})

export default function ScrollArea({ dir = 'vertical', size = 'md', color, children, hideScrollbar, ...rest }: Props) {
  return (
    <Root {...rest}>
      <Viewport className='s-full'>{children}</Viewport>
      <Scrollbar className={path({ size, color })} orientation={dir}>
        <Thumb className='rdx-orientation-horizontal:h-full rdx-orientation-vertical:w-full cursor-grab rounded-md active:cursor-grabbing' />
      </Scrollbar>
    </Root>
  )
}
