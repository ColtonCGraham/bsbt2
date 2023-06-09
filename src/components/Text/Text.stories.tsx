import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";
import { TextProps } from "./Text.types";



const meta: Meta<typeof Text> = {
  component: Text,
  title:  "ReactComponentLibrary/Text",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Text>;


export const Primary: Story = (args: React.JSX.IntrinsicAttributes & TextProps) => (
  <Text data-testId="PrimaryText" {...args} />
);
Primary.args = {
  disabled: false,
  text: "I am text",
};

export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & TextProps) => (
  <Text data-testId="Text" {...args} />
);
Disabled.args = {
  disabled: true,
  text: "I am disabled text",
};