import type { Meta, StoryObj } from '@storybook/nextjs';
import SwiperWithCustomClassComponent from './SwiperWithCustomClass';

const meta = {
  title: 'examples/Swiper/SwiperWithCustomClass',
  component: SwiperWithCustomClassComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SwiperWithCustomClassComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SwiperWithCustomClass: Story = {};
