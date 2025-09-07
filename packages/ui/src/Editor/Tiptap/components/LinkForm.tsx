import Popover from '#src/FloatingUI/Popover/Popover';
import { Editor } from '@tiptap/react';
import { useState, useEffect } from 'react';
import { useTiptapDispatchContext, useTiptapStateContext } from '../hooks/useTiptapContext';
import { useSelectedTextPosition } from '../hooks/useSelectedTextPosition';

interface LinkFormProps {
  editor: Editor;
}

export default function LinkForm({ editor }: LinkFormProps) {
  const { isLinkFormOpen } = useTiptapStateContext();
  const { setIsLinkFormOpen } = useTiptapDispatchContext();

  // 선택된 텍스트의 위치 계산
  const position = useSelectedTextPosition(editor);

  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  // URL 유효성 검사 함수
  const validateUrl = (url: string): string => {
    if (!url.trim()) {
      return 'URL을 입력해주세요.';
    }

    try {
      // URL 생성자로 유효성 검사
      const urlObj = new URL(url);

      // http, https 프로토콜만 허용
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return 'http 또는 https URL만 사용할 수 있습니다.';
      }

      return '';
    } catch {
      // URL이 유효하지 않으면 https:// 추가해서 다시 시도
      try {
        new URL(`https://${url}`);
        return '';
      } catch {
        return '올바른 URL 형식이 아닙니다.';
      }
    }
  };

  // URL 정규화 함수 (https:// 자동 추가)
  const normalizeUrl = (url: string): string => {
    if (!url.trim()) return '';

    try {
      new URL(url);
      return url;
    } catch {
      return `https://${url}`;
    }
  };

  // 링크 설정 함수
  const handleSetLink = () => {
    const error = validateUrl(url);
    setUrlError(error);

    if (error) return;

    const normalizedUrl = normalizeUrl(url);
    const { from, to } = editor.state.selection;

    if (from === to) {
      // 선택된 텍스트가 없으면 링크가 포함된 텍스트를 직접 삽입
      editor.chain().focus().insertContent(`<a href="${normalizedUrl}">${normalizedUrl}</a>`).run();
    } else {
      // 선택된 텍스트에 링크만 설정
      editor.chain().focus().setLink({ href: normalizedUrl }).run();
    }

    // 폼 닫기 및 상태 초기화
    setIsLinkFormOpen(false);
    setUrl('');
    setUrlError('');
  };

  // 링크 제거 함수
  const handleUnsetLink = () => {
    editor.chain().focus().unsetLink().run();
    setIsLinkFormOpen(false);
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSetLink();
    }
    if (e.key === 'Escape') {
      setIsLinkFormOpen(false);
      setUrl('');
    }
  };

  // 기존 링크 감지 및 초기화
  const [hasExistingLink, setHasExistingLink] = useState(false);

  useEffect(() => {
    if (isLinkFormOpen) {
      // 현재 선택 영역의 링크 속성 확인
      const linkAttributes = editor.getAttributes('link');
      const existingUrl = linkAttributes.href || '';

      setUrl(existingUrl);
      setHasExistingLink(!!existingUrl);
      setUrlError(''); // 에러 상태 초기화
    }
  }, [isLinkFormOpen, editor]);

  return (
    <Popover
      isOpen={isLinkFormOpen}
      onOpenChange={setIsLinkFormOpen}
      placement="bottom-start"
      offsetOptions={{ mainAxis: 8 }}
    >
      {/* 
        선택된 텍스트의 좌측 하단에 위치하는 가상 Trigger
        - position.bottom: 선택된 텍스트의 하단 Y 좌표
        - position.left: 선택된 텍스트의 좌측 X 좌표
        - sr-only: 스크린 리더용으로만 보이는 요소 (시각적으로는 숨김)
      */}
      <Popover.Trigger asChild>
        <div
          className="sr-only bg-purple-300"
          // className="absolute h-10 w-10 bg-purple-300"
          style={{
            top: position.bottom,
            left: position.left,
          }}
        />
      </Popover.Trigger>

      <Popover.Content className="w-300 z-10 flex flex-col gap-12 border border-gray-100 bg-white p-16 shadow-sm">
        <div>
          <label htmlFor="link-url" className="text-14 mb-8 block font-medium text-neutral-900">
            링크 URL
          </label>
          <input
            id="link-url"
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (urlError) setUrlError(''); // 입력 중 에러 클리어
            }}
            onKeyDown={handleKeyPress}
            placeholder="https://example.com"
            className={`rounded-4 text-14 w-full border p-8 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              urlError
                ? 'border-danger focus:ring-danger focus:border-danger'
                : 'focus:ring-primary border-neutral-300 focus:border-transparent'
            }`}
            autoFocus
          />

          {urlError && <p className="text-12 text-danger mt-4">{urlError}</p>}
        </div>

        <div className="flex gap-8">
          <button
            onClick={handleSetLink}
            disabled={!url.trim()}
            className="bg-primary text-14 rounded-4 hover:bg-primary-hover focus:ring-primary flex-1 px-16 py-8 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {hasExistingLink ? '수정' : '확인'}
          </button>

          {hasExistingLink && (
            <button
              onClick={handleUnsetLink}
              className="bg-danger text-14 rounded-4 hover:bg-danger-hover focus:ring-danger px-16 py-8 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              제거
            </button>
          )}

          <button
            onClick={() => {
              setIsLinkFormOpen(false);
              setUrl('');
              setUrlError('');
              setHasExistingLink(false);
            }}
            className="text-14 rounded-4 flex-1 bg-neutral-100 px-16 py-8 font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
          >
            취소
          </button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
