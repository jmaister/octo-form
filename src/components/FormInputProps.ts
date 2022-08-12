export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options?: Option[];
}


export interface Option {
  value: string | number;
  label: string;
}