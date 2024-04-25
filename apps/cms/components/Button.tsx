import { cva, VariantProps } from 'class-variance-authority'
import Spinner from 'icons/Spinner'
import Link, { LinkProps as $LinkProps } from 'next/link'
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type CProps = VariantProps<typeof classes> & { $ref?: any; icon?: ReactNode; label?: ReactNode }

export type LinkProps = CProps & $LinkProps & HTMLAttributes<HTMLAnchorElement>
export type ButtonProps = CProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>

const classes = cva('relative flex-center leading-normal text-white rounded-xxs', {
  variants: {
    size: { md: 'px-base py-xxs', lg: 'px-5 py-2' },
    width: {
      fill: 'flex w-full',
      inline: 'inline-flex flex-shrink-0',
      hybrid: 'max-md:flex max-md:w-full inline-flex flex-shrink-0',
    },
    state: {
      idle: 'cursor-pointer',
      loading: 'cursor-progress',
      disable: 'cursor-not-allowed',
    },
    color: {
      danger: '',
      primary: '',
    },
    variant: {
      link: '',
      dashed: '',
      primary: '',
      secondary: 'bg-container',
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'primary', class: 'bg-primary hover:bg-primary-hover' },
    { color: 'danger', variant: 'primary', class: 'bg-error hover:bg-error-hover' },
    { color: 'primary', variant: 'secondary', class: 'hover:border-primary-hover' },
    { color: 'danger', variant: 'secondary', class: 'border-error hover:border-error-hover' },
  ],
})

export default function Button({
  $ref,
  size = 'md',
  href,
  icon,
  color = 'primary',
  state = 'idle',
  label,
  width = 'inline',
  variant = 'primary',
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
