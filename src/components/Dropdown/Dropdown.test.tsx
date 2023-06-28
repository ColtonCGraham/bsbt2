import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'


import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  test("renders the Dropdown component", () => {
    render(<Dropdown headerText="Hello world!" />);
  });
});

describe("Running for disabled Dropdown", () => {
    it('should be disabled', () => {


      render(<Dropdown disabled/>)
      expect(screen.getByTestId('d1')).toHaveAttribute('disabled');
  });
});

