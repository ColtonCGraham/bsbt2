import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { TableProps } from "./Table.types";

const StyledTable = styled.table<TableProps>`
  height: 100px;
  width: 600px;
  color: #333;
  border: 1px solid;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};
`;

const StyledRow = styled.tr<TableProps>`
  font-size: 14px;
  padding-bottom: 6px;
`;

const StyledHeader = styled.th<TableProps>`
  font-size: 14px;
  border: 1px solid;
  color: ${(props) => (props.disabled ? "#e4e3ea" : "#0328fc")};
  padding-top: 4px;
`;

const StyledData = styled.td<TableProps>`
border: 1px solid;
color: ${(props) => (props.disabled ? "#e4e3ea" : "#30cfa9")};
`;

const Table: FC<TableProps> = ({
  disabled,
  headerText,
  dataText,
  ...props
}) => {
  return (

    <StyledTable disabled={disabled}>
      <StyledRow>
        <StyledHeader disabled={disabled}
      {...props}>
      {headerText}

        </StyledHeader>
        <StyledHeader disabled={disabled}
      {...props}>
      {headerText}

        </StyledHeader>
        <StyledHeader disabled={disabled}
      {...props}>
      {headerText}

        </StyledHeader>
      </StyledRow>
      <StyledRow>
        <StyledData disabled={disabled}
      {...props}>
      {dataText}

        </StyledData>
        <StyledData disabled={disabled}
      {...props}>
      {dataText}

        </StyledData>
        <StyledData disabled={disabled}
      {...props}>
      {dataText}

        </StyledData>


      </StyledRow>
    </StyledTable>
  );
};

export default Table;