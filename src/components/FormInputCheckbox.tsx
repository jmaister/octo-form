
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const FormInputCheckbox = ({ name, label, enabled, size }: FormInputProps) => {
    const { control, schema, formEnabled, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    size = size ?? ctx.size;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <FormControlLabel
                    control={<Checkbox checked={value} onChange={onChange} size={size} />}
                    disabled={!enabled}
                    label={label} />
            )}
        />
    );
};

