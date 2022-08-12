export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  options?: Option[];
}


export interface Option {
  value: string | number;
  label: string;
}