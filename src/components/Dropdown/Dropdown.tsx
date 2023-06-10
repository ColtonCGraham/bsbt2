import React, {FC, Component } from "react";
import styled from "styled-components";
import { DropdownProps } from "./Dropdown.types";

const StyledUl = styled.ul<DropdownProps>`
  list-style-type: none;
  width: 160px;
  overflow: hidden;
  background-color: ${(props) => (props.disabled ? "#777" : "#333")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
  padding:0px;
`;

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div<DropdownProps>`
  display: inline-block;
  color: white;
  text-align: left;
  min-width: 160px;
  padding: 14px 16px;
  text-decoration: none;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropDownLi = styled(StyledLi)<DropdownProps>`
  display: inline-block;
  &:hover {
    background-color: ${(props) => (props.disabled ? "" : "red")};
  }
  &:hover ${DropDownContent} {
    display: ${(props) => (props.disabled ? "" : "block")};
  }
`;

const SubA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
  }
`;


const Dropdown: FC<DropdownProps> = ({
  disabled,
  headerText,
  ...props
}) => {
  return (

    <StyledUl disabled={disabled}>
    <DropDownLi disabled={disabled}>
      <Dropbtn  {...props}>
        {headerText}
      </Dropbtn>
      <DropDownContent>
        {" "}
        <SubA>1</SubA>
        <SubA>2</SubA>
        <SubA>3</SubA>
      </DropDownContent>
    </DropDownLi>
  </StyledUl>
  );
};

export default Dropdown;

