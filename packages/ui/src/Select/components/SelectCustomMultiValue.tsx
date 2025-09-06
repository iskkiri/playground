import '../styles/select-multi-value.scss';

import type { SelectOption } from '../types/select.types';
import { type GroupBase, type MultiValueProps } from 'react-select';

export default function SelectCustomMultiValue<
  Option extends SelectOption,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ data, index, getValue }: MultiValueProps<Option, IsMulti, Group>) {
  const selectedOptions = getValue();

  if (index > 2) {
    return null;
  }

  if (index === 2) {
    return <span className="select__multi-value__more-count">+{selectedOptions.length - 2}</span>;
  }

  return <div className="select__multi-value__selected-item">{data.label}</div>;
}
