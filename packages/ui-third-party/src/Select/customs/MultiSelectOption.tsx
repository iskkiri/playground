import '../styles/multi-select-option.scss';

import { components, type GroupBase, type OptionProps } from 'react-select';
import FeatherIcons from '@repo/theme/featherIcons';
import { cn } from '@repo/utils/cn';

export default function MultiSelectOption<
  Option = unknown,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: OptionProps<Option, IsMulti, Group>) {
  return (
    <components.Option {...props} className={cn('multi-select-option__option', props.className)}>
      <FeatherIcons.CheckSquare size={20} color={props.isSelected ? '#4E86FF' : '#C1C7CD'} />
      <span>{props.label}</span>
    </components.Option>
  );
}
