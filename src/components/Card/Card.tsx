import React, { FC, Fragment } from "react";
import  styled  from 'styled-components';
import { CardProps } from "./Card.types";
import bg from "./Images/300x300.png";


const Label = styled.p<CardProps>`
margin-top: 300px;
margin-left: 5px;
bottom: 0px;
color: ${(props) => (props.disabled ? "#666" : "#fff")};
font-size: 20px;
`;

const Title = styled.p<CardProps>`
margin-left: 5px;
bottom: 0px;
color: ${(props) => (props.disabled ? "#666" : "#fff")};
font-size: 15px;
`;


const StyledCard = styled.div<CardProps>`
  background-image: url(${bg});
  border: 4px solid #000;
  pointer-events: hover;
  background-color: ${(props) => (props.disabled ? "grey" : "blue")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
  height: 400px;
  width:  300px;
  background-repeat: no-repeat;
  background-position: top;
`;

const Card: React.FC<CardProps> = ({
  disabled,
  label,
  name,
  ...props
}) => {
  return (

    <StyledCard disabled={disabled} data-testid="c1">
      <Label disabled={disabled} {...props}>
        {label}
      </Label>
      <Title disabled={disabled} {...props}>
        {name}
      </Title>
    </StyledCard>

  );
};

export default Card;
