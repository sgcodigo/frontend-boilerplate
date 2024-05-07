import Button from '@cms/components/Button'
import SubmitRoot, { SubmitRootProps } from '@pkg/components/Form/SubmitRoot'

type Props = SubmitRootProps<typeof Button>

export default function Submit(props: Props) {
  return <SubmitRoot {...props} button={Button} />
}

export type { Props as SubmitProps }
