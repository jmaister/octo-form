import { useContext } from "react";

import type { FormInputTextProps } from "./FormInputProps";
import { isRequired, sizeToClassName } from "../utils";
import { OctoFormContext } from "../OctoForm";
import FieldError from "../utils/FieldError";

export const FormInputText = ({ name, label, enabled, rows, size }: FormInputTextProps) => {
    const { control, schema, formEnabled, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    const textRows = rows ?? 1;
    size = size ?? ctx.size;

    if (textRows > 1) {
        return (
            <div className="mb-3">
                <label>{label} {isRequired(schema, name) ? "*" : null}</label>
                <textarea
                    {...ctx.register(name)}
                    className={`
                        form-control
                        ${ctx.formState.errors[name] ? "is-invalid" : ""}
                        ${sizeToClassName(size)}
                    `}
                    rows={textRows}
                    disabled={!enabled}
                />
                <FieldError error={ctx.formState.errors[name]?.message?.toString()} />
            </div>
        )
    } else {
        return (
            <div className="mb-3">
                <label>{label} {isRequired(schema, name) ? "*" : null}</label>
                <input
                    type="text"
                    {...ctx.register(name)}
                    className={`
                        form-control
                        ${ctx.formState.errors[name] ? "is-invalid" : ""}
                        ${sizeToClassName(size)}
                    `}
                    disabled={!enabled}
                />
                <FieldError error={ctx.formState.errors[name]?.message?.toString()} />
            </div>
        );
    }
};

