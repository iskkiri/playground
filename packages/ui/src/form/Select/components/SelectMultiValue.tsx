import type { SelectOption } from '../types/select.types';
import { type GroupBase, type MultiValueProps } from 'react-select';

export default function SelectMultiValue<
  Option extends SelectOption,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ data, index, getValue }: MultiValueProps<Option, IsMulti, Group>) {
  const selectedOptions = getValue();

  if (index > 2) {
    return null;
  }

  if (index === 2) {
    return (
      <span className="typography-p4-14r rounded-full bg-gray-100 px-8 py-4 text-gray-700">
        +{selectedOptions.length - 2}
      </span>
    );
  }

  return (
    <div className="typography-p4-14r rounded-full bg-gray-100 px-8 py-4 text-gray-700">
      {data.label}
    </div>
  );
}
