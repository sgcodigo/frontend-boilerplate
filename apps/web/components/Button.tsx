import { cva, VariantProps } from 'class-variance-authority'
import Spinner from 'icons/Spinner'
import Link, { LinkProps as $LinkProps } from 'next/link'
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, RefObject } from 'react'

type CProps = VariantProps<typeof classes> & {
  $ref?: RefObject<HTMLElement>
  icon?: ReactNode
  state?: 'idle' | 'error' | 'disable' | 'loading'
  label?: ReactNode
}

export type LinkProps = CProps & $LinkProps & HTMLAttributes<HTMLAnchorElement>
export type ButtonProps = CProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>

const classes = cva(
  'relative flex-center leading-none cursor-pointer [&>svg]:loading:opacity-100 [&>p]:loading:opacity-0 loading:cursor-progress error:cursor-not-allowed disable:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: '',
        md: '',
      },
      width: {
        fill: 'flex size-full',
        inline: 'inline-flex flex-shrink-0',
        hybrid: 'flex max-md:w-full md:inline-flex flex-shrink-0',
      },
      color: {
        primary: '',
      },
      variant: {
        text: '',
        contain: '',
        outline: '',
      },
    },
  },
)

export default function Button({
  $ref,
  size = 'md',
  href,
  icon,
  state = 'idle',
  color = 'primary',
  label,
  width = 'fill',
  variant = 'contain',
  children,
  className,
  ...rest
}: LinkProps | ButtonProps) {
  const props = {
    ...rest,
    ref: $ref,
    children: children || (
      <>
        <Spinner size='sm' color='currentColor' className=' absolute m-0 opacity-0' />
        <p className='flex items-center space-x-2'>
          {icon}
          <span>{label}</span>
        </p>
      </>
    ),
    className: classes({ size, width, color, variant, className }),
    'data-state': state,
  }

  return href ? <Link {...({ href, ...props } as LinkProps)} /> : <button type='button' disabled={state !== 'idle'} {...(props as ButtonProps)} />
}
