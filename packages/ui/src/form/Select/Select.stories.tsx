import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controller, useForm } from 'react-hook-form';

import { SingleValue } from 'react-select';
import Select from './Select';
import SelectMultiValue from './components/SelectMultiValue';
import SelectMultiSelectOption from './components/SelectMultiSelectOption';
import SelectOption from './components/SelectOption';
import type { SelectOption as SelectOptionType } from './types/select.types';
import SelectContainerWithLabel from './components/SelectContainerWithLabel';

const mockOptions = [
  { label: 'Select List1', value: 'Select List1' },
  { label: 'Select List2', value: 'Select List2' },
  { label: 'Select List3', value: 'Select List3', isDisabled: true },
  { label: 'Select List4', value: 'Select List4' },
  { label: 'Select List5', value: 'Select List5' },
] satisfies SelectOptionType[];

const mockMultiSelectOptions = [
  { label: 'Select List1', value: 'Select List1' },
  { label: 'Select List2', value: 'Select List2' },
  { label: 'Select List3', value: 'Select List3', isDisabled: true },
  { label: 'Select List4', value: 'Select List4' },
  { label: 'Select List5', value: 'Select List5' },
  { label: 'Select List6', value: 'Select List6' },
  { label: 'Select List7', value: 'Select List7' },
  { label: 'Select List8', value: 'Select List8' },
  { label: 'Select List9', value: 'Select List9' },
  { label: 'Select List10', value: 'Select List10' },
] satisfies SelectOptionType[];

const isSingleValue = (option: unknown): option is SingleValue<SelectOptionType> => {
  if (option !== null && typeof option === 'object' && 'value' in option) return true;

  return false;
};

const meta = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options: mockOptions,
    onChange: () => {},
    value: null,
    placeholder: 'Select box',
    isClearable: false,
    isDisabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    const [value, setValue] = useState<string>();

    return (
      <div style={{ width: 240 }}>
        <Select
          {...props}
          options={mockOptions}
          // options의 타입으로부터 SingleValue<SelectOption> 타입이 추론되어야 하는데, 스토리북에서 타입추론이 안되는 이슈가 있음
          // => 실제 사용시에는 타입가드 불필요
          onChange={(option) => {
            if (!option) return;

            if (isSingleValue(option) && typeof option.value === 'string') {
              setValue(option.value);
            } else {
              setValue(undefined);
            }
          }}
          value={mockOptions.find((option) => option.value === value) ?? null}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function Render(props) {
    return (
      <div style={{ width: 240 }}>
        <Select {...props} isDisabled />
      </div>
    );
  },
};

export const ControllerExample: Story = {
  render: function Render(props) {
    const { control } = useForm<{ option: string }>({
      defaultValues: { option: '' },
    });

    return (
      <div style={{ width: 240 }}>
        <Controller
          control={control}
          name="option"
          render={({ field: { value, onChange } }) => (
            <Select
              {...props}
              options={mockOptions}
              onChange={(option) => isSingleValue(option) && onChange(option?.value)}
              value={mockOptions.find((option) => option.value === value) ?? null}
            />
          )}
        />
      </div>
    );
  },
};

export const SelectWithCustomOption: Story = {
  render: function Render(props) {
    const [value, setValue] = useState<string>();

    return (
      <div style={{ width: 240 }}>
        <Select
          {...props}
          // isDisabled
          options={mockOptions}
          // options의 타입으로부터 SingleValue<SelectOption> 타입이 추론되어야 하는데, 스토리북에서 타입추론이 안되는 이슈가 있음
          // => 실제 사용시에는 타입가드 불필요
          onChange={(option) => {
            if (!option) return;

            if (isSingleValue(option) && typeof option.value === 'string') {
              setValue(option.value);
            } else {
              setValue(undefined);
            }
          }}
          value={mockOptions.find((option) => option.value === value) ?? null}
          components={{ Option: SelectOption }}
        />
      </div>
    );
  },
};

export const SelectWithLabel: Story = {
  render: function Render(props) {
    const [value, setValue] = useState<string>();

    return (
      <div style={{ width: 240 }}>
        <Select
          {...props}
          options={mockOptions}
          // options의 타입으로부터 SingleValue<SelectOption> 타입이 추론되어야 하는데, 스토리북에서 타입추론이 안되는 이슈가 있음
          // => 실제 사용시에는 타입가드 불필요
          onChange={(option) => {
            if (!option) return;

            if (isSingleValue(option) && typeof option.value === 'string') {
              setValue(option.value);
            } else {
              setValue(undefined);
            }
          }}
          value={mockOptions.find((option) => option.value === value) ?? null}
          components={{
            SelectContainer: (props) => <SelectContainerWithLabel label="label" {...props} />,
          }}
          classNames={{
            container: () => 'relative',
            control: () => 'py-14 pt-32',
            dropdownIndicator: () => 'absolute right-20 top-24',
          }}
        />
      </div>
    );
  },
};

export const MultiSelectExample: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);

    return (
      <div style={{ width: 300 }}>
        <Select
          // 다중 선택
          isMulti
          // 선택 시 메뉴 닫기
          closeMenuOnSelect={false}
          // 선택된 옵션 숨김
          hideSelectedOptions={false}
          //
          options={mockMultiSelectOptions}
          value={mockMultiSelectOptions.filter((option) => values.includes(option.value))}
          onChange={(options) => {
            if (!options) return;

            setValues(options.map((option) => option.value));
          }}
          isClearable={false}
          components={{
            MultiValue: SelectMultiValue,
            Option: SelectMultiSelectOption,
          }}
        />
      </div>
    );
  },
};
