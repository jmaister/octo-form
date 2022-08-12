import React, { useEffect } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export interface FormInputSliderProps extends FormInputProps {
    min: number;
    max: number;
    step: number;
}

export const FormInputSlider = ({name,control,label, min=0, max=100, step=1}: FormInputSliderProps) => {

  return <Controller
      name={name}
      control={control}
      render={({          
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <Box>
        <Typography gutterBottom align="left">{label}</Typography>
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