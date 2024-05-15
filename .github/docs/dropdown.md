# `$component/Dropdown`

A Dropdown is a menu that offers a list of options. It's useful because a dropdown allows us to select an option easily or it's useful when the user want to navigate to another page.

## Usage

```typescript
let options:Options[] = [...data];

const [value,setValue] = useState<string>('');

const onChange = (value:string) => {
 // code here
}

<Dropdown options={options} value={value} onChange={onChange} className={''}>
```

## Props

| Name          | Type                       | Default | Description                                                   |
| :------------ | :------------------------- | :------ | :------------------------------------------------------------ |
| `value`     | `string`                 |         | current value of Dropdown                                     |
| `options`   | `Options[]`              |         | Item lists of Dropdown                                        |
| `onChange`  | `(value:string) => void` |         | will be executed when the user modified the Dropdown's value. |
| `className` | `string`                 |         | custom tailwindcss classes                                    |
