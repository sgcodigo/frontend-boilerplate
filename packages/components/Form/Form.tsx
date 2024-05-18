import { yupResolver } from '@hookform/resolvers/yup'
import { useMutate } from '@pkg/hooks/useQuery.js'
import type { Request, Response, ResponseError } from '@pkg/utils/request'
import { HTMLAttributes, ReactNode, useEffect } from 'react'
import { DefaultValues, FieldValues, FormProvider, Path, UseFormReset, UseFormReturn, UseFormSetValue, useForm } from 'react-hook-form'
import { Schema } from 'yup'

type SetError<T> = (name: Path<T>, msg: string) => void

type HTMLFormProps = Omit<HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit' | 'onError'>

type ChildFunc<TValues extends FieldValues> = (
  arg: Omit<UseFormReturn<TValues>, 'setError'> & { values: TValues; setError: SetError<TValues> },
) => ReactNode

type Props<TValues extends FieldValues> = HTMLFormProps & {
  method?: string
  config?: Request
  schema?: Schema<TValues>
  defaults?: DefaultValues<TValues>
  children?: ReactNode | ChildFunc<TValues>
  revalidation?: boolean
  invalidateUrls?: string[]
  awaitInvalidateUrls?: string[]
  transform?: (values: TValues) => object
} & (
    | {
        url: string
        onError?: (err: ResponseError & { values: TValues; setError: SetError<TValues>; setValue: UseFormSetValue<TValues> }) => void
        onSuccess?: (res: Response & { values: TValues; reset: UseFormReset<TValues> }) => void
        onSubmit?: never
      }
    | { onSubmit: (data: TValues, reset?: Function) => void; url?: never; onError?: never; onSuccess?: never }
  )

export default function Form<TValues extends FieldValues>({
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
  const { mutateAsync } = useMutate()

  const $url = (form.watch().url as string) || url

  const setError: SetError<TValues> = (name, message) => form.setError(name, { type: 'validate', message })

  const handleSubmit = async (values: TValues) => {
    return mutateAsync({ ...config, url: $url, method, payload: transform(values), invalidateUrls, awaitInvalidateUrls })
      .then(res => onSuccess?.({ ...res, values, reset: form.reset }))
      .catch(err => onError?.({ ...err, values, setValue: form.setValue, setError }))
  }

  useEffect(() => {
    if (defaults && revalidation) {
      Object.entries(defaults as Object).forEach(([name, value]) => form.setValue(name as Path<TValues>, value))
    }
  }, [defaults])

  return (
    <FormProvider {...form}>
      <form {...rest} onSubmit={form.handleSubmit(data => (onSubmit ? onSubmit(data, form.reset) : handleSubmit(data)))}>
        {typeof children === 'function' ? children({ ...form, setError, values: form.watch() }) : children}
      </form>
    </FormProvider>
  )
}
