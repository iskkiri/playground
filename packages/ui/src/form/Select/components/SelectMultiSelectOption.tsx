import { components, type GroupBase, type OptionProps } from 'react-select';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';

export default function SelectMultiSelectOption<
  Option = unknown,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ className, ...props }: OptionProps<Option, IsMulti, Group>) {
  return (
    <components.Option {...props} className={cn('flex items-center gap-8', className)}>
      <FeatherIcons.CheckSquare size={20} />
      <span>{props.label}</span>
    </components.Option>
  );
}
