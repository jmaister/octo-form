
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { OctoFormContext } from "../OctoForm";
import { useContext } from "react";


export const FormInputDate = ({ name, label, enabled } : FormInputProps) => {
  const {control, schema, formEnabled} = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
            name={name}
            control={control}
            render={({ field }) =>
                <DatePicker
                    label={label}
                    disabled={!enabled}
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