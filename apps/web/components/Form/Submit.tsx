import SubmitRoot, { SubmitRootProps } from '@pkg/components/Form/SubmitRoot'
import Button from '@web/components/Button'

type Props = SubmitRootProps<typeof Button>

export default function Submit(props: Props) {
  return <SubmitRoot {...props} button={Button} />
}

export type { Props as SubmitProps }
