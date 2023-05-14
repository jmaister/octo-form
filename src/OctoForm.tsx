import React, { createContext, useEffect, useState } from "react";

import { Control, FieldValues, FormState, SubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch, UseFormTrigger, UseFormReset, DeepPartial, UseFormResetField } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { findLocaleOrDefault } from "./locales";
import { Locale } from "date-fns";
import { Size } from "./utils";

// https://react-hook-form.com/get-started/#IntegratingControlledInputs


// For getting build configuration well done
// https://github.com/viclafouch/mui-tel-input/tree/505101b585476ae0a011acefbafe0776b07985c3

// From react-hook-form
// https://github.com/react-hook-form/react-hook-form/pull/762#issuecomment-571710411
// https://codesandbox.io/s/angry-haibt-mdfym?file=/src/forms/Form.tsx:497-509

export interface FormRenderContext<T extends FieldValues> {
    control: Control<T>;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    schema: yup.ObjectSchema<any>;
    watch: UseFormWatch<T>;
    formEnabled: boolean;
    formState: FormState<T>;
    isSubmitAllowed: boolean;
    locale: Locale;
    trigger: UseFormTrigger<T>
    reset: UseFormReset<T>;
    resetField: UseFormResetField<T>;
    size: Size;
}

export type OnSubmitFnType<T extends FieldValues> = (data: T, context: FormRenderContext<T>) => void;
export type OnChangeFnType<T extends FieldValues> = (
    data: T,
    context: FormRenderContext<T>,
    field:string|undefined,
    type:string|undefined
) => void;


export interface OctoFormProps<T extends FieldValues> {
    defaultValues: T;
    schema: yup.ObjectSchema<any>;
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
        resetField,
    } = useForm<T>({
        resolver: yupResolver(schema),
        // TODO: fix DeepPartial<T>
        defaultValues: defaultValues as DeepPartial<T>,
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

    const renderProps: FormRenderContext<T> = {
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
        resetField,
        size,
    }

    useEffect(() => {
        const subscription = watch((data, type) => {
            // TODO: fix onChange
            onChange?.(data as T, renderProps, type.name?.toString(), type.type?.toString());
            // console.log("watch triggered", data, type);
        });
        return () => subscription.unsubscribe();
    }, []);

    // Wrap the onSubmit function to send the context
    const onSubmitHandler: SubmitHandler<T> = (data) => {
        // TODO: check if the button has a type=submit, ignore otherwise
        return onSubmit(data, renderProps);
    };

    return <form onSubmit={handleSubmit(onSubmitHandler)}>
        <OctoFormContext.Provider value={renderProps}>
            {children}
        </OctoFormContext.Provider>
    </form>;
};

