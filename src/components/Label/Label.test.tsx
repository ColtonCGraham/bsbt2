import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'


import Label from "./Label";

describe("Label", () => {
  test("renders the Label component", () => {
    render(<Label text="Hello world!" />);
  });
});

describe("Running for disabled Label", () => {
    it('should be disabled', () => {


      render(<Label disabled/>)
      expect(screen.getByTestId('t1')).toHaveAttribute('disabled');
  });
});

