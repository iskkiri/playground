import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateRange } from 'react-day-picker';
import DatePicker from './DatePicker';

const meta = {
  title: 'Form/DatePicker/ReactDayPicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    mode: 'single',
    variant: 'readonly',
    disabled: false,
    placeholder: '날짜를 선택해주세요.',
    placement: 'bottom',
    offsetOptions: { mainAxis: 12 },
    captionLayout: 'dropdown',
    dateFormat: 'YYYY-MM-DD',
    classNames: {
      input: 'w-300',
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'range', 'range-start', 'range-end'],
    },
    variant: {
      control: 'radio',
      options: ['readonly', 'typeable'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

// 기존 DatePicker (단일 날짜, 읽기전용)
export const Single: Story = {
  render: function Render(props) {
    const [date, setDate] = useState<Date>();

    return (
      <DatePicker
        {...props}
        mode="single"
        variant="readonly"
        value={date}
        onChange={setDate}
        placeholder="날짜를 선택해주세요."
      />
    );
  },
};

// 기존 TypeableDatePicker (단일 날짜, 타이핑 가능)
export const SingleTypeable: Story = {
  render: function Render(props) {
    const [date, setDate] = useState<Date>();

    return (
      <DatePicker
        {...props}
        mode="single"
        variant="typeable"
        value={date}
        onChange={setDate}
        placeholder="날짜를 선택해주세요."
      />
    );
  },
};

// 기존 RangeForOneDatePicker (범위 날짜, 하나의 캘린더)
export const Range: Story = {
  render: function Render(props) {
    const [dateRange, setDateRange] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });

    const onChangeDateRange = useCallback((value: DateRange | undefined) => {
      setDateRange(value || { from: undefined, to: undefined });
    }, []);

    return (
      <DatePicker
        {...props}
        mode="range"
        variant="readonly"
        value={dateRange}
        onChange={onChangeDateRange}
        placeholder="날짜를 선택해주세요."
      />
    );
  },
};

// 기존 RangeForTwoDatePickers (범위 날짜, 두 개의 DatePicker)
export const RangeForTwoPickers: Story = {
  render: function Render(props) {
    const [dateRange, setDateRange] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });

    const onChangeStartDate = useCallback((date: Date | undefined) => {
      setDateRange((prev) => ({ ...prev, from: date }));
    }, []);

    const onChangeEndDate = useCallback((date: Date | undefined) => {
      setDateRange((prev) => ({ ...prev, to: date }));
    }, []);

    console.log('dateRange', dateRange);

    return (
      <div className="flex items-center gap-8">
        <DatePicker
          {...props}
          mode="range-start"
          variant="readonly"
          value={dateRange.from}
          onChange={onChangeStartDate}
          rangeValue={dateRange}
          maxDate={dateRange.to}
          placeholder="시작 날짜를 선택해주세요."
        />

        <span>~</span>

        <DatePicker
          {...props}
          mode="range-end"
          variant="readonly"
          value={dateRange.to}
          onChange={onChangeEndDate}
          rangeValue={dateRange}
          minDate={dateRange.from}
          placeholder="종료 날짜를 선택해주세요."
        />
      </div>
    );
  },
};
