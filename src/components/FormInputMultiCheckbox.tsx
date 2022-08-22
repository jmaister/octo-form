
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useContext } from "react";

import { Controller } from "react-hook-form";
import { OctoFormContext } from "../OctoForm";
import { isRequired } from "../utils";
import { FormInputPropsWithOptions } from "./FormInputProps";


export const FormInputMultiCheckbox = ({ name, label, enabled, options }: FormInputPropsWithOptions) => {
    const { control, schema, formEnabled } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;

    const generateSelectOptions = (value: any) => {
        return options.map((option) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    <Checkbox checked={value && value.indexOf(option.value) > -1} />
                    <ListItemText primary={option.label} />
                </MenuItem>
            );
        });
    };

    const labelId = "genid-" + name;

    return <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({
            field: { onChange, value },
            fieldState: { error },
        }) => (
            <FormControl fullWidth>
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    labelId={labelId}
                    multiple
                    value={value}
                    onChange={onChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    fullWidth
                    required={isRequired(schema, name)}
                    disabled={!enabled}
                >
                    {generateSelectOptions(value)}
                </Select>
            </FormControl>
        )}
    />
};
