import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useRef } from 'react';
import Button from '#src/Button/Button';
import Tiptap from './Tiptap';
import type { Editor } from '@tiptap/react';

const meta = {
  title: 'components/Editor/Tiptap',
  component: Tiptap,
  args: {
    ref: undefined,
  },
} satisfies Meta<typeof Tiptap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const editorRef = useRef<Editor>(null);

    const onSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (!editorRef.current) return;

        const editor = editorRef.current;

        const content = editor.getHTML();
        console.log('onSubmit', content);
      },
      [editorRef]
    );

    return (
      <form onSubmit={onSubmit}>
        <Tiptap
          ref={editorRef}
          // height={500}
        />

        <Button
          type="submit"
          variant="primary"
          style={{
            display: 'block',
            width: 100,
            marginLeft: 'auto',
            marginTop: 32,
          }}
        >
          작성
        </Button>
      </form>
    );
  },
};
