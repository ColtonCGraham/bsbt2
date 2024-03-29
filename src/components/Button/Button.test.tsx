import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'

import Button from "./Button";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button text="Hello world!" />);
  });
});

describe("Running Test for Disabled Button", () => {

  test("Check Button Disabled", () => {
    render(<Button text="Button" disabled/>)
    expect(screen.getByRole('button',{name:"Button"})).toBeDisabled();
  });
});
