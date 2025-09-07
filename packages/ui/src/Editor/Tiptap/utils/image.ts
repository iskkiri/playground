import type { Editor } from '@tiptap/react';

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      if (!e.target || typeof e.target.result !== 'string') {
        reject(new Error('Failed to read file'));
        return;
      }

      resolve(e.target.result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

export async function insertEditorImages(editor: Editor, files: File[]) {
  if (!files || files.length === 0) return;

  const fileList = [...files];

  try {
    for (const [index, file] of fileList.entries()) {
      const src = await readFileAsDataURL(file);

      editor
        .chain()
        .focus()
        .setResizableImage({
          src,
          'data-keep-ratio': true,
        })
        .run();

      // 다중 이미지 업로드 시 각 이미지가 p 태그로 감싸지도록 처리
      if (fileList.length > 1 && index < fileList.length - 1) {
        editor.chain().focus().insertContent('<p></p>').run();
      }
    }
  } catch (error) {
    console.error('Failed to upload images:', error);
  }
}
