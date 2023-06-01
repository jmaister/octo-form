import { useState } from "react";

import { StoryFn, Meta } from "@storybook/react";

import * as yup from 'yup';

import { OctoForm } from "../OctoForm";
import { FormInputMultiCheckbox } from "../components/FormInputMultiCheckbox";

export default {
    title: "FormInputMultiCheckbox",
    component: FormInputMultiCheckbox,
} as Meta<typeof FormInputMultiCheckbox>;

export const MultiCheckbox: StoryFn<typeof FormInputMultiCheckbox> = (args) => {
    const [v, setV] = useState<any>();

    type FormValuesType = {
        flavor: string;
    };

    const schema = yup.object({
        flavor: yup.string().oneOf(["pineaple", "vanilla", "chocolate"]).required(),
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
        <FormInputMultiCheckbox {...args} />
        <div>Value: {JSON.stringify(v)}</div>
    </OctoForm>;
};
MultiCheckbox.args = {
    name: "flavor",
    label: "Preferred flavor",
    options: [
        { value: "pineaple", label: "Pineaple" },
        { value: "vanilla", label: "Vanilla" },
        { value: "chocolate", label: "Chocolate" },
    ],
};
