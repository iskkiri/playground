import '../styles/select-control-with-label.scss';

import { components, type ControlProps, type GroupBase } from 'react-select';

interface SelectCusomControlWithLabelProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends ControlProps<Option, IsMulti, Group> {
  label: React.ReactNode;
}

export default function SelectCusomControlWithLabel<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ label, ...restProps }: SelectCusomControlWithLabelProps<Option, IsMulti, Group>) {
  return (
    <components.Control {...restProps}>
      <label className="select__control-with-label__label">{label}</label>
      <div className="select__control-with-label__value-indicator">{restProps.children}</div>
    </components.Control>
  );
}
