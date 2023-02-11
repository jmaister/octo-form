import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import esLocale from "date-fns/locale/es";
import * as yup from "yup";

import { Stack } from "@mui/material";

import {
    FormRenderContext,
    OctoForm,
    OnChangeFnType,
    OnSubmitFnType,
} from "../OctoForm";
import { OptionLabel } from "../components/FormInputProps";
import { FormInputText } from "../components/FormInputText";
import { FormInputDropdown } from "../components/FormInputDropdown";
import { FormInputDateTime } from "../components/FormInputDateTime";
import { FormInputDate } from "../components/FormInputDate";
import { FormInputMultiCheckbox } from "../components/FormInputMultiCheckbox";
import { FormInputSlider } from "../components/FormInputSlider";
import { FormInputCheckbox } from "../components/FormInputCheckbox";
import { ErrorList } from "../extra/ErrorList";
import { SubmitButton } from "../extra/SubmitButton";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "OctoForm",
    component: OctoForm,
    parameters: {
        formEnabled: {
            values: [true, false],
        },
    },
    argTypes: {
        schema: {
            control: false,
        },
        onSubmit: {
            control: false,
        },
        onChange: {
            control: false,
        },
        locale: {
            control: false,
        },
    }
} as ComponentMeta<typeof OctoForm>;

export const SimpleLogin: ComponentStory<typeof OctoForm> = (args) => {
    const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const defaultValues = {
        name: "",
        password: "",
    };

    const onSubmit: OnSubmitFnType<any> = async (data, context) => {
        console.log("data submitted", data);
    };

    const onFormChange: OnChangeFnType<any> = (
        data: any,
        ctx: FormRenderContext<any>,
        name,
        type
    ) => {
        console.log("data changed", data);
    };

    return (
        <OctoForm
            defaultValues={args.defaultValues}
            schema={schema}
            onSubmit={onSubmit}
            formEnabled={args.formEnabled}
            size={args.size}
            locale={esLocale}
            onChange={onFormChange}
        >
            <h1>Login</h1>
            <Stack spacing={2}>
                <FormInputText name="username" label="User name" />
                <FormInputText name="password" label="Password" />
                <Stack direction="row">
                    <SubmitButton label="Log In" />
                </Stack>
            </Stack>
        </OctoForm>
    );
};
SimpleLogin.args = {
    defaultValues: {
        username: "user1",
        password: "password1",
    },
    formEnabled: true,
    size: "medium",
};

export const FullExample: ComponentStory<typeof OctoForm> = () => {
    const defaultValues = {
        age: 1,
        iceCreamType: "",
        todaysDate: new Date(),
        volume: 3,
        days: [],
        todaysDateAndTime: new Date(),
        example: "",
        exampleRequired: "",
        isVegan: false,
        reasons: [{ id: "1", description: "reason 1" }],
    };

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

    const schema = yup.object({
        example: yup.string(),
        exampleRequired: yup.string().required(),
        iceCreamType: yup
            .string()
            .required()
            .oneOf(
                iceCreamOptions
                    .filter((o) => o.label != "")
                    .map((option) => option.value.toString())
            ),
        age: yup.number().positive().integer().moreThan(0).required(),
        todaysDate: yup.date().required(),
        todaysDateAndTime: yup.date().required(),
        days: yup
            .array()
            .of(
                yup
                    .string()
                    .required()
                    .oneOf(
                        dayOptions
                            .filter((o) => o.label != "")
                            .map((option) => option.value.toString())
                    )
            )
            .required(),
        volume: yup.number().positive().integer().min(0).max(10).required(),
        isVegan: yup.boolean().required(),
        reasons: yup.array().of(
            yup.object({
                id: yup.string().required(),
                description: yup.string().required(),
            })
        ),
    });

    const onSubmit: OnSubmitFnType<any> = async (data, context) => {
        console.log("data submitted", data);
    };

    const onFormChange: OnChangeFnType<any> = (
        data: any,
        ctx: FormRenderContext<any>,
        name,
        type
    ) => {
        console.log("data changed", data);
    };

    return (
        <OctoForm
            defaultValues={defaultValues}
            schema={schema}
            onSubmit={onSubmit}
            formEnabled={true}
            locale={esLocale}
            onChange={onFormChange}
        >
            <Stack spacing={2}>
                <FormInputText name="example" label="Example" />
                <FormInputText
                    name="exampleRequired"
                    label="Example required"
                />
                <FormInputDropdown
                    name="iceCreamType"
                    label="Ice Cream Type"
                    options={iceCreamOptions}
                />
                <FormInputText name="age" label="Age" />
                <FormInputDate name="todaysDate" label="Today's date" />
                <FormInputDateTime
                    name="todaysDateAndTime"
                    label="Today's date and time"
                />
                <FormInputMultiCheckbox
                    name="days"
                    label="Days"
                    options={dayOptions}
                />
                <FormInputSlider name="volume" label="Volume" />
                <FormInputCheckbox name="isVegan" label="Vegan" />

                <ErrorList />

                <Stack direction="row">
                    <SubmitButton label="Save" />
                </Stack>
            </Stack>
        </OctoForm>
    );
};
