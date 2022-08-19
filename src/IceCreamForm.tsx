
import * as yup from "yup";
import { OptionLabel } from "./components/FormInputProps";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { FormInputText } from "./components/FormInputText";
import { SubmitHandler } from "react-hook-form";
import MuyForm from "./MuyForm";


const iceCreamOptions: OptionLabel[] = [
  { value: "", label: "-- Select a flavor --" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const schema = yup.object({
  name: yup.string().required(),
  iceCreamType: yup.string().oneOf(iceCreamOptions.filter(o => o.label != "").map(option => option.value.toString())),
  birthday: yup.date().required(),
  rating: yup.number().integer().min(0).max(10).required(),
});

export type IceCreamType = yup.InferType<typeof schema>;

export interface SampleFormProps {
  defaultValues: IceCreamType;
}

export function IceCreamForm({ defaultValues }: SampleFormProps) {

  const onSubmit: SubmitHandler<IceCreamType> = (data) => {
    console.log(data);
  }


  return <MuyForm defaultValues={defaultValues} schema={schema} onSubmit={onSubmit}>
        <Stack spacing={2}>

          <FormInputText name="name" label="Name" />

          {/*
          <FormInputDropdown
            name="iceCreamType"
            label="Ice Cream Type"
            options={iceCreamOptions}
          />

          <FormInputDate
            name="birthday"
            label="Birthday"
          />

          <FormInputSlider
            name="rating"
            label="Rating"
            min={0}
            max={10}
            step={1}
          />

        <div>{JSON.stringify(watch(), null, 2)}</div>

*/}

          <Stack direction="row">
            <Button
              type="submit"
              variant="contained"
            >Submit</Button>
          </Stack>
        </Stack>


  </MuyForm>

}