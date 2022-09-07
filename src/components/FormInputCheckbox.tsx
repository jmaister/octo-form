
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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

