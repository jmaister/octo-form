import { Size } from "../utils";

export interface FormInputProps {
    name: string;
    label: string;
    enabled?: boolean;
    rows?: number;
    size?: Size;
}

export interface OptionLabel {
    label: string;
    value: string | number;
}

export interface FormInputPropsWithOptions extends FormInputProps {
    options: OptionLabel[];
}

