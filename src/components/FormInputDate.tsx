import { useContext } from "react";

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { isRequired, sizeToClassName } from "../utils";
import { OctoFormContext } from "../OctoForm";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormInputDate = ({ name, label, enabled, size }: FormInputProps) => {
    const { control, schema, formEnabled, locale, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    size = size ?? ctx.size;
    const required = isRequired(schema, name);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (<>
              <label>{label} {required ? "*" : null}</label>
              <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    customInput={<input className={"form-control " + sizeToClassName(size)} />}
                    locale={locale}
                    dateFormat="P"
                    disabled={!enabled}
                />
            </>)}
        />
    );
};
