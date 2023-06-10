import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Label from "./Label";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Label",
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;
export const Enabled = Template.bind({});

Enabled.args = {
  text: "I am a label"
};

const T2: ComponentStory<typeof Label> = (args) => <Label {...args} />;
export const Disabled = T2.bind({});

Disabled.args = {
  text: "I am disabled label",
  disabled: true,
};