'use client';

import { useEffect, useId, useState } from 'react';
import ReactSelect, { GroupBase, Props } from 'react-select';
import SelectDropdownIndicator from './components/SelectDropdownIndicator';
import { noEmotionStyles } from './styles/no-emotion-styles';
import {
  getContainerClassNames,
  getControlClassNames,
  getValueContainerClassNames,
  getPlaceholderClassNames,
  getDropdownIndicatorClassNames,
  getSingleValueClassNames,
  getMultiValueClassNames,
  getMenuClassNames,
  getMenuListClassNames,
  getOptionClassNames,
} from './styles/select.styles';

export interface SelectProps {
  isPortal?: boolean;
}

export default function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  isPortal = true,
  components,
  classNames,
  ...props
}: SelectProps & Props<Option, IsMulti, Group>) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

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
      classNamePrefix="react-select"
      components={{
        DropdownIndicator: SelectDropdownIndicator,
        ...components,
      }}
      unstyled
      styles={noEmotionStyles}
      classNames={{
        container: (state) => getContainerClassNames(state, classNames),
        control: (state) => getControlClassNames(state, classNames),
        valueContainer: (state) => getValueContainerClassNames(state, classNames),
        placeholder: (state) => getPlaceholderClassNames(state, classNames),
        dropdownIndicator: (state) => getDropdownIndicatorClassNames(state, classNames),
        singleValue: (state) => getSingleValueClassNames(state, classNames),
        multiValue: (state) => getMultiValueClassNames(state, classNames),
        menu: (state) => getMenuClassNames(state, classNames),
        menuList: (state) => getMenuListClassNames(state, classNames),
        option: (state) => getOptionClassNames(state, classNames),
      }}
      {...props}
    />
  );
}
