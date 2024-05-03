import useField from '@pkg/hooks/useField'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Field, { FieldProps } from '@web/components/Form/Field'
import ScrollArea from 'components/ScrollArea'
import codes from 'country-calling-code'
import { ChevronIcon } from 'icons'
import { useEffect } from 'react'
import ReactFlag from 'react-flagkit'

type Props = Omit<FieldProps, 'children'>

const countries = codes.map(({ country, isoCode2, countryCodes }) => {
  return { iso: isoCode2, name: country, code: countryCodes[0].replace('-', '') }
})

const Flag = ({ iso = 'SG' }: { iso?: string }) => <ReactFlag country={iso} className='w-6 overflow-hidden rounded-sm' />

export default function Phone(props: Props) {
  const { value: code, setValue: setCode } = useField(props.name == 'mobile' ? 'code' : `${props.name}Code`)

  useEffect(() => {
    // We don't add `code = '+65'` bec it leave the form value to undefined onSubmit.
    if (!code) setCode('65')
  }, [])

  return (
    <Field key={code} {...props}>
      {({ value: number = '', onBlur, setValue: setNumber }) => {
        const activeCountry = countries.find(country => country.code == code)
        return (
          <>
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger className='group flex cursor-pointer items-center space-x-1'>
                <Flag iso={activeCountry?.iso} />
                <span>+{activeCountry?.code}</span>
                <ChevronIcon className='w-4.5 group-rdx-state-open:rotate-90 -rotate-90 duration-200' />
              </DropdownMenu.Trigger>
              <div className='z-10 [&>div]:!absolute [&>div]:w-full'>
                <DropdownMenu.Content align='start' className='animate-in h-48'>
                  <ScrollArea className='h-full'>
                    <DropdownMenu.RadioGroup value={code} onValueChange={setCode}>
                      {countries.map(({ iso, name, code }) => (
                        <DropdownMenu.RadioItem key={name} value={code} className='flex cursor-pointer select-none items-center duration-150'>
                          <Flag iso={iso} />
                          <span>
                            {name} +{code}
                          </span>
                        </DropdownMenu.RadioItem>
                      ))}
                    </DropdownMenu.RadioGroup>
                  </ScrollArea>
                </DropdownMenu.Content>
              </div>
            </DropdownMenu.Root>
            <input
              type='tel'
              name={props.name}
              value={number}
              onBlur={onBlur}
              className='w-full min-w-0 flex-1'
              onChange={e => {
                const value = e.target.value.replace(/\D/g, '')
                value.length <= 15 && setNumber(value)
              }}
            />
          </>
        )
      }}
    </Field>
  )
}
