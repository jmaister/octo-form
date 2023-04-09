
import { StoryFn, Meta } from "@storybook/react";

import * as yup from "yup";

import { FormInputSlider } from "../components/FormInputSlider";
import { OctoForm } from "../OctoForm";

export default {
    title: "FormInputSlider",
    component: FormInputSlider,
} as Meta<typeof FormInputSlider>;

export const Integer: StoryFn<typeof FormInputSlider> = (args) => {
    const schema = yup.object({
        volume: yup.number().integer().min(0).max(10),
    });
    const defaultValues = {
        volume: 5,
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues}>
        <FormInputSlider {...args} />
    </OctoForm>;
};
Integer.args = {
    name: "volume",
    label: "Volume",
};

export const Float: StoryFn<typeof FormInputSlider> = (args) => {
    const schema = yup.object({
        temperature: yup.number().min(0).max(100),
    });
    const defaultValues = {
        volume: 36.6,
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues}>
        <FormInputSlider {...args} />
    </OctoForm>;
};
Float.args = {
    name: "temperature",
    label: "Temperature"
};
