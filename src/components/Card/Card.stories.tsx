import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import { CardProps } from "./Card.types";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "ReactComponentLibrary/Card",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & CardProps) => (
  <Card data-testId="Card-id" {...args} />
);
Primary.args = {
  disabled: false,
  label: "Sally",
  name: "Horrible"
};

export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & CardProps) => (
  <Card data-testId="InputField-id" {...args} />
);
Disabled.args = {
  disabled: true,
  label: "John",
  name: "Assignment..."
};