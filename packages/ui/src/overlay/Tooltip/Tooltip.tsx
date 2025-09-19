'use client';

import { useMemo, useRef, useState } from 'react';
import { TooltipContext } from './context/TooltipContext';
import TooltipContent from './components/TooltipContent';
import TooltipTrigger from './components/TooltipTrigger';
import type { TooltipOptions } from './types/tooltip.types';
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';

interface TooltipProps extends TooltipOptions {
  children: React.ReactNode;
  /**
   * controlled일 때(isOpen이 외부에서 주어졌을 경우) 내부 인터랙션은 기본적으로 비활성화
   * 만약 외부에서 상태값을 넘겨주고, 내부 인터랙션을 사용하고자 할 경우 isInteractionEnabled을 true로 설정
   * 스토리북 Controlled 예제 참고
   * */
  isInteractionEnabled?: boolean;
  /**
   * 화살표 표시 여부
   * @default false
   */
  isShowArrow?: boolean;
}

/**
 * @docs https://floating-ui.com/docs/tooltip
 * @reference https://codesandbox.io/p/sandbox/xenodochial-grass-js3bo9?file=%2Fsrc%2FTooltip.tsx%3A138%2C1-141%2C58
 */
export default function Tooltip({
  children,
  initialOpen = false,
  placement,
  isOpen: controlledOpen,
  onOpenChange: setControlledOpen,
  offsetOptions,
  isInteractionEnabled = false,
  isShowArrow = false,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  const arrowRef = useRef<SVGSVGElement>(null);

  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetOptions),
      flip(),
      shift(),
      ...(isShowArrow ? [arrow({ element: arrowRef })] : []),
    ],
  });

  const context = data.context;

  // 참조 요소 위에 마우스를 올려 놓았을 때 tooltip을 열거나 닫는 기능을 추가
  // move 옵션은 false로 설정되어 mousemove 이벤트가 무시
  const hover = useHover(context, {
    move: false,
    /**
     * @docs https://floating-ui.com/docs/usehover#handleclose
     * This allows the user to move the cursor off the reference element
     * and towards the floating element without it closing
     * (e.g. it has interactive content inside).
     */
    handleClose: safePolygon(), //
    enabled: controlledOpen === undefined || controlledOpen === null || isInteractionEnabled,
  });
  // 참조 요소에 포커스가 있을 때 tooltip을 열거나 닫는 기능을 추가
  const focus = useFocus(context, {
    enabled: controlledOpen === undefined || controlledOpen === null || isInteractionEnabled,
  });
  // 사용자가 Esc 키를 누를 때 tooltip을 닫는 기능을 추가
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  // 모든 prop을 렌더링에 사용할 수 있는 prop getter로 병합
  const interactions = useInteractions([hover, focus, dismiss, role]);

  const values = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      arrowRef,
      isShowArrow,
      ...interactions,
      ...data,
    }),
    [isOpen, setIsOpen, interactions, data, isShowArrow]
  );

  return <TooltipContext.Provider value={values}>{children}</TooltipContext.Provider>;
}

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
