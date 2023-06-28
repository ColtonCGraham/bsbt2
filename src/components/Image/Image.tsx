import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { ImageProps } from "./Image.types";

import bg from "./Images/300x300.png";

const StyledImage = styled.div<ImageProps>`
  background-image: url(${bg});
  border: 4px solid #000;
  pointer-events: hover;
  background-color: ${(props) => (props.disabled ? "grey" : "blue")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
  height: 325px;
  width:  325px;
  background-repeat: no-repeat;
  background-position: center;
`;

const Image: React.FC<ImageProps> = ({
  disabled,
  ...props
}) => {
  return (

    <StyledImage disabled={disabled} data-testid="ImageTest" >


    </StyledImage>

  );
};

export default Image;
