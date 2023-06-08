import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom/extend-expect";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button text="Hello world!" />);
  });
});


//colors are changed in styled components on property changes
//tests are used to test logic not styles so checking for disabled instead of style change...
describe("Button", () => {
  test("is disabled", () => {
    render(<Button text="Disabled" disabled={true} />);
    const b =screen.getByText(/Disabled/i).closest('button');
    expect(b).toBeDisabled();
  });
});
