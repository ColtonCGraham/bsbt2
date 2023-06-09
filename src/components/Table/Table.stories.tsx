import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";
import { TableProps } from "./Table.types";

const meta: Meta<typeof Table> = {
  component: Table,
  title: "ReactComponentLibrary/Table",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & TableProps) => (
  <Table data-testId="Table-id" {...args} />
);
Primary.args = {
  disabled: false,
  headerText: "Header",
  dataText: "Data",
};

export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & TableProps) => (
  <Table data-testId="InputField-id" {...args} />
);
Disabled.args = {
  disabled: true,
  headerText: "Disabled Header",
  dataText: "Disabled Data",
};