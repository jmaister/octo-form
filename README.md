
# MuyForm

Form wrapper for React + Material-UI + react-hook-form + yup.

Based on: https://blog.logrocket.com/using-material-ui-with-react-hook-form/

# Install

With npm:

```bash
npm install --save muyform
```

or yarn:

```bash
yarn add muyform
```

# Usage

1. Import the component:

```jsx
import { MuyForm } from 'muyform';
```

2. Create a yup schema

```jsx
const iceCreamOptions: OptionLabel[] = [
  { value: "", label: "-- Select a flavor --" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const schema = yup.object({
  name: yup.string().required(),
  birthDay: yup.date().required(),
  iceCreamType: yup.string().oneOf(iceCreamOptions.filter(o => o.label != "").map(option => option.value.toString())),
});
```


