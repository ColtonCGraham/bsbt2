import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'


import Radio from "./Radio";

describe("Radio", () => {
  test("renders the Radio component", () => {
    render(<Radio label="Hello world!" />);
  });
});

describe("Running for disabled Radio", () => {
    it('should be disabled', () => {


      render(<Radio disabled/>)
      expect(screen.getByTestId('t1')).toHaveAttribute('disabled');
  });
});

