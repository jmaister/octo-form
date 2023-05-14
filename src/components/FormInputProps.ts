import { Size } from "../utils";

export interface FormInputProps {
    name: string;
    label: string;
    enabled?: boolean;
    size?: Size;
}

export interface FormInputTextProps extends FormInputProps {
    rows?: number;
}

export interface OptionLabel {
    label: string;
    value: any;
}

export interface FormInputPropsWithOptions extends FormInputProps {
    options: OptionLabel[];
}

