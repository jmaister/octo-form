import { Button, Container, Stack } from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { FormInputText } from "./components/FormInputText";
import { FormInputDropdown } from "./components/FormInputDropdown";
import { FormInputDate } from "./components/FormInputDate";
import { FormInputDateTime } from "./components/FormInputDateTime";
import { FormInputMultiCheckbox } from "./components/FormInputMultiCheckbox";
import { FormInputSlider } from "./components/FormInputSlider";
import { OptionLabel } from "./components/FormInputProps";

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

// https://mui.com/material-ui/react-select/
// https://mui.com/x/react-date-pickers/getting-started/

// https://react-hook-form.com/get-started/#IntegratingControlledInputs


const iceCreamOptions : OptionLabel[] = [
  { value: "", label: "-- no flavor --" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const dayOptions : OptionLabel[] = [
  {value:"", label:"-- no day --"},
  {value:"Monday", label:"Monday"},
  {value:"Tuesday", label:"Tuesday"},
  {value:"Wednesday", label:"Wednesday"},
  {value:"Thursday", label:"Thursday"},
  {value:"Friday", label:"Friday"},
  {value:"Saturday", label:"Saturday"},
  {value:"Sunday", label:"Sunday"},
];


// https://github.com/jquense/yup#typescript-integration
const schema = yup.object({
  example: yup.string(),
  exampleRequired: yup.string().required(),
  iceCreamType: yup.string().oneOf(iceCreamOptions.filter(o => o.label != "").map(option => option.value.toString())),
  age: yup.number().positive().integer().moreThan(0).required(),
  todaysDate: yup.date().required(),
  todaysDateAndTime: yup.date().required(),
  days: yup.array().of(yup.string().oneOf(dayOptions.filter(o => o.label != "").map(option => option.value.toString()))).required(),
  volume: yup.number().positive().integer().min(0).max(10).required(),
}).required();

export type FutureFormType = yup.InferType<typeof schema>;

/*
export type InputType = {
  example: string;
  exampleRequired: string;
  iceCreamType: string;
  age: number;
  todaysDate: Date;
  todaysDateAndTime: Date;
  days: string[];
  volume: number;
};
*/


export interface FutureFormProps {
  defaultValues: FutureFormType;
}


export default function FutureForm({ defaultValues }: FutureFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FutureFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  });

  const onSubmit: SubmitHandler<FutureFormType> = (data) => {
    console.log(data);
  }


  return <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={2}>

    <FormInputText control={control} name="example" label="Example" />

    <FormInputText control={control} name="exampleRequired" label="Example required" />

    <FormInputDropdown
        name="iceCreamType"
        control={control}
        label="Ice Cream Type"
        options={iceCreamOptions}
      />

    <FormInputText control={control} name="age" label="Age" />

    <FormInputDate
        name="todaysDate"
        control={control}
        label="Today's date"
      />

    <FormInputDateTime
        name="todaysDateAndTime"
        control={control}
        label="Today's date and time"
      />

    <FormInputMultiCheckbox
        name="days"
        control={control}
        label="Days"
        options={dayOptions}
      />

    <FormInputSlider
        name="volume"
        control={control}
        label="Volume"
        min={0}
        max={10}
        step={1}
      />
    </Stack>

    <Button
      type="submit"
      variant="contained"
      >Submit</Button>

      <div>{JSON.stringify(watch(), null, 2)}</div>
  </form>;
};

