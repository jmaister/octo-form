
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { Controller } from "react-hook-form";
import { isRequired } from "../utils";
import { FormInputSliderProps } from "./FormInputProps";


export const FormInputSlider = ({ name, control, schema, label, min = 0, max = 100, step = 1 }: FormInputSliderProps) => {

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