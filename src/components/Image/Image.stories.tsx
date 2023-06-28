import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Image from "./Image";
import { ImageProps } from "./Image.types";
const meta: Meta<typeof Image> = {
  component: Image,
  title: "ReactComponentLibrary/Image",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Image>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & ImageProps) => (
  <Image data-testId="Image-id" {...args} />
);
Primary.args = {
  disabled: false,
};

export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & ImageProps) => (
  <Image data-testId="InputField-id" {...args} />
);
Disabled.args = {
  disabled: true,
};