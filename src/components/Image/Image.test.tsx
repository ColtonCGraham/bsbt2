import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'


import Image from "./Image";

describe("Image", () => {
  test("renders the Image component", () => {
    render(<Image/>);
  });
});

describe("Running for disabled Image", () => {
    it('should be disabled', () => {


      render(<Image disabled/>)
      expect(screen.getByTestId('ImageTest')).toHaveAttribute('disabled');
  });
});
