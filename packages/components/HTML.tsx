import { HTMLAttributes } from 'react'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children?: string }

export default function HTML({ children, ...rest }: Props) {
  return children && <div {...rest} dangerouslySetInnerHTML={{ __html: children }} />
}
