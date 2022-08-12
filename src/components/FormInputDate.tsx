
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { FormInputProps } from "./FormInputProps";


export const FormInputDate = ({ name, control, label } : FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
            name={name}
            control={control}
            render={({ field }) =>
                <DatePicker
                    label={label}
                    renderInput={(params) => 
                    <TextField {...params} />}
                        {...field}
                    />
                }
            />
    </LocalizationProvider>
  );
};