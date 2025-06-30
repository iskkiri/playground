import type { Meta, StoryObj } from '@storybook/nextjs';
import MultipleFileAttachment from './MultipleFileAttachment';
import { useEffect, useState } from 'react';
import type { FileSchema } from '../../schemas/file.schema';
import useInsertFiles from '../../hooks/useInsertFiles';
import { ModalProvider } from 'react-use-hook-modal';
import ReactModal from 'react-modal';

const meta = {
  title: 'examples/MultipleFileAttachment',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      useEffect(() => {
        ReactModal.setAppElement('body');
      }, []);

      return (
        <ModalProvider>
          <Story />
        </ModalProvider>
      );
    },
  ],
  args: {
    fields: [],
    onInsertFiles: () => {},
    onRemoveFile: () => () => {},
  },
} satisfies Meta<typeof MultipleFileAttachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [fields, setFields] = useState<FileSchema[]>([]);

    const { onInsertFiles, onRemoveFile } = useInsertFiles({
      append: (value) =>
        setFields((prev) => [...prev, ...(Array.isArray(value) ? value : [value])]),
      remove: (index) => setFields((prev) => prev.filter((_, i) => i !== index)),
      fileSizeLimit: 5,
    });

    return (
      <MultipleFileAttachment
        fields={fields}
        onInsertFiles={onInsertFiles}
        onRemoveFile={onRemoveFile}
      />
    );
  },
};
