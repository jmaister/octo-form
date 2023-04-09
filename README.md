
![OctoForm logo](docs/logo.png)

# OctoForm

Write less code to create your forms.

OctoForm is a wrapper that combines Bootstrap 5 + react-hook-form + yup using ReactJS.

[Example repository https://github.com/jmaister/octo-form-example]([https://](https://github.com/jmaister/octo-form-example))

Demo on Chromatic: https://63e902d86b5464295dc7a3c4-mufiukyqon.chromatic.com/?path=/story/octoform--full-example

# Screenshot

![Screenshot](docs/screenshot.png)

# Install

With npm:

```bash
npm install --save octo-form
```

or yarn:

```bash
yarn add octo-form
```

# Usage

1. Import the component:

```jsx
import { OctoForm } from 'octo-form';
```

2. Create a yup schema

```ts
const iceCreamOptions: OptionLabel[] = [
  { value: "", label: "-- no flavor --" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const dayOptions: OptionLabel[] = [
  { value: "", label: "-- no day --" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const schema = yup.object({
  example: yup.string(),
  exampleRequired: yup.string().required(),
  iceCreamType: yup.string().oneOf(iceCreamOptions.filter(o => o.label != "").map(option => option.value.toString())),
  age: yup.number().positive().integer().moreThan(0).required(),
  todaysDate: yup.date().required(),
  todaysDateAndTime: yup.date().required(),
  days: yup.array().of(yup.string().required().oneOf(dayOptions.filter(o => o.label != "").map(option => option.value.toString()))).required(),
  volume: yup.number().positive().integer().min(0).max(10).required(),
});
```

3. Create a form component

```tsx
const onSubmit: SubmitHandler<SampleFormType> = (data) => {
    console.log(data);
  }


<OctoForm defaultValues={defaultValues} schema={schema} onSubmit={onSubmit}>
    <Stack spacing={2}>

      <FormInputText name="example" label="Example" />
      <FormInputText name="exampleRequired" label="Example required" />
      <FormInputDropdown name="iceCreamType" label="Ice Cream Type" options={iceCreamOptions} />
      <FormInputText name="age" label="Age" />
      <FormInputDate name="todaysDate" label="Today's date" />
      <FormInputDateTime name="todaysDateAndTime" label="Today's date and time" />
      <FormInputMultiCheckbox name="days" label="Days" options={dayOptions} />
      <FormInputSlider name="volume" label="Volume" />
      <FormInputCheckbox name="isVegan" label="Vegan" />

      <Stack direction="row">
        <Button
          type="submit"
          variant="contained"
        >Submit</Button>
      </Stack>
    </Stack>

  </OctoForm>
```


# TODO

- File component
- Password component
- Number component: auto wity yup.number(), decimals?
- Add autocalculated field -> textfield with calculated value, watch/useWatch
- Table selection: https://mui.com/material-ui/react-table/#sorting-amp-selecting
- Edit data type T and submit data type S can be different, i.e. Subscription - SubscriptionData
