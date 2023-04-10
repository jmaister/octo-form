import { useContext } from "react";

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { OctoFormContext } from "../OctoForm";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormInputDate = ({ name, label, enabled }: FormInputProps) => {
    const { control, schema, formEnabled, locale, size, ...ctx } =
        useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    const required = isRequired(schema, name);

    const dateFormat = "dd/MM/yyyy";
    console.log("dateformat", locale);

    return (
        <Controller
            control={control}
            name="date-input"
            render={({ field }) => (<>
              <label>{label} {required ? "*" : null}</label>
              <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    customInput={<input className="form-control" />}
                    locale={locale}
                    dateFormat="P"
                    disabled={!enabled}
                />
            </>)}
        />
    );
};
