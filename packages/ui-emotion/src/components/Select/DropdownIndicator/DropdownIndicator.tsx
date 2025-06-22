import { components, DropdownIndicatorProps, type GroupBase } from 'react-select';
import FeatherIcons from '@repo/theme/featherIcons';
import { dropdownIndicatorCss } from './DropdownIndicator.styles';

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
        css={[
          dropdownIndicatorCss.icon,
          props.selectProps.menuIsOpen && dropdownIndicatorCss.rotate,
        ]}
      />
    </components.DropdownIndicator>
  );
}
