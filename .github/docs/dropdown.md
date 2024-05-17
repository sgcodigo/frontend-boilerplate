# [`Dropdown`](../../apps/web/components/Dropdown.tsx)

## Usage

```tsx
import Dropdown from '@web/components/Dropdown'

const options = [
  { label: 'Item 1', value: 'Item1' },
  { label: 'Item 2', value: 'Item2' },
  { label: 'Item 3', value: 'Item3' },
];


<Dropdown options={options} onValueChange={/* Handle Value Change*/}>
```

## Props

| Name            | Type                                                                           | Default      | Description                                    |
| :-------------- | :----------------------------------------------------------------------------- | :----------- | :--------------------------------------------- |
| `value`         | `string`                                                                       | `options[0]` | Selected value                                 |
| `options`       | [`Option[]`](../../apps/web/types/globals.d.ts#L7)                             |              | List of dropdown options                       |
| `onValueChange` | `(value:string) => void`                                                       |              | Handler to execute when dropdown value changes |
| `className`     | `string`                                                                       |              | Classes to pass down to `Select.Trigger`       |
| `...$rest`      | [SelectProps](https://www.radix-ui.com/primitives/docs/components/select#root) |              | Props to pass down to `Select.Root`            |
