import { createContext, useEffect, useState } from "react";

import { Control, FieldValues, FieldErrors, FormState, SubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch, UseFormTrigger, UseFormReset } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { findLocaleOrDefault } from "./locales";
import { Locale } from "date-fns";

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
    isSubmitAllowed: boolean;
    locale: Locale;
    trigger: UseFormTrigger<T>
    reset: UseFormReset<T>;
}

export type OnSubmitFnType<T extends FieldValues> = (data: T, context: FormRenderContext<T>) => void;

export interface FutureFormProps<T extends FieldValues> {
    defaultValues: T;
    schema: yup.AnyObjectSchema;
    onSubmit: OnSubmitFnType<T>;
    children?: React.ReactNode;
    formEnabled?: boolean;
    locale?: Locale;
}

export const OctoFormContext = createContext({} as FormRenderContext<any>);

export function OctoForm<T extends FieldValues>({ defaultValues, schema, onSubmit, children, formEnabled, locale }: FutureFormProps<T>) {
    type InferredType = yup.InferType<typeof schema>;

    const {
        control,
        register,
        handleSubmit,
        formState,
        watch,
        setValue,
        getValues,
        trigger,
        reset,
    } = useForm<InferredType>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
        mode: "onChange",
    });

    const [isFormEnabled, setFormEnabled] = useState<boolean>(formEnabled ?? true);
    useEffect(() => {
        setFormEnabled((formEnabled ?? true) && !formState.isSubmitting);
    }, [formState.isSubmitting, formEnabled]);

    const [isSubmitAllowed, setSubmitAllowed] = useState<boolean>(true);
    useEffect(() => {
        setSubmitAllowed(isFormEnabled && !formState.isSubmitting && formState.isDirty && formState.isValid);
    } , [isFormEnabled, formState.isSubmitting, formState.isDirty, formState.isValid]);

    const [errors, setErrors] = useState<FieldErrors>(formState.errors);
    useEffect(() => {
        setErrors(formState.errors);
    } , [formState.errors]);


    const renderProps: FormRenderContext<InferredType> = {
        control,
        register,
        setValue,
        getValues,
        schema,
        watch,
        formEnabled: isFormEnabled,
        formState,
        isSubmitAllowed,
        locale: findLocaleOrDefault(locale),
        trigger,
        reset,
    }

    // Wrap the onSubmit function to send the context
    const onSubmitHandler: SubmitHandler<InferredType> = (data) => {
        return onSubmit(data, renderProps);
    };

    return <form onSubmit={handleSubmit(onSubmitHandler)}>
        <OctoFormContext.Provider value={renderProps}>
            {children}
        </OctoFormContext.Provider>
    </form>;
};

