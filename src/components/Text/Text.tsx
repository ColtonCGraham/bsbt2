import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { TextProps } from "./Text.types";

const StyledText = styled.div<TextProps>`
  font-size: 16px;
  color: ${(props) => (props.disabled ? "#a7a7d4" : "#080808")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
`;

const Text: React.FC<TextProps> = ({
  text,
  disabled,
  ...props
}) => {
  return (
    <StyledText
      disabled={disabled}
      {...props}>
      {text}
    </StyledText>
  );
};

export default Text;