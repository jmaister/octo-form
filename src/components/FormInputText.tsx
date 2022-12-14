import { useContext } from "react";

import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import type { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { OctoFormContext } from "../OctoForm";

export const FormInputText = ({ name, label, enabled, rows }: FormInputProps) => {
    const { control, schema, formEnabled, size } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;
    const textRows = rows ?? 1;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    helperText={error?.message ?? ""}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    required={isRequired(schema, name)}
                    disabled={!enabled}
                    rows={textRows}
                    multiline={textRows > 1}
                    size={size}
                />
            )}
        />
    );
};

