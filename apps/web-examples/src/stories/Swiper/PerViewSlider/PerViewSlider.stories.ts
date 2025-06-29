import type { Meta, StoryObj } from '@storybook/nextjs';
import PerViewSliderComponent from './PerViewSlider';

const meta = {
  title: 'examples/Swiper/PerViewSlider',
  component: PerViewSliderComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PerViewSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerViewSlider: Story = {};
