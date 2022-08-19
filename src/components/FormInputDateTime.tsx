
import { Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { useContext } from "react";
import { MuyFormContext } from "../MuyForm";


export const FormInputDateTime = ({ name, label } : FormInputProps) => {

  const {control, schema} = useContext(MuyFormContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
            name={name}
            control={control}
            render={({ field }) =>
                <DateTimePicker
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