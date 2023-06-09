import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { LabelProps } from "./Label.types";

const StyledLabel = styled.div<LabelProps>`
  font-size: 16px;
  color: ${(props) => (props.disabled ? "#a7a7d4" : "#080808")};
  background-color: ${(props) => (props.disabled ? "#d2dece" : "#3dfc03")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
  padding-bottom: 6px;
  height: 40px;
  border-radius: 5px;
  width: 160px;
`;

const Label: React.FC<LabelProps> = ({
  text,
  disabled,
  ...props
}) => {
  return (
    <StyledLabel
      disabled={disabled}
      {...props}>
      {text}
    </StyledLabel>
  );
};

export default Label;