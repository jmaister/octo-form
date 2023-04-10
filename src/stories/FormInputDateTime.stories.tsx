
import { StoryFn, Meta } from "@storybook/react";

import * as yup from "yup";
import { FormInputDateTime } from "../components/FormInputDateTime";

import { OctoForm } from "../OctoForm";
import es from "date-fns/locale/es";

export default {
    title: "FormInputDateTime",
    component: FormInputDateTime,
} as Meta<typeof FormInputDateTime>;

export const Date: StoryFn<typeof FormInputDateTime> = (args) => {
    const schema = yup.object({
        appointmentDate: yup.date().required(),
    });
    const defaultValues = {
        appointmentDate: null,
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues} locale={es}>
        <FormInputDateTime {...args} />
    </OctoForm>;
};
Date.args = {
    name: "appointmentDateTime",
    label: "Appointment Date and time",
};
