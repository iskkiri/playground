import { useCallback, useState } from 'react';

export interface UseDatePickerPopoverProps {
  variant: 'readonly' | 'typeable';
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useDatePickerPopover({
  variant,
  isOpen: isOpenProp,
  onOpenChange: onOpenChangeProp,
}: UseDatePickerPopoverProps) {
  // 내부 팝오버 상태 (제어되지 않는 경우)
  const [isInternalOpen, setIsInternalOpen] = useState(false);
  const isOpen = isOpenProp ?? isInternalOpen;
  const setIsOpen = onOpenChangeProp ?? setIsInternalOpen;

  // 텍스트 입력 포커스 시 달력 팝오버 닫기
  const closePopover = useCallback(() => setIsOpen(false), [setIsOpen]);

  // 텍스트 입력 클릭 시 달력 팝오버가 열리지 않도록 함 (typeable에서만 사용)
  const preventPopoverOpen = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (variant !== 'typeable') return;

      e.stopPropagation();
    },
    [variant]
  );

  // 캘린더 아이콘 클릭 시 달력 팝오버 토글 (typeable에서만 사용)
  const togglePopover = useCallback(() => {
    if (variant !== 'typeable') return;

    setIsOpen(!isOpen);
  }, [variant, isOpen, setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    closePopover,
    preventPopoverOpen,
    togglePopover,
  };
}
