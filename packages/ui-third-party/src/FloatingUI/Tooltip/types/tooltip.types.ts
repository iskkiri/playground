import type { OffsetOptions, Placement } from '@floating-ui/react';

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  offsetOptions?: OffsetOptions;
  /**
   * controlled일 때(isOpen이 외부에서 주어졌을 경우) 내부 인터랙션은 기본적으로 비활성화
   * 만약 외부에서 상태값을 넘겨주고, 내부 인터랙션을 사용하고자 할 경우 isInteractionEnabled을 true로 설정
   * 스토리북 Controlled 예제 참고
   * */
  isInteractionEnabled?: boolean;
}
