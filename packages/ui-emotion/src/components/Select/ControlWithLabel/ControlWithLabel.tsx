import { components, type ControlProps, type GroupBase } from 'react-select';
import { controlWithLabelCss } from './ControlWithLabel.styles';

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
      <label css={controlWithLabelCss.label}>{label}</label>
      <div css={controlWithLabelCss.valueIndicator}>{restProps.children}</div>
    </components.Control>
  );
}
