import { cva, VariantProps } from 'class-variance-authority'
import Spinner from 'icons/Spinner'
import Link, { LinkProps as $LinkProps } from 'next/link'
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type CProps = VariantProps<typeof classes> & { $ref?: any; icon?: ReactNode; label?: ReactNode }

export type LinkProps = CProps & $LinkProps & HTMLAttributes<HTMLAnchorElement>
export type ButtonProps = CProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>

const classes = cva('relative flex-center leading-none cursor-pointer', {
  variants: {
    size: { sm: '', md: '' },
    width: {
      fill: 'flex w-full h-full',
      inline: 'inline-flex flex-shrink-0',
      hybrid: 'max-md:flex max-md:w-full inline-flex flex-shrink-0',
    },
    color: {
      primary: 'bg-rose-500',
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
        <Spinner size='sm' color='currentColor' className='absolute m-0 opacity-0' />
        <p className='flex items-center space-x-2'>
          {icon}
          {label && <span>{label}</span>}
        </p>
      </>
    ),
    className: `error:cursor-not-allowed loading:cursor-progress disable:cursor-not-allowed [&>svg]:loading:opacity-100 [&>p]:loading:opacity-0 ${classes({ size, width, color, variant, className })}`,
  }

  return href ? (
    <Link {...({ href, ...props } as LinkProps)} />
  ) : (
    <button type='button' disabled={![undefined, 'idle'].includes((rest as any)['data-state'])} {...(props as ButtonProps)} />
  )
}
