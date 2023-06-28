import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Hero from "./Hero";
import { HeroProps } from "./Hero.types";

const meta: Meta<typeof Hero> = {
  component: Hero,
  title: "ReactComponentLibrary/Hero",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & HeroProps) => (
  <Hero data-testId="Hero-id" {...args} />
);
Primary.args = {
  disabled: false,
  label: "Enabled"
};

export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & HeroProps) => (
  <Hero data-testId="HeroField-id" {...args} />
);
Disabled.args = {
  disabled: true,
  label: "disabled"
};