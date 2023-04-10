
import { StoryFn, Meta } from "@storybook/react";

import * as yup from "yup";
import { FormInputDate } from "../components/FormInputDate";

import { OctoForm } from "../OctoForm";
import es from "date-fns/locale/es";

export default {
    title: "FormInputDate",
    component: FormInputDate,
} as Meta<typeof FormInputDate>;

export const Date: StoryFn<typeof FormInputDate> = (args) => {
    const schema = yup.object({
        appointmentDate: yup.date().required(),
    });
    const defaultValues = {
        appointmentDate: null,
    };

    return <OctoForm schema={schema} onSubmit={() => {}} defaultValues={defaultValues} locale={es}>
        <FormInputDate {...args} />
    </OctoForm>;
};
Date.args = {
    name: "appointmentDate",
    label: "Appointment Date",
};
