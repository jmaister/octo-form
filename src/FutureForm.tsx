
import { Control, SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { OptionLabel } from "./components/FormInputProps";
import { ReactNode } from "react";

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

export interface FromRenderConfig {
  control: Control;
  schema: yup.AnyObjectSchema;
}

export interface FormRenderProps<T> {
  config: FromRenderConfig;
  watch: UseFormWatch<T>;
}

export interface FutureFormProps<T> {
  defaultValues: T;
  schema: yup.AnyObjectSchema;
  onSubmit: SubmitHandler<T>;
  children(props: FormRenderProps<T>): ReactNode;
}


export default function FutureForm<T>({ defaultValues, schema, onSubmit, children }: FutureFormProps<T>) {
  type InferredType = yup.InferType<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InferredType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  });


  const renderConfig: FromRenderConfig = {
    control,
    schema,
  };

  const renderProps : FormRenderProps<InferredType> = {
    config: renderConfig,
    watch,
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    {
      children(renderProps)
    }
  </form>;
};

