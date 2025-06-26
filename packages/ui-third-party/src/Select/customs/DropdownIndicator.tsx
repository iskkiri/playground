import '../styles/dropdown-indicator.scss';

import { components, DropdownIndicatorProps, type GroupBase } from 'react-select';
import FeatherIcons from '@repo/theme/featherIcons';
import { cn } from '@repo/utils/cn';

export default function DropdownIndicator<
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
          'dropdown-indicator__icon',
          props.selectProps.menuIsOpen && 'dropdown-indicator__icon--rotate'
        )}
        // css={[
        //   dropdownIndicatorCss.icon,
        //   props.selectProps.menuIsOpen && dropdownIndicatorCss.rotate,
        // ]}
      />
    </components.DropdownIndicator>
  );
}
