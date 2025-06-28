import '../styles/select-dropdown-indicator.scss';

import { components, DropdownIndicatorProps, type GroupBase } from 'react-select';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';

export default function SelectCustomDropdownIndicator<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <FeatherIcons.ChevronDown
        color={'#A2A9B0'}
        size={20}
        className={cn(
          'select__dropdown-indicator__icon',
          props.selectProps.menuIsOpen && 'select__dropdown-indicator__icon--rotate'
        )}
        // css={[
        //   dropdownIndicatorCss.icon,
        //   props.selectProps.menuIsOpen && dropdownIndicatorCss.rotate,
        // ]}
      />
    </components.DropdownIndicator>
  );
}
