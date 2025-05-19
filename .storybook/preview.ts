import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        {
          name: "blue",
          value: "blue",
        },
        {
          name: "red",
          value: "red",
        },
      ],
    },
  },
};

export default preview;
