# `$component/Chips`

Chips is a component that allows user to enter information, make selections, filter content or trigger actions.

## Usage

```typescript
const onValueChange = (value:string & string[]) => {
// code here
}

<Chips size={'sm'} color={'primary'} items={[]} multiple={false} className={''} onValueChange={onValueChange} {...$rest}>
```

## Props

| Name              | Type                                                  | Default     | Description                                                             |
| :---------------- | :---------------------------------------------------- | :---------- | :---------------------------------------------------------------------- |
| `size`          | `sm \| md`                                           | `md`      | Size of a Chips                                                         |
| `color`         | `primary`                                           | `primary` | Color of a Chips                                                        |
| `items`         | `(Option `\|` boolean \| undefined)[]`            |             | Items list of Chips                                                     |
| `multiple`      | `boolean`                                           | `false`   | Determines whether a single or multiple items can be pressed at a time. |
| `onValueChange` | `(value:string & string[]) => void`                 |             | Function will be executed when the user modified the Chip's value.      |
| `className`     | `string`                                            |             | Custom tailwindcss classes                                              |
| `...$rest`      | `ToggleGroupSingleProps \| ToggleGroupMultipleProps` |             | ToggleGroupProps can be passed                                          |
