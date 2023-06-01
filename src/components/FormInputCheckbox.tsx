
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

    const pointer = {cursor: "pointer"};

    return (
        <div className="form-check" style={pointer}>
            <input
                className={`
                    form-check-input
                    ${ctx.formState.errors[name] ? "is-invalid" : ""}
                `}
                type="checkbox"
                {...ctx.register(name)}
                id={id}
                disabled={!enabled}
                style={pointer}
                />
            <label className="form-check-label" htmlFor={id} style={pointer}>
                {label}
            </label>
        </div>
    );

};

