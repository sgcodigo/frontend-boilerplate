import Button from '@cms/components/Button'
import RSubmit, { SubmitProps as RSubmitProps } from '@pkg/components/Submit'

type Props = RSubmitProps<typeof Button>

export default function Submit(props: Props) {
  return <RSubmit {...props} button={Button} />
}

export type { Props as SubmitProps }
