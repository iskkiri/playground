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
import PopoverTrigger from './PopoverTrigger';
import PopoverContent from './PopoverContent';

interface PopoverProps extends PopoverOptions {
  children: React.ReactNode;
}

/**
 * @docs https://floating-ui.com/docs/popover
 * @reference https://codesandbox.io/p/sandbox/distracted-swirles-jo1pvu?file=%2Fsrc%2FPopover.tsx%3A34%2C3-82%2C5
 */
export default function Popover({ children, ...options }: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(options.initialOpen ?? false);

  const isOpen = options.isOpen ?? uncontrolledOpen;
  const setIsOpen = options.onOpenChange ?? setUncontrolledOpen;

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
    enabled:
      options.isOpen === undefined || options.isOpen === null || options.isInteractionEnabled,
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
      ...interactions,
      ...data,
    }),
    [isOpen, setIsOpen, interactions, data]
  );

  return <PopoverContext.Provider value={values}>{children}</PopoverContext.Provider>;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
