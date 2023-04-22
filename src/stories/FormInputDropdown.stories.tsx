
import { StoryFn, Meta } from "@storybook/react";

import * as yup from 'yup';

import { OctoForm } from "../OctoForm";
import { FormInputDropdown } from "../components/FormInputDropdown";

export default {
    title: "FormInputDropdown",
    component: FormInputDropdown,
} as Meta<typeof FormInputDropdown>;

export const Dropdown: StoryFn<typeof FormInputDropdown> = (args) => {

    type FormValuesType = {
        flavor: string;
    };

    const schema = yup.object({
        flavor: yup.string().oneOf(["pineaple", "vanilla", "chocolate"]).required(),
    });
    const defaultValues:FormValuesType = {
        flavor: "",
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues}>
        <pre>{`
    const schema = yup.object({
        flavor: yup.string().oneOf(["pineaple", "vanilla", "chocolate"]).required(),
    });
        `}</pre>
        <FormInputDropdown {...args} />
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
