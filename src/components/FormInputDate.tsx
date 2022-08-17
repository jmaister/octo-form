
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";


export const FormInputDate = ({ name, control, schema, label } : FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
            name={name}
            control={control}
            render={({ field }) =>
                <DatePicker
                    label={label}
                    renderInput={(params) => 
                    <TextField 
                      {...params} 
                      required={isRequired(schema, name)}
                      />}
                    {...field}
                    />
                }
            />
    </LocalizationProvider>
  );
};