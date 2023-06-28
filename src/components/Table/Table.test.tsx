import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'


import Table from "./Table";

describe("Table", () => {
  test("renders the Table component", () => {
    render(<Table  />);
  });
});

describe("Running for disabled Table", () => {
    it('should be disabled', () => {


      render(<Table disabled/>)
      expect(screen.getByTestId('t1')).toHaveAttribute('disabled');
  });
});



