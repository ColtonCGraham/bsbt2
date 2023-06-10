import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { HeroProps } from "./Hero.types";

import bg2 from "./Images/300x300.png";

const StyledHero = styled.div<HeroProps>`
  background-image: url(${bg2});
  border: 4px solid #000;
  pointer-events: hover;
  background-color: ${(props) => (props.disabled ? "grey" : "blue")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
  height: 325px;
  width:  325px;
  background-repeat: no-repeat;
  background-position: center;

`;
const Label = styled.p<HeroProps>`
text-align: center;
padding-top: 100px;
color: white;
font-size: 80px;
`


const Hero: React.FC<HeroProps> = ({
  disabled,
  label,
  ...props
}) => {
  return (

    <StyledHero disabled={disabled}>
      <Label disabled={disabled} {...props}>
        {label}
      </Label>
    </StyledHero>

  );
};

export default Hero;
