import React, {FC, Component } from "react";
import styled from "styled-components";
import { RadioProps } from "./Radio.types";




export const L1 = styled.label<RadioProps>`
   font-size: 1rem;
   font-weight: 600;
   color: ${(props) => props.disabled ? "#777" : "#333"};
   font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont,
       "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
       "Helvetica Neue", sans-serif;
`;


const Wrapper = styled.div<RadioProps>`
   display: flex;
   gap: 0.5rem;
   align-items: center;
   :disabled {
    cursor: not-allowed;
    border: 2px solid "333";
    background-color: "333";
    :hover {
      cursor: not-allowed;
       ::after {
          background-color: "333";
       }
    }
`;

export const Radio = styled.input<RadioProps>`
   -webkit-appearance: none;
   appearance: none;
   margin: 0;
   width: 1.5em;
   height: 1.5em;
   border: 2px solid ;
   border-radius: 50%;
   ::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 0.75em;
      height: 0.75em;
      margin: 3px;
   }

   :hover {
    ::after {
       background-color: "333"
    }
 }
 :focus {
    outline: 2px solid "333";
 }
 :checked {
    ::after {
       background-color: "333";
    }
    :hover {
       background-color: "333";
       border: 2px solid "333";
       ::after {
          background-color: "333"
       }
    }
 }
 :disabled {
  cursor: not-allowed;
  border: 2px solid "333";
  background-color: "333";
  :hover {
     ::after {
        background-color: "333";
     }
  }
  :checked {
     ::after {
        background-color: "333";
     }
     :hover {
        background-color: "333";
        ::after {
           background-color: "333";
        }
     }
  }
}
`;




const RadioButton = ({
  id,
  label,
  disabled = false,
  ...props
}: RadioProps) => {
  return (
      <Wrapper >
         <input

            type="radio"
            id={id}
            disabled={disabled}
            data-testid="t1"
            name = '1'
         />
         <L1 disabled={disabled}>{label} </L1>

         <input
            type="radio"
            id={id}
            disabled={disabled}
            name = '1'
         />
         <L1 disabled={disabled}>{label} </L1>

         <input
            type="radio"
            id={id}
            disabled={disabled}
            name = '1'
         />
         <L1 disabled={disabled}>{label} </L1>
      </Wrapper>

  );
};

export default RadioButton;