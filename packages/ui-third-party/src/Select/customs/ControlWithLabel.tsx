import '../styles/contorl-with-label.scss';

import { components, type ControlProps, type GroupBase } from 'react-select';

interface ControlWithLabelProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends ControlProps<Option, IsMulti, Group> {
  label: React.ReactNode;
}

export default function ControlWithLabel<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ label, ...restProps }: ControlWithLabelProps<Option, IsMulti, Group>) {
  return (
    <components.Control {...restProps}>
      <label className="control-with-label__label">{label}</label>
      <div className="control-with-label__value-indicator">{restProps.children}</div>
    </components.Control>
  );
}
