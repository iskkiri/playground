import type { Meta, StoryObj } from '@storybook/nextjs';
import PerViewSliderExampleComponent from './PerViewSliderExample';

const meta = {
  title: 'examples/Swiper/PerViewSliderExample',
  component: PerViewSliderExampleComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PerViewSliderExampleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerViewSliderExample: Story = {};
