import FutureForm from "./FutureForm";

import * as yup from "yup";
import { OptionLabel } from "./components/FormInputProps";
import { Button, Container, Stack } from "@mui/material";
import { FormInputText } from "./components/FormInputText";
import { FormInputDropdown } from "./components/FormInputDropdown";
import { FormInputDate } from "./components/FormInputDate";
import { FormInputDateTime } from "./components/FormInputDateTime";
import { FormInputMultiCheckbox } from "./components/FormInputMultiCheckbox";
import { FormInputSlider } from "./components/FormInputSlider";


export interface FutureFormProps<T> {
  defaultValues: T;
}

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

export type SampleFormType = yup.InferType<typeof schema>;

export function SampleForm<T>({ defaultValues }: FutureFormProps<T>) {


  return <FutureForm defaultValues={defaultValues} schema={schema}>
    {({ config, watch }) => {
      return <>
        <Stack spacing={2}>

          <FormInputText {...config} name="example" label="Example" />

          <FormInputText {...config} name="exampleRequired" label="Example required" />

          <FormInputDropdown
            name="iceCreamType"
            {...config} 
            label="Ice Cream Type"
            options={iceCreamOptions}
          />

          <FormInputText {...config} name="age" label="Age" />

          <FormInputDate
            name="todaysDate"
            {...config}
            label="Today's date"
          />

          <FormInputDateTime
            name="todaysDateAndTime"
            {...config} 
            label="Today's date and time"
          />

          <FormInputMultiCheckbox
            name="days"
            {...config}
            label="Days"
            options={dayOptions}
          />

          <FormInputSlider
            name="volume"
            {...config} 
            label="Volume"
            min={0}
            max={10}
            step={1}
          />

          <Stack direction="row">
            <Button
              type="submit"
              variant="contained"
            >Submit</Button>
          </Stack>
        </Stack>

        <div>{JSON.stringify(watch(), null, 2)}</div>
      </>
    }}


  </FutureForm>

}