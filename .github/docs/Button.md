# `Button`
This component creates a customizable button with various visual options.

## Usage

```jsx
import Button from '{@web|@cms}/components/Button'

// Inside JSX
;<Button label='Click me' onClick={handleClick} data-state='loading' />
```

## Props

| Name        | Type              | Default    | Description                          |
| :---------- | :---------------- | :--------- | :----------------------------------- |
| `$ref`      | `any`             | `undefined`| Reference to the button element.    |
| `size`      | `'sm', 'md'`     | `'md'`     | Size of the button (`sm` for small, `md` for medium). |
| `href`      | `string`          | `undefined`| The URL to link to, if provided, the button renders as a link. |
| `icon`      | `ReactNode`       | `undefined`| Icon to display alongside the label.|
| `label`     | `ReactNode`       | `undefined`| Label to display inside the button. |
| `color`     | `'primary'` or other custom color classes | `'primary'` | Color variant of the button.      |
| `width`     | `'fill', 'inline', 'hybrid'` | `'fill'` | Width variant of the button.    |
| `variant`   | `'text', 'contain', 'outline'` | `'contain'` | Visual variant of the button. |
| `className` | `string`          | `undefined`| Additional CSS classes for customization. |
| `data-state` | `'idle', 'loading', 'error', 'disable', 'success'`           | `'idle'`| Additional CSS classes for customization. |

## Notes

- Button state is all controlled by `data-state`.
- The `Button` component supports various visual configurations such as size, color, width, and variant.
