import type { Meta, StoryObj } from '@storybook/react-vite';
import FileUploadDropzoneComponent from './FileUploadDropZone';

const meta = {
  title: 'components/Dropzone/FileUploadDropZone',
  component: FileUploadDropzoneComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FileUploadDropzoneComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileUploadDropZone: Story = {};
