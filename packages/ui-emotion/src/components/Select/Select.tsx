import './styles/react-select.css';

import { useEffect, useId, useMemo, useState } from 'react';
import ReactSelect, { GroupBase, Props, type ControlProps } from 'react-select';
import { Global, type Interpolation, type Theme } from '@emotion/react';
import DropdownIndicator from './DropdownIndicator/DropdownIndicator';
import SelectOption from './SelectOption/SelectOption';
import { selectCss, selectPortalCss } from './Select.styles';
import ControlWithLabel from './ControlWithLabel/ControlWithLabel';

export interface SelectProps {
  isPortal?: boolean;
  cssStyle?: Interpolation<Theme>;
  label?: React.ReactNode;
}

export default function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ isPortal, cssStyle, label, ...props }: SelectProps & Props<Option, IsMulti, Group>) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // label이 있을 경우 ControlWithLabel 컴포넌트를 메모이제이션하여 사용
  const MemoizedControlWithLabel = useMemo(() => {
    return function ControlWithLabelComponent(props: ControlProps<Option, IsMulti, Group>) {
      return <ControlWithLabel label={label} {...props} />;
    };
  }, [label]);

  useEffect(() => {
    if (!isPortal) return;

    setPortalTarget(props.menuPortalTarget || document.body);
  }, [isPortal, props.menuPortalTarget]);

  return (
    <>
      {/* Portal을 사용할 경우 default portal element를 document.body로 설정하기 때문에 Global로 적용 */}
      {isPortal && (
        <Global
          styles={[selectPortalCss.portalMenu, cssStyle && selectPortalCss.portal(cssStyle)]}
        />
      )}

      <div css={[selectCss.control, selectCss.menu, cssStyle]}>
        <ReactSelect
          //
          {...props}
          instanceId={useId()}
          isSearchable={props.isSearchable || false}
          menuPortalTarget={portalTarget}
          menuPlacement={props.menuPlacement || 'auto'}
          unstyled
          className="react-select-container"
          classNamePrefix="react-select"
          components={{
            ...(label && { Control: MemoizedControlWithLabel }),
            DropdownIndicator,
            Option: SelectOption,
            ...props.components,
          }}
        />
      </div>
    </>
  );
}
