import { Button, Container, Stack } from "@mui/material";

import { Control, SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { FormInputText } from "./components/FormInputText";
import { FormInputDropdown } from "./components/FormInputDropdown";
import { FormInputDate } from "./components/FormInputDate";
import { FormInputDateTime } from "./components/FormInputDateTime";
import { FormInputMultiCheckbox } from "./components/FormInputMultiCheckbox";
import { FormInputSlider } from "./components/FormInputSlider";
import { OptionLabel } from "./components/FormInputProps";
import { LazyType } from "yup/lib/Lazy";
import React from "react";

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

// https://mui.com/material-ui/react-select/
// https://mui.com/x/react-date-pickers/getting-started/

// https://react-hook-form.com/get-started/#IntegratingControlledInputs


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


export interface FormRenderProps<T> {
  control: Control;
  watch: UseFormWatch<T>;
}



export interface FutureFormProps<T> {
  defaultValues: T;
  schema: yup.AnyObjectSchema;
  children(props: FormRenderProps<T>): React.ReactNode;
}


export default function FutureForm2<T>({ defaultValues, schema, children }: FutureFormProps<T>) {
  type FutureFormType = yup.InferType<typeof schema>;

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
    {
      children({ control, watch })
    }
  </form>;
};

