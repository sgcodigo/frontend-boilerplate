# [`Button`](../../apps/web/components/Button.tsx)

This component creates a customizable button with various visual options.

## Usage

```tsx
import Button from '@web/components/Button'

const label = 'Click Me'

// As HTML Button
<Button label={label} onClick={handleClick} />

// As Next Link
<Button label={label} href="/url" />
```

## Props

| Name       | Type                                                                                                                       | Default     | Description                                                    |
| :--------- | :------------------------------------------------------------------------------------------------------------------------- | :---------- | :------------------------------------------------------------- |
| `$ref`     | `RefObject<HTMLElement>`                                                                                                   | `undefined` | Reference to the button or `Link` element.                     |
| `size`     | `'sm', 'md'`                                                                                                               | `'md'`      | Size of the button (`sm` for small, `md` for medium).          |
| `href`     | `string`                                                                                                                   | `undefined` | The URL to link to, if provided, the button renders as a link. |
| `icon`     | `ReactNode`                                                                                                                | `undefined` | Icon to display alongside the label.                           |
| `label`    | `ReactNode`                                                                                                                | `undefined` | Label to display inside the button.                            |
| `color`    | `'primary'` or other custom color classes                                                                                  | `'primary'` | Color variant of the button.                                   |
| `width`    | `'fill', 'inline', 'hybrid'`                                                                                               | `'fill'`    | Width variant of the button.                                   |
| `state`    | `'idle', 'loading', 'error', 'disable'`                                                                                    | `'idle'`    | State of the button.                                           |
| `variant`  | `'text', 'contain', 'outline'`                                                                                             | `'contain'` | Visual variant of the button.                                  |
| `...$rest` | [`NextLink`](https://nextjs.org/docs/app/api-reference/components/link#props) \| `ButtonHTMLAttributes<HTMLButtonElement>` |             |                                                                |

## Notes

- In forms, please use [`Submit`](../../apps/web/components/Form/Submit.tsx) instead of `Button` because it offers automatic state handling.
