import { GroupBase, OptionProps, components } from 'react-select';
import { selectOptionsCss } from './SelectOption.styles';
import FeatherIcons from '@repo/theme/featherIcons';

export default function SelectOption<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: OptionProps<Option, IsMulti, Group>) {
  return (
    <components.Option {...props} css={selectOptionsCss.option}>
      {props.label}
      {props.isSelected ? <FeatherIcons.Check width={20} height={20} /> : null}
    </components.Option>
  );
}
