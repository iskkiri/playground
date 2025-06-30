import '../src/_styles/globals.css';
import 'jotai-devtools/styles.css';

import type { Preview } from '@storybook/nextjs';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
