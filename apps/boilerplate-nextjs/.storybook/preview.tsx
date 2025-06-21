import '../src/styles/globals.css';

import React from 'react';
import type { Preview } from '@storybook/nextjs';
import { pretendard } from '../src/theme/fonts';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className={pretendard.className}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
