import * as yup from "yup";

export interface FormInputProps {
  name: string;
  label: string;
}


export interface OptionLabel {
  value: string | number;
  label: string;
}

export interface FormInputPropsWithOptions extends FormInputProps {
  options: OptionLabel[];
}

export interface FormInputSliderProps extends FormInputProps {
  min: number;
  max: number;
  step: number;
}

