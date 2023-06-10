import { InputHTMLAttributes } from "react";
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    key?: boolean;
    disabled?: boolean;
}
