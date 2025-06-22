import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageUploadDropzoneComponent from './ImageUploadDropzone';

const meta = {
  title: 'components/Dropzone/ImageUploadDropzone',
  component: ImageUploadDropzoneComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImageUploadDropzoneComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageUploadDropzone: Story = {};
