import '@total-typescript/ts-reset'
import { SVGProps as $SVGProps } from 'react'

// 🚫 Don't add business types here

declare global {
  type Option = string | { label: string; value: string }

  type SVGProps = $SVGProps<SVGSVGElement>
}
