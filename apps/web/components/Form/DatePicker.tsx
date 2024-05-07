import { months } from '@pkg/utils/consts'
import Field, { FieldProps } from '@web/components/Form/Field'
import { HTMLProps, forwardRef, useState } from 'react'
import $DatePicker from 'react-datepicker'

type Props = Omit<FieldProps<Date>, 'children'> & {
  format?: string
  minDate?: Date
  maxDate?: Date
  yearCount?: number
  defaultView?: Views
  disableNavigation?: boolean
}

type InputProps = {
  setOpen: Function
}

const Chevron = (props: SVGProps) => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
    <path d='M12.5 15L7.5 10L12.5 5' stroke='#2E353D' strokeWidth='2' />
  </svg>
)

const Input = forwardRef<HTMLInputElement, InputProps>(({ setOpen, ...props }: HTMLProps<HTMLInputElement> & InputProps, ref) => (
  <input {...props} ref={ref} onClick={() => setOpen(true)} />
))

Input.displayName = 'Date Picker Input'

type Views = (typeof views)[number]

const views = ['day', 'month', 'year'] as const

export default function DatePicker({
  name,
  format = 'dd/MM/yyyy',
  minDate,
  maxDate,
  yearCount = 20,
  placeholder,
  defaultView = 'year',
  disableNavigation,
  ...props
}: Props) {
  const [view, setView] = useState<Views>(defaultView)
  const [isOpen, setOpen] = useState(false)

  const handleViewChange = (view: Views) => {
    !disableNavigation && setView(view)
  }

  return (
    <Field name={name} {...props}>
      {({ ref, value, setValue, onBlur }) => (
        <$DatePicker
          name={name}
          open={isOpen}
          minDate={minDate}
          maxDate={maxDate}
          selected={value ? new Date(value) : null}
          dateFormat={format}
          placeholderText={placeholder}
          customInput={<Input ref={ref} setOpen={setOpen} />}
          renderDayContents={day => <p>{day}</p>}
          renderCustomHeader={({
            date,
            changeYear,
            decreaseYear,
            increaseYear,
            decreaseMonth,
            increaseMonth,
            prevYearButtonDisabled,
            nextYearButtonDisabled,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => {
            const currentYear = date.getFullYear()
            const startYear = currentYear - (currentYear % yearCount)
            const prevDisabled = view === 'month' ? prevYearButtonDisabled : prevMonthButtonDisabled
            const nextDisabled = view === 'month' ? nextYearButtonDisabled : nextMonthButtonDisabled
            const handleIncrease = () => {
              view === 'year' ? changeYear(date.getFullYear() + yearCount) : view === 'month' ? increaseYear() : increaseMonth()
            }
            const handleDecrease = () => {
              view === 'year' ? changeYear(date.getFullYear() - yearCount) : view === 'month' ? decreaseYear() : decreaseMonth()
            }
            return (
              <div className='mb-5 flex items-center justify-between'>
                <Chevron
                  className={`${prevDisabled ? 'pointer-events-none cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                  onClick={handleDecrease}
                />
                <p className={`space-x-2 text-base font-black uppercase ${!disableNavigation && '[&>*]:cursor-pointer'}`}>
                  {view === 'day' && <span onClick={() => handleViewChange('month')}> {months.find((_, index) => date.getMonth() === index)}</span>}
                  {view === 'year' ? (
                    <span>
                      {startYear + 1} - {startYear + yearCount}
                    </span>
                  ) : (
                    <span onClick={() => handleViewChange('year')}>{currentYear}</span>
                  )}
                </p>
                <Chevron
                  className={`rotate-180 
                  ${nextDisabled ? 'pointer-events-none cursor-not-allowed opacity-75' : 'cursor-pointer'} `}
                  onClick={handleIncrease}
                />
              </div>
            )
          }}
          yearItemNumber={yearCount}
          showYearPicker={view === 'year'}
          showMonthYearPicker={view === 'month'}
          onChange={date => {
            const newMode = view === 'year' ? 'month' : view === 'month' ? 'day' : undefined
            // onBlur is added here to validate on value change. Default behaviour is to validate onBlur. But here we can also pick from dropdown and error message is not displaying until focus on input and blur again.
            onBlur()
            setValue(date || undefined)
            newMode ? handleViewChange(newMode) : setOpen(false)
          }}
          onCalendarOpen={() => setOpen(true)}
          onClickOutside={() => setOpen(false)}
        />
      )}
    </Field>
  )
}
