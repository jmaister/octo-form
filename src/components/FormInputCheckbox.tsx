
import { FormInputProps } from "./FormInputProps";
import { useContext, useMemo } from "react";
import { OctoFormContext } from "../OctoForm";
import { randomId } from "../utils";

export const FormInputCheckbox = ({ name, label, enabled, size }: FormInputProps) => {
    const { control, schema, formEnabled, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    size = size ?? ctx.size;

    const id = useMemo(() => randomId(), []);

    // TODO: fix size

    return (
        <div className="form-check">
            <input
                className={`
                    form-check-input
                    ${ctx.formState.errors[name] ? "is-invalid" : ""}
                `}
                type="checkbox"
                {...ctx.register(name)}
                id={id}
                disabled={!enabled}
                />
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
        </div>
    );

};

