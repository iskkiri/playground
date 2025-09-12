import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateRange } from 'react-day-picker';
import DatePicker from './DatePicker';

const meta = {
  title: 'Form/DatePickerNew',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    mode: 'single',
    variant: 'readonly',
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
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기존 DatePicker (단일 날짜, 읽기전용)
export const Single: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date>();

    return (
      <DatePicker
        mode="single"
        variant="readonly"
        value={date}
        onChange={setDate}
      />
    );
  },
};

// 기존 TypeableDatePicker (단일 날짜, 타이핑 가능)
export const SingleTypeable: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date>();

    return (
      <DatePicker
        mode="single"
        variant="typeable"
        value={date}
        onChange={setDate}
      />
    );
  },
};

// 기존 RangeForOneDatePicker (범위 날짜, 하나의 캘린더)
export const Range: Story = {
  render: function Render() {
    const [dateRange, setDateRange] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });

    const handleDateRangeChange = useCallback((value: DateRange | undefined) => {
      setDateRange(value || { from: undefined, to: undefined });
    }, []);

    return (
      <DatePicker
        mode="range"
        variant="readonly"
        value={dateRange}
        onChange={handleDateRangeChange}
      />
    );
  },
};

// 기존 RangeForTwoDatePickers (범위 날짜, 두 개의 DatePicker)
export const RangeForTwoPickers: Story = {
  render: function Render() {
    const [dateRange, setDateRange] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });

    const onStartDateChange = useCallback((date: Date | undefined) => {
      setDateRange(prev => ({ ...prev, from: date }));
    }, []);

    const onEndDateChange = useCallback((date: Date | undefined) => {
      setDateRange(prev => ({ ...prev, to: date }));
    }, []);

    return (
      <div className="flex items-center gap-8">
        <DatePicker
          mode="range-start"
          variant="readonly"
          value={dateRange.from}
          onChange={onStartDateChange}
          rangeValue={dateRange}
          maxDate={dateRange.to}
        />
        <span>~</span>
        <DatePicker
          mode="range-end"
          variant="readonly"
          value={dateRange.to}
          onChange={onEndDateChange}
          rangeValue={dateRange}
          minDate={dateRange.from}
        />
      </div>
    );
  },
};