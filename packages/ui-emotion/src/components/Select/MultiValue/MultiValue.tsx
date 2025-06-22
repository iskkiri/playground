import type { SelectOption } from '../types/select.types';
import { type GroupBase, type MultiValueProps } from 'react-select';
import { multiValueCss } from './MultiValue.styles';

export default function MultiValue<
  Option extends SelectOption,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ data, index, getValue }: MultiValueProps<Option, IsMulti, Group>) {
  const selectedOptions = getValue();

  if (index > 2) {
    return null;
  }

  if (index === 2) {
    return <span css={multiValueCss.moreCount}>+{selectedOptions.length - 2}</span>;
  }

  return <div css={multiValueCss.selectedItem}>{data.label}</div>;
}
