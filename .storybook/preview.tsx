import React from "react";
import type { Preview } from "@storybook/react";
import "../src/app/globals.css"; // Global styles
import StoreProvider from "../src/state-management/StoreProvider"; // Custom store provider
// import { withThemes } from '@storybook/addon-themes'; // Example addon

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Any other parameters you want to define can go here
  },
  decorators: [
    (Story) => {
      return (
        <StoreProvider>
          <Story />
        </StoreProvider>
      );
    },
    // withThemes, // Example decorator for theming
  ],
};

export default preview;
