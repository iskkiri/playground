import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useRef } from 'react';
import Button from '#src/general/Button/Button';
import Tiptap from './Tiptap';
import type { Editor } from '@tiptap/react';

const meta = {
  title: 'RichContent/Tiptap',
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

    // 초기화
    useEffect(() => {
      if (!editorRef.current) return;

      const editor = editorRef.current;
      editor.commands.setContent('<p>Hello World!</p>');
    }, [editorRef]);

    // 제출
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
        <Tiptap ref={editorRef} />

        <Button type="submit" variant="primary" className="ml-auto mt-32">
          작성
        </Button>
      </form>
    );
  },
};
