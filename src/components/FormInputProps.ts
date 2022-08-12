export interface FormInputProps {
  name: string;
  control: any;
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

