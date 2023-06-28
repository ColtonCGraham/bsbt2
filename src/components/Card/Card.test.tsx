import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'
import bg2 from "./Images/300x300.png";

import Card from "./Card";

describe("Card", () => {
  test("renders the Card component", () => {
    render(<Card label="Hello world!" />);
  });
});

describe("Running for disabled Card", () => {
    it('should be disabled', () => {


      render(<Card disabled/>)
      expect(screen.getByTestId('c1')).toHaveAttribute('disabled');
  });
});


