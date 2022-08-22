
export interface FormInputProps {
    name: string;
    label: string;
    enabled?: boolean;
    rows?: number;
}

export interface OptionLabel {
    label: string;
    value: string | number;
}

export interface FormInputPropsWithOptions extends FormInputProps {
    options: OptionLabel[];
}

