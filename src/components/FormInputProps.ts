
export interface FormInputProps {
    name: string;
    label: string;
    enabled?: boolean;
}

export interface OptionLabel {
    label: string;
    value: string | number;
}

export interface FormInputPropsWithOptions extends FormInputProps {
    options: OptionLabel[];
}

