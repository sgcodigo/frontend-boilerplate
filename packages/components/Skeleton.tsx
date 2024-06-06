import { createElement, HTMLAttributes, ReactHTML } from 'react'

type Props = HTMLAttributes<HTMLElement> & { as?: keyof ReactHTML }

export default function Skeleton({ as = 'p', className, children, ...rest }: Props) {
  const isLoading = !children

  return createElement(
    as,
    {
      ...rest,
      className: `${isLoading && 'animate-pulse w-[--skeleton-width] h-[--skeleton-height]'} ${className}`,
    },
    children,
  )
}
