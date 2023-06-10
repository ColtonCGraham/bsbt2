import React, { MouseEventHandler, InputHTMLAttributes } from 'react';
import * as styled_components from 'styled-components';

interface ButtonProps {
    text?: string;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

declare const Button: React.FC<ButtonProps>;

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    key?: boolean;
    disabled?: boolean;
}

declare const L1: styled_components.IStyledComponent<"web", "label", RadioProps, never>;
declare const Radio: styled_components.IStyledComponent<"web", "input", RadioProps, never>;

export { Button, L1, Radio };
