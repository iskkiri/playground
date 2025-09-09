import { components, DropdownIndicatorProps, type GroupBase } from 'react-select';
import FeatherIcons from '@repo/icons/featherIcons';

export default function SelectDropdownIndicator<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <FeatherIcons.ChevronDown size={20} />
    </components.DropdownIndicator>
  );
}
