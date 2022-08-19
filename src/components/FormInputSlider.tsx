
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useContext } from "react";

import { Controller } from "react-hook-form";
import { MuyFormContext } from "../MuyForm";
import { findParamNumber, findTest, isRequired } from "../utils";
import { FormInputProps } from "./FormInputProps";


export const FormInputSlider = ({ name, label }: FormInputProps) => {
  const {control, schema} = useContext(MuyFormContext);

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
      <Box>
        <Typography gutterBottom align="left">{label}{isRequired(schema, name) ? " *" : null}</Typography>
        <Slider
          onChange={onChange}
          value={value}
          min={min}
          max={max}
          step={step}
        />
      </Box>
    )}
  />
};