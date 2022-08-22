
import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";

export const FormInputText = ({ name, label, enabled }: FormInputProps) => {
    const { control, schema, formEnabled } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    required={isRequired(schema, name)}
                    disabled={!enabled}
                />
            )}
        />
    );
};

