import { cva, VariantProps } from 'class-variance-authority'

type Props = SVGProps & VariantProps<typeof classes>

const classes = cva('animate-spin fill-none', { variants: { size: { sm: 's-6', md: 's-8', lg: '' } } })

export default function Spinner({ size = 'md', style, className, ...rest }: Props) {
  return (
    <svg viewBox='0 0 24 24' className={classes({ size, className })} {...rest}>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  )
}
