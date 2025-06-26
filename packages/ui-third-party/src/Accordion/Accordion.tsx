import './styles/accordion.scss';

import Collapse, { type CollapseProps } from 'rc-collapse';
import { accordionMotion } from './styles/accordionMotion.styles';
import FeatherIcons from '@repo/theme/featherIcons';
import { isActiveTypeGuard } from '@repo/utils/activeTypeGuard';
import { cn } from '@repo/utils/cn';

export default function Accordion({ className, ...props }: CollapseProps) {
  return (
    <Collapse
      {...props}
      /** 애니메이션 효과를 적용하기 위해 openMotion을 설정합니다. */
      openMotion={accordionMotion}
      /**
       * expandIcon을 커스텀하여 화살표 아이콘을 변경
       * 화살표를 클릭했을 때(collapsible='icon'), 토글이 되게 하기 위해서는 expandIcon을 사용해야 합니다.
       */
      expandIcon={
        props.expandIcon ??
        ((props) => {
          const isActive = isActiveTypeGuard(props) ? props.isActive : false;

          return (
            <FeatherIcons.ChevronDown
              color="#737373"
              className={cn('accordion__dropdown', isActive && 'accordion__dropdown--active')}
            />
          );
        })
      }
      className={cn('accordion', className)}
    />
  );
}
