# [`Chips`](../../apps/web/components/Chips.tsx)

Chips is a component that allows user to show badges and filter content or trigger actions.

## Usage

```tsx
import Chips from '@web/components/Chips'

const options = ['Red', 'Blue', 'Green']

// Usage: Display chips
<Chips options={options} />

// Usage: Display chips & handle filtering
<Chips options={options} onValueChange={handleChipsChange}/>
```

## Props

| Name            | Type                                                                                                                          | Default   | Description                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------- | :-------- | :----------------------------------------------------------------- |
| `size`          | `sm \| md`                                                                                                                    | `md`      | Size of a Chips. This value comes from `cva`.                      |
| `color`         | `default`                                                                                                                     | `default` | Color of a Chips. This value comes from `cva`.                     |
| `options`       | [`Option[]`](../../apps/web/types/globals.d.ts#L7)                                                                            |           | List of Chips                                                      |
| `isMultiple`    | `boolean`                                                                                                                     | `false`   | Determines whether a single or multiple items can be selected.     |
| `onValueChange` | `(value:string) => void` \| `(value:string[]) => void`                                                                        |           | Function will be executed when the user modified the Chip's value. |
| `...$rest`      | [`ToggleGroupSingleProps \| ToggleGroupMultipleProps`](https://www.radix-ui.com/primitives/docs/components/toggle-group#root) |           | Radix ToggleGroupProps can be passed                               |
