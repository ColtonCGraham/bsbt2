import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Radio from "./Radio";
import { RadioProps } from "./Radio.types";

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "ReactComponentLibrary/Radio",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & RadioProps) => (
  <Radio data-testId="Radio-id" {...args} />
);
Primary.args = {
  disabled: false,
  label: "Radio",
};

export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & RadioProps) => (
  <Radio data-testId="Radio-id" {...args} />
);
Disabled.args = {
  disabled: true,
  label: "Disabled Radio",

};