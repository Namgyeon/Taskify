import { CustomButton } from "../components/CustomButton";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Test/CustomButton",
  component: CustomButton,
};

export const ClickTestButton = {
  args: {
    variant: "outline",
    label: "Click!",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const primaryButton = await canvas.getByRole("button", {
      name: /Click/i,
    });
    await userEvent.click(primaryButton);
  },
};

export const Solid = {
  args: {
    variant: "solid",
    label: "Button",
  },
};

export const Outline = {
  args: {
    variant: "outline",
    label: "Button",
  },
};

export const Small = {
  args: {
    size: "sm",
    label: "Button",
  },
};

export const Medium = {
  args: {
    size: "md",
    label: "Button",
  },
};

export const Large = {
  args: {
    size: "lg",
    label: "Button",
  },
};
