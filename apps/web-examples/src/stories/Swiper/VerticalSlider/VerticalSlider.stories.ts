import type { Meta, StoryObj } from '@storybook/nextjs';
import VerticalSliderComponent from './VerticalSlider';

const meta = {
  title: 'examples/Swiper/VerticalSlider',
  component: VerticalSliderComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof VerticalSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalSlider: Story = {};
