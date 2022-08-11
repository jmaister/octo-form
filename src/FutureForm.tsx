import { Button, Input, MenuItem, Select, TextField } from "@mui/material";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { DateTimePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormInputText } from "./components/FormInputText";

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

// https://mui.com/material-ui/react-select/
// https://mui.com/x/react-date-pickers/getting-started/

// https://react-hook-form.com/get-started/#IntegratingControlledInputs

type iceCreamType = {
    label: string
    value: string
}

type InputType = {
  example: string;
  exampleRequired: string;
  iceCreamType: string;
  age: number;
  todaysDate: Date;
  todaysDateAndTime: Date;
};

const options : iceCreamType[] = [
    { value: "", label: "-- no flavor --" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

const schema = yup.object({
    example: yup.string(),
    exampleRequired: yup.string().required(),
    iceCreamType: yup.string().oneOf(options.filter(o => o.value != "").map(option => option.value)),
    age: yup.number().positive().integer().moreThan(0).required(),
    todaysDate: yup.date().required(),
    todaysDateAndTime: yup.date().required(),
  }).required();

function FutureForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: yupResolver(schema),
    defaultValues: {
        age: 1,
        iceCreamType: "",
        todaysDate: new Date(),
    }
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
            {options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem >)}
        </Select>}
      />
      <p>{errors.iceCreamType?.message}</p>
      <br />

    <Controller
        name="age"
        control={control}
        render={({ field }) => <TextField label="Age" placeholder="Age" {...field} />}
      />
      <p>{errors.age?.message}</p>
      <br />

    <FormInputText control={control} name="age" label="Age" />

    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
            name="todaysDate"
            control={control}
            render={({ field }) =>         <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                renderInput={(params) => <TextField {...params} />}
                {...field}
                />}
            />
            <p>{errors.todaysDate?.message}</p>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
            name="todaysDateAndTime"
            control={control}
            render={({ field }) =>         <DateTimePicker
                label="Date and time desktop"
                renderInput={(params) => <TextField {...params} />}
                {...field}
                />}
            />
            <p>{errors.todaysDateAndTime?.message}</p>
    </LocalizationProvider>

    <input type="submit" />
    <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
  </form>;
}

export default FutureForm;
