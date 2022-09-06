
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";
import { Checkbox, FormControlLabel } from "@mui/material";

export const FormInputCheckbox = ({ name, label, enabled }: FormInputProps) => {
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
                <FormControlLabel
                    control={<Checkbox checked={value} onChange={onChange} />}
                    disabled={!enabled}
                    label={label} />
            )}
        />
    );
};

