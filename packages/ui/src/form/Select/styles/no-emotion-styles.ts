import type { GroupBase, StylesConfig } from 'react-select';

const returnEmptyStyles = () => ({});

/**
 * react-select의 기본 emotion 스타일을 완전히 제거하기 위한 설정
 *
 * unstyled prop을 적용하더라도 일부 기능적인 스타일은 남아있음.
 * emotion 스타일을 완전히 제거하기 위해서는 styles prop으로 빈 객체를 전달해야 함.
 *
 * @see https://react-select.com/styles#the-unstyled-prop
 */
export const noEmotionStyles = {
  container: returnEmptyStyles,
  control: returnEmptyStyles,
  valueContainer: returnEmptyStyles,
  placeholder: returnEmptyStyles,
  singleValue: returnEmptyStyles,
  multiValue: returnEmptyStyles,
  indicatorSeparator: returnEmptyStyles,
  clearIndicator: returnEmptyStyles,
  menu: returnEmptyStyles,
  menuList: returnEmptyStyles,
  option: returnEmptyStyles,
  dropdownIndicator: returnEmptyStyles,
  multiValueLabel: returnEmptyStyles,
  multiValueRemove: returnEmptyStyles,
  group: returnEmptyStyles,
  groupHeading: returnEmptyStyles,
  indicatorsContainer: returnEmptyStyles,
  input: returnEmptyStyles,
  loadingIndicator: returnEmptyStyles,
  loadingMessage: returnEmptyStyles,
  noOptionsMessage: returnEmptyStyles,
} satisfies StylesConfig<unknown, boolean, GroupBase<unknown>>;
