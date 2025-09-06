import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePicker from './DatePicker';
import { Controller, useForm } from 'react-hook-form';
import Button from '#src/Button/Button';

const meta = {
  title: 'components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    selected: null,
    onChange: () => {},
    disabled: false,
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: 300 }}>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText={'날짜를 선택해주세요.'}
          portalId="root-portal"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: 300 }}>
        <DatePicker
          disabled
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText={'날짜를 선택해주세요.'}
          portalId="root-portal"
        />
      </div>
    );
  },
};

export const DatePickerWithCustomButton: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: 300 }}>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText={'날짜를 선택해주세요.'}
          portalId="root-portal"
          cancelButton={({ onCancel }) => (
            <Button variant="gray" onClick={onCancel}>
              취소
            </Button>
          )}
          completeButton={({ onComplete }) => (
            <Button variant="danger" onClick={onComplete}>
              완료
            </Button>
          )}
        />
      </div>
    );
  },
};

export const ControllerExample: Story = {
  render: function Render() {
    const { control } = useForm<{ date: Date | null }>({
      defaultValues: { date: null },
    });

    return (
      <div style={{ width: 300 }}>
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <DatePicker
              selected={value}
              onChange={(date) => onChange(date)}
              placeholderText={'날짜를 선택해주세요.'}
              portalId="root-portal"
            />
          )}
        />
      </div>
    );
  },
};

export const Range: Story = {
  render: function Render() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 12px 300px',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <DatePicker
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          maxDate={endDate ?? undefined}
          placeholderText={'시작 날짜를 선택해주세요.'}
          portalId="root-portal"
        />
        <span>~</span>
        <DatePicker
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          minDate={startDate ?? undefined}
          placeholderText={'종료 날짜를 선택해주세요.'}
          portalId="root-portal"
        />
      </div>
    );
  },
};

export const RangeForOneDatepicker: Story = {
  render: function Render() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    return (
      <div style={{ width: 300 }}>
        <DatePicker
          selectsRange
          selected={startDate}
          onChange={onChange}
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          placeholderText={'기간을 선택해주세요.'}
          portalId="root-portal"
        />
      </div>
    );
  },
};
