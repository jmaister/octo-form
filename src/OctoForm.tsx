import { createContext, useEffect, useState } from "react";

import { Control, FieldValues, FormState, SubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch, UseFormTrigger, UseFormReset } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { findLocaleOrDefault } from "./locales";
import { Locale } from "date-fns";
import { Size } from "./utils";

import "bootstrap/dist/css/bootstrap.css";

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
    size: Size;
}

export type OnSubmitFnType<T extends FieldValues> = (data: T, context: FormRenderContext<T>) => void;
export type OnChangeFnType<T extends FieldValues> = (
    data: T,
    context: FormRenderContext<T>,
    field:string|undefined,
    type:string|undefined) => void;


export interface OctoFormProps<T extends FieldValues> {
    defaultValues: T;
    schema: yup.AnyObjectSchema;
    onSubmit: OnSubmitFnType<T>;
    onChange?: OnChangeFnType<T>;
    children?: React.ReactNode;
    formEnabled?: boolean;
    locale?: Locale;
    size?: Size;
}

export const OctoFormContext = createContext({} as FormRenderContext<any>);

export function OctoForm<T extends FieldValues>({ defaultValues, schema, onSubmit, onChange, children, formEnabled, locale, size }: OctoFormProps<T>) {
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
        size,
    }

    useEffect(() => {
        const { unsubscribe } = watch((data: T, { name, type }) => {
            onChange?.(data, renderProps, name?.toString(), type?.toString());
        });
        return () => unsubscribe();
    }, [watch]);

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

