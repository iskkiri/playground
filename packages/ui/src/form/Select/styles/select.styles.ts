import type { GroupBase, ClassNamesConfig } from 'react-select';
import { cn } from '@repo/utils/cn';

// Helper functions for classNames
export const getContainerClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['container']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) => cn('', classNames?.container?.(state));

export const getControlClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['control']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) =>
  cn(
    'rounded-6 flex w-full cursor-pointer items-center justify-between border border-gray-400 bg-white px-20 py-8',
    state.isFocused && 'border-gray-700',
    state.menuIsOpen && 'border-gray-700',
    state.isDisabled && 'cursor-not-allowed border-gray-100 bg-gray-100',
    classNames?.control?.(state)
  );

export const getValueContainerClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['valueContainer']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) =>
  cn(
    'typography-p4-14r flex w-full items-center',
    state.isMulti && 'flex gap-4',
    classNames?.valueContainer?.(state)
  );

export const getPlaceholderClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['placeholder']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) => cn('text-gray-400', classNames?.placeholder?.(state));

export const getDropdownIndicatorClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['dropdownIndicator']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) =>
  cn(
    'text-gray-400 transition-transform duration-300',
    state.selectProps.menuIsOpen && 'rotate-180',
    state.isDisabled && 'text-gray-200',
    classNames?.dropdownIndicator?.(state)
  );

export const getSingleValueClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['singleValue']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) => cn('text-gray-700', classNames?.singleValue?.(state));

export const getMultiValueClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['multiValue']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) => cn('', classNames?.multiValue?.(state));

export const getMenuClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['menu']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) => cn('w-full py-8', classNames?.menu?.(state));

export const getMenuListClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['menuList']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) =>
  cn(
    'rounded-6 max-h-300 custom-scrollbar flex flex-col gap-4 overflow-auto border border-gray-300 bg-white p-10',
    classNames?.menuList?.(state)
  );

export const getOptionClassNames = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  state: Parameters<NonNullable<ClassNamesConfig<Option, IsMulti, Group>['option']>>[0],
  classNames?: ClassNamesConfig<Option, IsMulti, Group>
) =>
  cn(
    'rounded-6 typography-p4-14r flex cursor-pointer items-center bg-white px-16 py-8',
    state.isSelected && 'bg-primary text-white',
    state.isFocused && 'bg-primary-hover text-white',
    state.isSelected && state.isFocused && 'bg-primary text-white',
    state.isDisabled && 'cursor-not-allowed bg-gray-100 text-gray-300 hover:bg-gray-100',
    classNames?.option?.(state)
  );
