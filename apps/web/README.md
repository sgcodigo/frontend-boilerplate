## Coding Rules

If you don't follow these rules, you will be forced to changed back your codes with your own time to align with these rules.

1. Every pages must be wrapped with `components/Page`.

```jsx
// pages/index.tsx
import { Page } from 'components/Page'

export default function Index() {
  return <Page></Page>
}
```

2. Please ask the designer for these `Button` state designs.

- `hover`
- `active`
- `loading`
- `disable`

3. When including lottie animations, always ask for dotLottie files. Then use the `components/Lottie`.

4. For icons and stickers, use React components. Please use `web/icons`.
