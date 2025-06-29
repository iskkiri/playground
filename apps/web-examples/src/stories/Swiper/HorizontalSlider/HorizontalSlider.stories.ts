import type { Meta, StoryObj } from '@storybook/nextjs';
import HorizontalSliderComponent from './HorizontalSlider';

const meta = {
  title: 'examples/Swiper/HorizontalSlider',
  component: HorizontalSliderComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HorizontalSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalSlider: Story = {};
