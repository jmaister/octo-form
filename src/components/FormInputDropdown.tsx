import { useContext } from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Controller } from "react-hook-form";
import { OctoFormContext } from "../OctoForm";
import { isRequired } from "../utils";
import { FormInputPropsWithOptions } from "./FormInputProps";


export const FormInputDropdown= ({name, label, enabled, options}: FormInputPropsWithOptions) => {
  const {control, schema, formEnabled} = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;

  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const labelId = "genid-" + name;

  const required = isRequired(schema, name);

  return <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
     }) => (
        <FormControl fullWidth>
            <InputLabel id={labelId} required={required}>{label}</InputLabel>
            <Select
                labelId={labelId}
                onChange={onChange}
                value={value}
                label={label}
                required={required}
                disabled={!enabled}
                >
            {generateSelectOptions()}
            </Select>
            <FormHelperText hidden={!error}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
};
