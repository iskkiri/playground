'use client';

import './styles/select.scss';

import { useEffect, useId, useMemo, useState } from 'react';
import ReactSelect, { GroupBase, Props, type ControlProps } from 'react-select';
import SelectCustomDropdownIndicator from './components/SelectCustomDropdownIndicator';
import SelectCusomControlWithLabel from './components/SelectCusomControlWithLabel';
import { cn } from '@repo/utils/cn';

export interface SelectProps {
  isPortal?: boolean;
  label?: React.ReactNode;
}

export default function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  isPortal = true,
  label,
  className,
  components,
  ...props
}: SelectProps & Props<Option, IsMulti, Group>) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // label이 있을 경우 ControlWithLabel 컴포넌트를 메모이제이션하여 사용
  const MemoizedControlWithLabel = useMemo(() => {
    return function ControlWithLabelComponent(props: ControlProps<Option, IsMulti, Group>) {
      return <SelectCusomControlWithLabel label={label} {...props} />;
    };
  }, [label]);

  useEffect(() => {
    if (!isPortal) return;

    setPortalTarget(props.menuPortalTarget || document.body);
  }, [isPortal, props.menuPortalTarget]);

  return (
    <ReactSelect
      //
      instanceId={useId()}
      isSearchable={props.isSearchable || false}
      menuPortalTarget={portalTarget}
      menuPlacement={props.menuPlacement || 'auto'}
      unstyled
      /** 한 페이지에 여러 개의 Select가 있을 경우 중복되는 클래스 이름을 방지하기 위해 사용할 수 있음 */
      // classNames={{
      //   container: (_props) => 'custom-select__container',
      //   menu: (_props) => 'custom-select__menu',
      // }}
      className={cn('react-select-container', className)}
      classNamePrefix="react-select"
      components={{
        ...(label && { Control: MemoizedControlWithLabel }),
        DropdownIndicator: SelectCustomDropdownIndicator,
        ...components,
      }}
      {...props}
    />
  );
}
