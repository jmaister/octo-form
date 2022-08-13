
import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputPropsWithOptions } from "./FormInputProps";


export const FormInputMultiCheckbox = ({name, control, label, options}: FormInputPropsWithOptions) => {
    

  const generateSelectOptions = (value:any) => {
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
        >
          {generateSelectOptions(value)}
        </Select>
      </FormControl>      
      )}
    />
};