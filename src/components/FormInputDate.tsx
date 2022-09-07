import { useContext } from "react";

import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { OctoFormContext } from "../OctoForm";


export const FormInputDate = ({ name, label, enabled } : FormInputProps) => {
  const {control, schema, formEnabled, locale} = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
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
