export interface FormInputProps {
  name: string;
  control: any;
  label: string;
}


export interface Option {
  value: string | number;
  label: string;
}

export interface FormInputPropsWithOptions extends FormInputProps {
  options: Option[];
}

export interface FormInputSliderProps extends FormInputProps {
  min: number;
  max: number;
  step: number;
}

