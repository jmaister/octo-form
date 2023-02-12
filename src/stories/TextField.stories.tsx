
import { ComponentStory, ComponentMeta } from "@storybook/react";

import * as yup from "yup";

import { FormInputText } from "../components/FormInputText";
import { OctoForm } from "../OctoForm";

export default {
    title: "FormInputText",
    component: FormInputText,
} as ComponentMeta<typeof FormInputText>;

export const Text: ComponentStory<typeof FormInputText> = (args) => {
    const schema = yup.object({
        flavor: yup.string().required(),
    });
    const defaultValues = {
        flavor: "",
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues}>
        <FormInputText {...args} />
    </OctoForm>;
};
Text.args = {
    name: "flavor",
    label: "Preferred flavor",
};
