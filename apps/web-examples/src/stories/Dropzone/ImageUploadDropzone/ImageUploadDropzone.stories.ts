import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageUploadDropzoneComponent from './ImageUploadDropzone';

const meta = {
  title: 'examples/Dropzone/ImageUploadDropzone',
  component: ImageUploadDropzoneComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImageUploadDropzoneComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageUploadDropzone: Story = {};
