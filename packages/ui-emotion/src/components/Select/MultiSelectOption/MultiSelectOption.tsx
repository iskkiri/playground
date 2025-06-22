import { components, type GroupBase, type OptionProps } from 'react-select';
import { multiSelectOptionCss } from './MultiSelectOption.styles';
import FeatherIcons from '@repo/theme/featherIcons';

export default function MultiSelectOption<
  Option = unknown,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: OptionProps<Option, IsMulti, Group>) {
  return (
    <components.Option {...props} css={multiSelectOptionCss.option}>
      <FeatherIcons.CheckSquare size={20} color={props.isSelected ? '#4E86FF' : '#C1C7CD'} />
      <span>{props.label}</span>
    </components.Option>
  );
}
