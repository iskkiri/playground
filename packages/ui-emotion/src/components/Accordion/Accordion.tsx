import './styles/accordion.css';

import Collapse, { type CollapseProps } from 'rc-collapse';
import { accordionMotion } from './styles/accordionMotion.styles';
import { accordionCss } from './Accordion.styles';
import FeatherIcons from '@repo/theme/featherIcons';
import theme from '#src/theme';
import type { Interpolation, Theme } from '@emotion/react';
import { isActiveTypeGuard } from './utils/accordion.util';

interface AccordionProps extends CollapseProps {
  cssStyle?: Interpolation<Theme>;
}

export default function Accordion({ cssStyle, ...props }: AccordionProps) {
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
              color={theme.colors.coolGray500}
              css={[accordionCss.dropdown, isActive && accordionCss.dropdownActive]}
            />
          );
        })
      }
      css={[accordionCss.collapse, cssStyle]}
    />
  );
}
