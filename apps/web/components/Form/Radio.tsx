import * as RadioGroup from '@radix-ui/react-radio-group'
import Field from '@repo/components/Field'
import { cookOptions } from '@repo/utils'
import { VariantProps, cva } from 'class-variance-authority'

type Props = VariantProps<typeof radio> & { col?: boolean; name: string; options: Option[] }

const root = cva('flex items-start', {
  variants: {
    dir: {
      row: '',
      col: '',
    },
    size: {
      sm: '',
      md: '',
    },
  },
})

const radio = cva('flex-shrink-0 rounded-full duration-150', {
  variants: {
    size: {
      sm: '',
      md: '',
    },
    color: {
      primary: '',
    },
  },
})

export default function Radio({ col, size = 'md', name, color = 'primary', options }: Props) {
  const $options = cookOptions(options)

  return (
    <Field<string> name={name}>
      {({ value, setValue }) => (
        <RadioGroup.Root value={value} className={root({ dir: col ? 'col' : 'row', size })} onValueChange={setValue}>
          {$options.map(({ label, value }) => {
            const id = `${name}-${value}`
            return (
              <div key={id} className='flex items-center space-x-2'>
                <RadioGroup.Item id={id} value={value} className={radio({ size, color })} />
                <label htmlFor={id}>{label}</label>
              </div>
            )
          })}
        </RadioGroup.Root>
      )}
    </Field>
  )
}
