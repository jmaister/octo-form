
import { Control, FieldValues, FormState, SubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { createContext, useEffect, useState } from "react";

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

// https://mui.com/material-ui/react-select/
// https://mui.com/x/react-date-pickers/getting-started/

// https://react-hook-form.com/get-started/#IntegratingControlledInputs


// For getting build configuration well done
// https://github.com/viclafouch/mui-tel-input/tree/505101b585476ae0a011acefbafe0776b07985c3

export interface FormRenderContext<T extends FieldValues> {
    control: Control;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    schema: yup.AnyObjectSchema;
    watch: UseFormWatch<T>;
    formEnabled: boolean;
    formState: FormState<T>;
}

export interface FutureFormProps<T extends FieldValues> {
    defaultValues: T;
    schema: yup.AnyObjectSchema;
    onSubmit: SubmitHandler<T>;
    children?: React.ReactNode;
    formEnabled?: boolean;
}

export const OctoFormContext = createContext({} as FormRenderContext<any>);

export function OctoForm<T extends FieldValues>({ defaultValues, schema, onSubmit, children, formEnabled }: FutureFormProps<T>) {
    type InferredType = yup.InferType<typeof schema>;

    const {
        control,
        register,
        handleSubmit,
        formState,
        watch,
        setValue,
        getValues,
    } = useForm<InferredType>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues
    });

    const [isFormEnabled, setFormEnabled] = useState<boolean>(formEnabled ?? true);
    useEffect(() => {
        setFormEnabled((formEnabled ?? true) && !formState.isSubmitting);
    }, [formState.isSubmitting, formEnabled]);

    const renderProps: FormRenderContext<InferredType> = {
        control,
        register,
        setValue,
        getValues,
        schema,
        watch,
        formEnabled: isFormEnabled,
        formState
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <OctoFormContext.Provider value={renderProps}>
            {children}
        </OctoFormContext.Provider>
    </form>;
};

