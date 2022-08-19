
import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { isRequired } from "../utils";
import { useContext } from "react";
import { MuyFormContext } from "../OctoForm";

export const FormInputText = ({ name, label }: FormInputProps) => {
  const {control, schema} = useContext(MuyFormContext);

    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
        }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            required={isRequired(schema, name)}
          />
        )}
      />
    );
  };
   
