
import { Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";


export const FormInputDateTime = ({ name, label, enabled }: FormInputProps) => {

  const { control, schema, formEnabled } = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          <DateTimePicker
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