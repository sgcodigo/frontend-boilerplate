# [`Tab`](../../apps/web/components/Tab.tsx)

The Tab component is a flexible and responsive tabbed navigation component that integrates. It uses [`@radix-ui/react-radio-group`](https://www.radix-ui.com/primitives/docs/components/radio-group) for the tab selection mechanism and includes support for route synchronization with NextJS router and dynamic content rendering.

## Usage

```tsx
import Tab from '@web/components/Tab';

const options = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
];

const panels = [
  <div key="tab1">Content for Tab 1</div>,
  <div key="tab2">Content for Tab 2</div>,
  <div key="tab3">Content for Tab 3</div>,
];

// Usage 1: Children as array
<Tab options={options}>
  {panels}
</Tab>

// Usage 2: Children as function
<Tab options={options}>
  {(value) => (
    <div>
      Selected Tab: {value}
    </div>
  )}
</Tab>

```

## Props

<!-- prettier-ignore -->
| Name                    | Type                            | Default      | Description                                                                                              |
| :---------------------- | :------------------------------ | :----------  | :------------------------------------------------------------------------------------------------------- | 
| `options`               | [`Option[]`](../../apps/web/types/globals.d.ts#L7)                    | `[]`  | An array of option objects, where each object should have a label and value property or string.          |                                 |
| `variant`               | `enum`                          | `default`    | The variant enum value will comes from `cva`.                                                            |
| `$default`              | `string`                        |  | The default selected tab value if no query parameter is present or no value is set.                      |
| `children`              | `ReactNode[] \| ((value: string) => ReactNode)`|  | A render function or React nodes that receives the current tab value and returns React nodes to be rendered.|
| `syncRoute`             | `boolean`                       | `true`      | Syncs the selected tab with the URL query parameter.                                                     |
| `shallow`               | `boolean `                      | `true`       | Uses shallow routing to avoid a full page reload when changing tabs .   
| `name`                  | `string `                       | `tab`        | Name of the query parameter to use for syncing the selected tab with the URL.                           |
| `removeQueriesOnChange` | `string[]`                      | `[]`        | An array of query parameters to remove from the URL when the tab changes.                                |
