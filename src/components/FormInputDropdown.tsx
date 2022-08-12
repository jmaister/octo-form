
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";


export const FormInputDropdown= ({name, control, label, options}: FormInputProps) => {
    

  const generateSelectOptions = () => {
    options = options || [];
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const labelId = "genid-" + name;

  return <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                onChange={onChange}
                value={value}
                label={label}
                >
            {generateSelectOptions()}
            </Select>
        </FormControl>
      )}
    />
};