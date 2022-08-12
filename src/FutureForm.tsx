import { Button, Input, MenuItem, Select, TextField } from "@mui/material";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { FormInputText } from "./components/FormInputText";
import { FormInputDropdown } from "./components/FormInputDropdown";
import { FormInputDate } from "./components/FormInputDate";
import { FormInputDateTime } from "./components/FormInputDateTime";
import { FormInputMultiCheckbox } from "./components/FormInputMultiCheckbox";
import { FormInputSlider } from "./components/FormInputSlider";
import { OptionLabel } from "./components/FormInputProps";
import { InputType } from "./Types";

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



export interface FutureFormProps {
  defaultValues: InputType;
  schema: yup.SchemaOf<InputType>;
}


export default function FutureForm({ defaultValues, schema }: FutureFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  });

  const onSubmit: SubmitHandler<InputType> = (data) => {
    console.log(data);
  }


  return <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
        name="example"
        control={control}
        defaultValue=""
        render={({ field }) => <Input placeholder="example2" title="example1" {...field} />}
      />
            <p>{errors.example?.message}</p>

    <br />


    <label htmlFor="exampleRequired">Example Required</label>
    <input {...register("exampleRequired", { required: true })} />
    {errors.exampleRequired?.message}
    <br />

    <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => <Select
            required={false}
            {...field}
            >
            {iceCreamOptions.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem >)}
        </Select>}
      />
      <p>{errors.iceCreamType?.message}</p>
      <br />
    
    <FormInputDropdown
        name="iceCreamType"
        control={control}
        label="Ice Cream Type"
        options={iceCreamOptions}
      />
      <br/>

    <Controller
        name="age"
        control={control}
        render={({ field }) => <TextField label="Age" placeholder="Age" {...field} />}
      />
      <p>{errors.age?.message}</p>
      <br />

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

    <Button
      type="submit"
      variant="contained"
      >Submit</Button>

      <div>{JSON.stringify(watch(), null, 2)}</div>
  </form>;
};

