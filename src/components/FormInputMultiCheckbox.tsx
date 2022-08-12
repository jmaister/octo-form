
import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";


const ITEM_HEIGHT = 54;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const FormInputMultiCheckbox = ({name, control, label, options}: FormInputProps) => {
    

  const generateSelectOptions = (value:any) => {
    options = options || [];
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
          MenuProps={MenuProps}
          fullWidth
        >
          {generateSelectOptions(value)}
        </Select>
      </FormControl>      
      )}
    />
};