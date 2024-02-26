import * as Yup from 'yup'

type FileValidation = { size: number; types?: string[] }

const schemas = {
  ...Yup,
  otp: Yup.string().length(6, ''),
  file: ({ size, types = [] }: FileValidation) =>
    Yup.mixed<File>()
      .test('file-size', `Please upload a picture smaller than ${size} MB.`, file => (file ? file.size / 1024 / 1024 <= size : true))
      .test('file-type', 'Oops! Upload failed. Incorrect file format.', file => (file ? types.some(type => type === file.type) : true)),
  name: Yup.string().max(40, 'Maximum limit is 40'),
  email: Yup.string().email('Oops! Invalid email address'),
  mobile: Yup.string().test('is-mobile', 'Oops! Invalid phone number', v => (v ? v.length > 4 && v.length < 15 : true)),
  interests: Yup.array()
    .of(Yup.object({ itemId: Yup.string(), itemName: Yup.string(), categoryId: Yup.string() }))
    .min(1)
    .ensure(),
}

export default schemas
