
import { StoryFn, Meta } from "@storybook/react";

import * as yup from 'yup';

import { FormInputText } from "../components/FormInputText";
import { OctoForm } from "../OctoForm";

export default {
    title: "FormInputText",
    component: FormInputText,
} as Meta<typeof FormInputText>;

export const Text: StoryFn<typeof FormInputText> = (args) => {

    type FormValuesType = {
        flavor: string;
    };

    const schema = yup.object({
        flavor: yup.string().required(),
    });
    const defaultValues:FormValuesType = {
        flavor: "",
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues}>
        <pre>{`
        const schema = yup.object({
            flavor: yup.string().required(),
        });
        `}</pre>
        <FormInputText {...args} />
    </OctoForm>;
};
Text.args = {
    name: "flavor",
    label: "Preferred flavor",
};
