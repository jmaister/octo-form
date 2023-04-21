import { useContext } from "react";

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { OctoFormContext } from "../OctoForm";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormInputDateTime = ({ name, label, enabled }: FormInputProps) => {
    const { control, schema, formEnabled, locale, size, ...ctx } = useContext(OctoFormContext);

    // TODO: allow to set the minutes steps

    enabled = enabled ?? formEnabled ?? true;
    const required = isRequired(schema, name);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (<>
              <label>{label} {required ? "*" : null}</label>
              <DatePicker
                    placeholderText="Select date and time"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    customInput={<input className="form-control" />}
                    locale={locale}
                    disabled={!enabled}
                    showTimeSelect
                    dateFormat="Pp"
                    timeFormat="p"
                    timeIntervals={1}
                />
            </>)}
        />
    );
};
