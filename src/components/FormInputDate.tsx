
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { MuyFormContext } from "../OctoForm";
import { useContext } from "react";


export const FormInputDate = ({ name, label } : FormInputProps) => {
  const {control, schema} = useContext(MuyFormContext);

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