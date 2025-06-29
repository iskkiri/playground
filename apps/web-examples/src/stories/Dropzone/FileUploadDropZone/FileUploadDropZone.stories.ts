import type { Meta, StoryObj } from '@storybook/nextjs';
import FileUploadDropzoneComponent from './FileUploadDropZone';

const meta = {
  title: 'examples/Dropzone/FileUploadDropZone',
  component: FileUploadDropzoneComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FileUploadDropzoneComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileUploadDropZone: Story = {};
