
import { Stack } from "@mui/material";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useContext } from "react";

import { Controller } from "react-hook-form";
import { OctoFormContext } from "../OctoForm";
import { findParamNumber, findTest, isRequired } from "../utils";
import { FormInputProps } from "./FormInputProps";


export const FormInputSlider = ({ name, label }: FormInputProps) => {
  const {control, schema, watch} = useContext(OctoFormContext);

  const min = findParamNumber(name, schema, "min", "min");
  const max = findParamNumber(name, schema, "max", "max");
  const step = findTest(name, schema, "integer") ? 1 : 0.01;

  return <Controller
    name={name}
    control={control}
    render={({
      field: { onChange, value },
      fieldState: { error },
    }) => (
      <Stack direction="row">
        <Typography gutterBottom align="left" whiteSpace={"pre"} marginRight={3}>
          {label}{isRequired(schema, name) ? " * " : null}: {watch(name)}
        </Typography>
        <Slider
          onChange={onChange}
          value={value}
          min={min}
          max={max}
          step={step}
        />
      </Stack>
    )}
  />
};