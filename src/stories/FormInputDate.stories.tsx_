
import { ComponentStory, ComponentMeta } from "@storybook/react";

import * as yup from "yup";
import { FormInputDate } from "../components/FormInputDate";

import { OctoForm } from "../OctoForm";

export default {
    title: "FormInputDate",
    component: FormInputDate,
} as ComponentMeta<typeof FormInputDate>;

export const Date: ComponentStory<typeof FormInputDate> = (args) => {
    const schema = yup.object({
        appointmentDate: yup.date().required(),
    });
    const defaultValues = {
        appointmentDate: null,
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues}>
        <FormInputDate {...args} />
    </OctoForm>;
};
Date.args = {
    name: "appointmentDate",
    label: "Appointment Date",
};
