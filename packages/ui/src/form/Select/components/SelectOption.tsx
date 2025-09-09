import { GroupBase, OptionProps, components } from 'react-select';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';

export default function SelectOption<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ className, ...props }: OptionProps<Option, IsMulti, Group>) {
  return (
    <components.Option {...props} className={cn('flex items-center justify-between', className)}>
      {props.label}
      {props.isSelected ? <FeatherIcons.Check width={20} height={20} /> : null}
    </components.Option>
  );
}
