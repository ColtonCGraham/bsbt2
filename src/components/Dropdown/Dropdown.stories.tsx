import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";
import { DropdownProps } from "./Dropdown.types";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "ReactComponentLibrary/Dropdown",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & DropdownProps) => (
  <Dropdown data-testId="Drop-id" {...args} />
);
Primary.args = {
  disabled: false,
  headerText: "Dropdown",
};

export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & DropdownProps) => (
  <Dropdown data-testId="Drop-id" {...args} />
);
Disabled.args = {
  disabled: true,
  headerText: "Disabled Dropdown",

};