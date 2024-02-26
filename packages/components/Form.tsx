import { yupResolver } from '@hookform/resolvers/yup'
import { useMutate } from '@repo/hooks/useQuery'
import type { Request, Response, ResponseError } from '@repo/utils/request'
import { HTMLAttributes, ReactNode, createElement, useEffect } from 'react'
import { DefaultValues, FieldValues, FormProvider, Path, UseFormReset, UseFormReturn, UseFormSetValue, useForm } from 'react-hook-form'
import { Schema } from 'yup'

type ChildFunc<TValues extends FieldValues, ExtraArg = {}> = (
  arg: Omit<UseFormReturn<TValues>, 'setError'> & ExtraArg & { values: TValues; setError: SetError<TValues> },
) => ReactNode

type Props<TValues extends FieldValues> = Omit<HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit' | 'onError'> & {
  as?: string
  url?: string
  method?: string
  config?: Request
  schema?: Schema<TValues>
  defaults?: DefaultValues<TValues>
  children?: ReactNode | ChildFunc<TValues>
  revalidation?: boolean
  invalidateUrls?: string[]
  awaitInvalidateUrls?: string[]
  transform?: (values: TValues) => object
  onError?: (err: ResponseError & { values: TValues; setError: SetError<TValues>; setValue: UseFormSetValue<TValues> }) => void
  onSubmit?: (data: TValues, reset?: Function) => void
  onSuccess?: (res: Response & { values: TValues; reset: UseFormReset<TValues> }) => void
}

type SetError<TValues> = (name: Path<TValues>, msg: string) => void

export type FormType<TValues extends FieldValues> = Props<TValues>

export default function Form<TValues extends FieldValues>({
  as = 'form',
  url,
  method = 'POST',
  config,
  schema,
  defaults,
  children,
  transform = v => v,
  revalidation,
  invalidateUrls,
  awaitInvalidateUrls,
  onError,
  onSubmit,
  onSuccess,
  ...rest
}: Props<TValues>) {
  const form = useForm<TValues>({
    mode: 'onChange',
    resolver: schema && (yupResolver(schema as never) as never),
    defaultValues: defaults,
    reValidateMode: 'onChange',
  })
  const formUrl = form.watch().formUrl || url
  const { mutateAsync } = useMutate()

  const setError: SetError<TValues> = (name, message) => form.setError(name, { type: 'validate', message })

  const handleSubmit = (values: TValues) => {
    // It's important to set url or onSubmit.
    if (formUrl) {
      return mutateAsync({ ...config, url: formUrl, method, payload: transform(values), invalidateUrls, awaitInvalidateUrls })
        .then(res => onSuccess?.({ ...res, values, reset: form.reset }))
        .catch(err => onError?.({ ...err, values, setValue: form.setValue, setError }))
    }
  }

  useEffect(() => {
    if (defaults && revalidation) {
      Object.entries(defaults as Object).forEach(([name, value]) => form.setValue(name as Path<TValues>, value))
    }
  }, [defaults])

  return (
    <FormProvider {...form}>
      {createElement(
        as,
        { ...rest, onSubmit: form.handleSubmit(data => (onSubmit ? onSubmit(data, form.reset) : handleSubmit(data))) },
        typeof children === 'function' ? children({ ...form, setError, values: form.watch() }) : children,
      )}
    </FormProvider>
  )
}

export type { ChildFunc as FormChildFunc, Props as FormProps }
