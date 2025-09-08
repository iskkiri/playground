import { useCallback, useState } from 'react';
import TextInput from '#src/TextInput/TextInput';
import Button from '#src/Button/Button';
import type { Editor, NodeViewRendererProps } from '@tiptap/react';

interface AltTextFormProps {
  editor: Editor;
  node: NodeViewRendererProps['node'];
  onCloseAltTextInput: () => void;
}

export default function ImageAltTextControl({
  editor,
  node,
  onCloseAltTextInput,
}: AltTextFormProps) {
  // 대체 문구
  const [altText, setAltText] = useState(node.attrs.alt || '');
  const onChangeAltText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value);
  }, []);

  // 대체 문구 제출
  const onSubmitAltText = useCallback(() => {
    const { from } = editor.state.selection;

    // 에디터 체인으로 속성 업데이트와 선택 유지를 동시에 처리
    editor
      .chain()
      .updateAttributes(node.type, {
        alt: altText,
      })
      .setNodeSelection(from)
      .run();

    onCloseAltTextInput();
  }, [editor, node.type, altText, onCloseAltTextInput]);

  const onKeyDownAltTextInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmitAltText();
      }
      if (e.key === 'Escape') {
        onCloseAltTextInput();
      }
    },
    [onSubmitAltText, onCloseAltTextInput]
  );

  return (
    <>
      <b className="typography-p4-14b">대체 문구</b>

      <TextInput
        type="text"
        value={altText}
        onChange={onChangeAltText}
        placeholder="대체 문구를 입력해주세요"
        onKeyDown={onKeyDownAltTextInput}
        autoFocus
        className="rounded-4 h-36 px-8"
      />

      <div className="flex justify-end gap-8">
        <Button variant="gray" size={32} onClick={onCloseAltTextInput}>
          취소
        </Button>

        <Button variant="primary" size={32} onClick={onSubmitAltText}>
          저장
        </Button>
      </div>
    </>
  );
}
