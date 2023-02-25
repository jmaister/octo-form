import { useContext } from "react";

import type { FormInputProps } from "./FormInputProps";
import { isRequired, sizeToClassName } from "../utils";
import { OctoFormContext } from "../OctoForm";
import FieldError from "../utils/FieldError";

export const FormInputText = ({ name, label, enabled, rows, size }: FormInputProps) => {
    const { control, schema, formEnabled, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    const textRows = rows ?? 1;
    size = size ?? ctx.size;

    // TODO: fix "rows" prop

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
            <div className="invalid-feedback">
                {ctx.formState.errors[name]?.message?.toString()}
            </div>
        </div>

    );
};

