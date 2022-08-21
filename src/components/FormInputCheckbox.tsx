

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";
import { Checkbox, FormControlLabel } from "@mui/material";

export const FormInputCheckbox = ({ name, label }: FormInputProps) => {
  const {control, schema, editable} = useContext(OctoFormContext);

    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
        }) => (
          <FormControlLabel control={<Checkbox value={value} onChange={onChange} />} label={label} />
        )}
      />
    );
  };
   
