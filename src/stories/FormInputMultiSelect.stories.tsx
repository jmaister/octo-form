import { useState } from "react";

import { StoryFn, Meta } from "@storybook/react";

import * as yup from 'yup';

import { OctoForm } from "../OctoForm";
import { FormInputMultiSelect } from "../components/FormInputMultiSelect";

export default {
    title: "FormInputMultiSelect",
    component: FormInputMultiSelect,
} as Meta<typeof FormInputMultiSelect>;

export const Dropdown: StoryFn<typeof FormInputMultiSelect> = (args) => {
    const [v, setV] = useState<any>();

    type FormValuesType = {
        flavor: string;
    };

    const schema = yup.object({
        flavor: yup.array().of(yup.object()).required(),
    });
    const defaultValues:FormValuesType = {
        flavor: "",
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues} onChange={(d) => setV(d)}>
        <pre>{`
    const schema = yup.object({
        flavor: yup.string().oneOf(["pineaple", "vanilla", "chocolate"]).required(),
    });
        `}</pre>
        <FormInputMultiSelect {...args} />
        <div>Value: {JSON.stringify(v)}</div>
    </OctoForm>;
};
Dropdown.args = {
    name: "flavor",
    label: "Preferred flavor",
    options: [
        { value: "pineaple", label: "Pineaple" },
        { value: "vanilla", label: "Vanilla" },
        { value: "chocolate", label: "Chocolate" },
    ],
};
