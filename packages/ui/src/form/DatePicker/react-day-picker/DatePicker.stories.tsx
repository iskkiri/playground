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
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: null,
  },
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <DatePicker value={date} onChange={setDate}>
        <DatePicker.Input placeholder="날짜를 선택해주세요" />
        <DatePicker.Calendar />
      </DatePicker>
    );
  },
};

export const WithCustomStyles: Story = {
  args: {
    children: null,
  },
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <DatePicker value={date} onChange={setDate}>
        <DatePicker.Input placeholder="날짜를 선택해주세요" />
        <DatePicker.Calendar side="bottom" captionLayout="dropdown" />
      </DatePicker>
    );
  },
};

export const TypeableDatePicker: Story = {
  args: {
    children: null,
  },
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <DatePicker value={date} onChange={setDate}>
        <DatePicker.Input
          interaction="type"
          placeholder="날짜를 직접 입력하거나 아이콘을 클릭하세요"
          classNames={{ wrapper: 'w-300' }}
        />
        <DatePicker.Calendar />
      </DatePicker>
    );
  },
};

export const RangeDatePicker: Story = {
  args: {
    children: null,
  },
  render: function Render() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    return (
      <DatePicker mode="range" value={dateRange} onChange={setDateRange}>
        <DatePicker.Input placeholder="기간을 선택해주세요" classNames={{ wrapper: 'w-300' }} />
        <DatePicker.Calendar />
      </DatePicker>
    );
  },
};

export const RangeForTwoDatePickers: Story = {
  args: {
    children: null,
  },
  render: function Render() {
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

    return (
      <div className="flex items-center gap-8">
        <DatePicker mode="range-start" value={dateRange} onChange={onChangeStartDate}>
          <DatePicker.Input placeholder="시작일을 선택해주세요" />
          <DatePicker.Calendar />
        </DatePicker>

        <span>~</span>

        <DatePicker mode="range-end" value={dateRange} onChange={onChangeEndDate}>
          <DatePicker.Input placeholder="종료일을 선택해주세요" />
          <DatePicker.Calendar />
        </DatePicker>
      </div>
    );
  },
};
