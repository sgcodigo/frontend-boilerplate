import { Dispatch, SetStateAction } from 'react'
import { useController } from 'react-hook-form'

export type UseFieldReturn<T> = ReturnType<typeof useField<T>>

type Options = {
  onChange?: (v: any) => void
  validateOnlyIfTouched?: boolean
}

export default function useField<TValue = string>(name: string, { onChange, validateOnlyIfTouched = true }: Options = {}) {
  const {
    field: { ref, value, onChange: $onChange, onBlur },
    fieldState: { error, isDirty, isTouched },
  } = useController({ name })

  const $isTouched = validateOnlyIfTouched ? isTouched : true

  const setValue: Dispatch<SetStateAction<TValue | undefined>> = value => {
    $onChange(value)
    onChange && onChange(value)
  }

  return {
    ref,
    value: value as TValue | undefined,
    error: isDirty && $isTouched && error ? error.message : '',
    onBlur,
    setValue,
  }
}
