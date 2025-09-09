import { components, type ContainerProps, type GroupBase } from 'react-select';

interface SelectContainerWithLabelProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends ContainerProps<Option, IsMulti, Group> {
  label: React.ReactNode;
}

export default function SelectContainerWithLabel<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ label, ...restProps }: SelectContainerWithLabelProps<Option, IsMulti, Group>) {
  return (
    <components.SelectContainer {...restProps}>
      <span className="typography-p5-12r absolute left-20 top-14 text-gray-700">{label}</span>
      {restProps.children}
    </components.SelectContainer>
  );
}
