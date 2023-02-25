
import { ComponentStory, ComponentMeta } from "@storybook/react";

import * as yup from "yup";
import { FormInputCheckbox } from "../components/FormInputCheckbox";

import { OctoForm } from "../OctoForm";

export default {
    title: "FormInputCheckbox",
    component: FormInputCheckbox,
} as ComponentMeta<typeof FormInputCheckbox>;

export const Checkbox: ComponentStory<typeof FormInputCheckbox> = (args) => {
    const schema = yup.object({
        acceptPolicy: yup.string().required(),
    });
    const defaultValues = {
        acceptPolicy: false,
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues}>
        <FormInputCheckbox {...args} />
    </OctoForm>;
};
Checkbox.args = {
    name: "acceptPolicy",
    label: "Accept Policy",
};
