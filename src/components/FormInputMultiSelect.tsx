import { useContext } from "react";



import { Controller } from "react-hook-form";
import { OctoFormContext } from "../OctoForm";
import { isRequired } from "../utils";
import FieldError from "../utils/FieldError";
import { MultiSelect } from "react-multi-select-component";
import { FormInputPropsWithOptions } from "./FormInputProps";


export const FormInputMultiSelect = ({ name, label, enabled, options }: FormInputPropsWithOptions) => {
    const { control, schema, formEnabled, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    const required = isRequired(schema, name);

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
                <MultiSelect
                    options={options}
                    value={value}
                    onChange={onChange}
                    labelledBy="Select"
                />
                <FieldError error={ctx.formState.errors[name]?.message?.toString()} />
            </>
        )}
    />
};
