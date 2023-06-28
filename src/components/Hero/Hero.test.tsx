import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'


import Hero from "./Hero";

describe("Hero", () => {
  test("renders the Hero component", () => {
    render(<Hero/>);
  });
});

describe("Running for disabled Hero", () => {
    it('should be disabled', () => {


      render(<Hero disabled/>)
      expect(screen.getByTestId('heroTest')).toHaveAttribute('disabled');
  });
});
