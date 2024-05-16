# `Tab`

The Tab component is a flexible and responsive tabbed navigation component that integrates. It uses @radix-ui/react-radio-group for the tab selection mechanism and includes support for route synchronization and dynamic content rendering.

## Usage

```
import Tab from './Tab';

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

function MyComponent() {
  return (
    <Tab options={options} panels={panels} $default="tab1" >
      {(value) => (
        <div>
          Selected Tab: {value}
        </div>
      )}
    </Tab>
  );
}

export default MyComponent;

```

## Props

<!-- prettier-ignore -->
| Name                    | Type                            | Default     | Description                                                                                              |
| :---------------------- | :------------------------------ | :---------- | :------------------------------------------------------------------------------------------------------- | 
|                         |                                 |             |
| `name`                  | `string `                       | `tab`       | Name of the query parameter to use for syncing the selected tab with the URL.                            |
| `color`                 | `enum  (primary)`               | `primary`   | The color variant to apply to the tabs.                                                                  |
| `panels`                | `ReactNode[] `                  | `undefined` | An array of React nodes to be displayed as panels corresponding to each tab .                            |
| `options`               | `array `                        | `undefined` | An array of option objects, where each object should have a label and value property or string.          |
| `shallow`               | `boolean `                      | `true`      | Uses shallow routing to avoid a full page reload when changing tabs .                                    |
| `variant`               | `enum`                          | `undefined` | \_                                                                                                       |
| `$default`              | `string`                        | `undefined` | The default selected tab value if no query parameter is present or no value is set.                      |
| `children`              | `(value: string) => ReactNode`  | `undefined` | A render function that receives the current tab value and returns React nodes to be rendered.            |
| `className`             | `string`                        | `undefined` | Additional class names to apply to the root element.                                                     |
| `syncRoute`             | `boolean`                       | `true`      | Syncs the selected tab with the URL query parameter.                                                     |
| `responsive`            | `boolean`                       | `true`      | The component adapts to responsive layouts, hiding tabs on small screens and showing a dropdown instead. |
| `removeQueriesOnChange` | `string[]`                      | `[]`        | An array of query parameters to remove from the URL when the tab changes.                                |
| `...rest`               | `HTMLAttribute<HTMLDivElement>` | `undefined` | HTML attributes that can be passed.                                                                      |     |

## Notes

- The Tab component integrates with Next.js routing to allow tab state synchronization via URL query parameters.
- It includes a responsive design, showing a dropdown on smaller screens when the responsive prop is true.
- The component supports dynamic content rendering via the children render function and the panels array.
