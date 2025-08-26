import type { OffsetOptions, OpenChangeReason, Placement } from '@floating-ui/react';

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  isOpen?: boolean;
  onOpenChange?(open: boolean, event?: Event, reason?: OpenChangeReason): void;
  offsetOptions?: OffsetOptions;
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
}
