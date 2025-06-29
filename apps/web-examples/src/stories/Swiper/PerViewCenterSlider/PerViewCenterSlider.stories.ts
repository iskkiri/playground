import type { Meta, StoryObj } from '@storybook/nextjs';
import PerViewCenterSliderComponent from './PerViewCenterSlider';

const meta = {
  title: 'examples/Swiper/PerViewCenterSlider',
  component: PerViewCenterSliderComponent,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PerViewCenterSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerViewCenterSlider: Story = {};
