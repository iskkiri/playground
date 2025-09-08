export interface SelectOption<TValue = string | number | boolean> {
  label: string;
  value: TValue;
  isDisabled?: boolean;
}
