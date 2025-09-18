'use client';

import { useMemo, useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { PopoverContext } from './context/PopoverContext';
import type { PopoverOptions } from './types/popover.types';
import PopoverTrigger from './components/PopoverTrigger';
import PopoverContent from './components/PopoverContent';

interface PopoverProps extends PopoverOptions {
  children: React.ReactNode;
  /**
   * controlled일 때(isOpen이 외부에서 주어졌을 경우) 내부 인터랙션은 기본적으로 비활성화
   * 만약 외부에서 상태값을 넘겨주고, 내부 인터랙션을 사용하고자 할 경우 isInteractionEnabled을 true로 설정
   * 스토리북 Controlled 예제 참고
   * */
  isInteractionEnabled?: boolean;
  /**
   * PopoverContent 내부의 요소를 클릭했을 때 팝오버를 닫을지 여부를 결정합니다.
   * 기본값은 false입니다.
   */
  dismissOnContentClick?: boolean;
  /**
   * PopoverContent 내부의 요소에 포커스를 주지 않을지 여부를 결정합니다.
   * 기본값은 false입니다.
   */
  isFocusDisabled?: boolean;
}

/**
 * @docs https://floating-ui.com/docs/popover
 * @reference https://codesandbox.io/p/sandbox/distracted-swirles-jo1pvu?file=%2Fsrc%2FPopover.tsx%3A34%2C3-82%2C5
 */
export default function Popover({ children, ...options }: PopoverProps) {
  const {
    isOpen: controlledOpen,
    onOpenChange: setControlledOpen,
    isInteractionEnabled,
    ...restOptions
  } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(options.initialOpen ?? false);

  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement: options.placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(options.offsetOptions), flip(), shift()],
  });

  const context = data.context;

  // 참조 요소를 클릭했을 때 popover를 열거나 닫는 기능을 추가
  const click = useClick(context, {
    enabled: controlledOpen === undefined || controlledOpen === null || isInteractionEnabled,
  });
  // 사용자가 Esc 키를 누를 때 popover를 닫는 기능을 추가
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // 모든 prop을 렌더링에 사용할 수 있는 prop getter로 병합
  const interactions = useInteractions([click, dismiss, role]);

  const values = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      ...restOptions,
      ...interactions,
      ...data,
    }),
    [isOpen, setIsOpen, restOptions, interactions, data]
  );

  return <PopoverContext.Provider value={values}>{children}</PopoverContext.Provider>;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
