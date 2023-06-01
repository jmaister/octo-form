import { useContext } from "react";



import { Controller } from "react-hook-form";
import { OctoFormContext } from "../OctoForm";
import { isRequired } from "../utils";
import { FormInputPropsWithOptions } from "./FormInputProps";
import FieldError from "../utils/FieldError";


export const FormInputMultiCheckbox = ({ name, label, enabled, options }: FormInputPropsWithOptions) => {
    const { control, schema, formEnabled, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    const required = isRequired(schema, name);

    const pointer = {cursor: "pointer"};

    return <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({
            field: { onChange, value },
            fieldState: { error },
        }) => (
            <>
                <span>{label}{required ? " * " : ""}</span>
                <div
                    className="select"
                    {...ctx.register(name, { required: required })}
                    >
                    {options.map((option) => {
                        return (
                            // TODO: fix size
                            <div key={option.value} className="form-check" style={pointer}>
                                <input
                                    className="form-check-input"
                                    style={pointer}
                                    type="checkbox"
                                    id={option.value}
                                    value={option.value}
                                    checked={value.includes(option.value)}
                                    disabled={!enabled}
                                    onChange={(e) => {
                                        const set = new Set<String>(value);
                                        if (e.target.checked) {
                                            set.add(option.value);
                                        } else {
                                            set.delete(option.value);
                                        }
                                        onChange([...Array.from(set.values())]);
                                    }}  />
                                <label className="form-check-label" htmlFor={option.value} style={pointer}>
                                    {option.label}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <FieldError error={ctx.formState.errors[name]?.message?.toString()} />
            </>
        )}
    />
};
