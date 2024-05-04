import { cva, VariantProps } from 'class-variance-authority'
import Spinner from 'icons/Spinner'
import Link, { LinkProps as $LinkProps } from 'next/link'
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type CProps = VariantProps<typeof classes> & { $ref?: any; icon?: ReactNode; label?: ReactNode }

export type LinkProps = CProps & $LinkProps & HTMLAttributes<HTMLAnchorElement>
export type ButtonProps = CProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>

const classes = cva('relative flex-center leading-none', {
  variants: {
    size: { sm: '', md: '' },
    width: {
      fill: 'flex w-full',
      inline: 'inline-flex flex-shrink-0',
      hybrid: 'max-md:flex max-md:w-full inline-flex flex-shrink-0',
    },
    state: {
      idle: 'cursor-pointer',
      error: 'cursor-not-allowed',
      loading: 'cursor-progress',
      disable: 'cursor-not-allowed',
      success: '',
    },
    color: {
      primary: '',
      secondary: '',
    },
    variant: {
      text: '',
      contain: '',
      outline: '',
    },
  },
})

export default function Button({
  $ref,
  size = 'md',
  href,
  icon,
  color = 'primary',
  state = 'idle',
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
        <Spinner size='sm' color='currentColor' className={`absolute m-0 ${state !== 'loading' && 'opacity-0'}`} />
        <p className={`flex items-center space-x-2 ${state === 'loading' && 'opacity-0'}`}>
          {icon}
          {label && <span>{label}</span>}
        </p>
      </>
    ),
    className: classes({ size, width, state, color, variant, className }),
  }

  return href ? <Link {...({ href, ...props } as LinkProps)} /> : <button type='button' disabled={state !== 'idle'} {...(props as ButtonProps)} />
}
