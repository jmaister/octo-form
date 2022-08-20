
import { Control, SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { createContext, ReactNode } from "react";

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

// https://mui.com/material-ui/react-select/
// https://mui.com/x/react-date-pickers/getting-started/

// https://react-hook-form.com/get-started/#IntegratingControlledInputs


export interface FormRenderContext<T> {
  control: Control;
  schema: yup.AnyObjectSchema;
  watch: UseFormWatch<T>;
}

export interface FutureFormProps<T> {
  defaultValues: T;
  schema: yup.AnyObjectSchema;
  onSubmit: SubmitHandler<T>;
  children?: React.ReactNode;
}

export const OctoFormContext = createContext({} as FormRenderContext<any>);

export default function OctoForm<T>({ defaultValues, schema, onSubmit, children }: FutureFormProps<T>) {
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

  const renderProps : FormRenderContext<InferredType> = {
    control,
    schema,
    watch,
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <OctoFormContext.Provider value={renderProps}>
      {children}
    </OctoFormContext.Provider>
  </form>;
};

