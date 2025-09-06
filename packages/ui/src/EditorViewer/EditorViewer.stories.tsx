import type { Meta, StoryObj } from '@storybook/react-vite';
import EditorViewer from './EditorViewer';
import { mockEditorData } from './data/editor.data';

const meta = {
  title: 'components/EditorViewer',
  component: EditorViewer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockEditorData,
  },
};
