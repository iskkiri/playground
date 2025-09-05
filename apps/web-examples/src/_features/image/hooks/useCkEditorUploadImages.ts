import { useCallback } from 'react';
import { base64toFile } from '@repo/utils/base64ToFileObj';
import type { CKEditor } from '@ckeditor/ckeditor5-react';
import type { ClassicEditor } from 'ckeditor5';
import useUploadImage from './react-query/useUploadImage';
import { nanoid } from 'nanoid';

// HTML 이미지 태그 정규표현식
export const base64ImageRegexForHtml = /<img.*?src="(data:image\/[^;]+;base64,[^"]+)"[^>]*>/g;

interface UseQuillEditorParams {
  editorRef: React.RefObject<CKEditor<ClassicEditor> | null>;
}

export default function useCkEditorUploadImages({ editorRef }: UseQuillEditorParams) {
  // 제출 시 서버 측에 이미지 업로드
  const { mutateAsync: uploadImageAsync } = useUploadImage();

  const onUploadImageWhenSubmit = useCallback(
    async ({ category }: { category: string }) => {
      if (!editorRef.current?.editor) return '';
      const editor = editorRef.current.editor;

      let htmlText = editor.getData();

      // 1) base64 이미지들을 추출
      const matchArray = [...htmlText.matchAll(base64ImageRegexForHtml)];

      if (matchArray.length) {
        // 첫 번째 인자는 정규표현식과 일치하는 텍스트(html image tag), 두 번째부터는 정규표현식의 capture 그룹과 일치하는 텍스트(base64)
        for (const [htmlImageTag, base64] of matchArray) {
          // 2) file 객체로 변환
          const file = await base64toFile({ base64, filename: nanoid() });

          try {
            // 3) 이미지 업로드 (formdata에 한 번에 넘기는 방식 X, 업로드된 이미지의 주소를 받아야만 하므로)
            const formData = new FormData();
            formData.append('file', file);
            const imageUrl = await uploadImageAsync({ formData, category });

            // 4-1) 이미지 업로드 성공시 src에 해당되는 부분을 업로드된 이미지의 주소로 교체
            htmlText = htmlText.replace(base64, imageUrl);
          } catch (_err) {
            // 4-2) 이미지 업로드 중 에러가 발생할 경우 해당 base64이미지 삭제 (base64 형태로 DB에 저장되는 것을 막기 위함)
            htmlText = htmlText.replace(htmlImageTag, '');
          }

          editor.setData(htmlText); // 변경된 내용을 에디터에도 반영
        }
      }

      return htmlText;
    },
    [editorRef, uploadImageAsync]
  );

  return { onUploadImageWhenSubmit };
}
