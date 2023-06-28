import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'


import Text from "./Text";

describe("Text", () => {
  test("renders the Text component", () => {
    render(<Text text="Hello world!" />);
  });
});

describe("Running for disabled text", () => {
    it('should be disabled', () => {


      render(<Text disabled/>)
      expect(screen.getByTestId('t1')).toHaveAttribute('disabled');
  });
});

