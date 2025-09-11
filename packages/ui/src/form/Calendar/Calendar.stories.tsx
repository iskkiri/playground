import { useCallback, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from './Calendar';
import Popover from '#src/overlay/Popover/Popover';
import PopoverTrigger from '#src/overlay/Popover/PopoverTrigger';
import TextInput from '../TextInput/TextInput';
import PopoverContent from '#src/overlay/Popover/PopoverContent';
import FeatherIcons from '@repo/icons/featherIcons';
import { formatDate, isValidDateFormat } from '@repo/utils/formatDate';
import { useDateInputFormatter } from './hooks/useDateInputFormatter';

const meta = {
  title: 'Form/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    mode: 'single',
    disabled: false,
    hidden: false,
    showOutsideDays: true,
    captionLayout: 'label',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'range'],
    },
    captionLayout: {
      control: 'radio',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DatePicker: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date>();

    const onSelect = useCallback((date: Date) => {
      setDate(date);
      setIsOpen(false);
    }, []);

    return (
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        offsetOptions={{ mainAxis: 12 }}
      >
        <PopoverTrigger as="div" className="cursor-pointer">
          <TextInput
            placeholder="날짜를 선택해주세요."
            value={date ? formatDate(date) : ''}
            suffix={<FeatherIcons.Calendar color="var(--color-gray-400)" />}
            className="w-300 pointer-events-none"
            readOnly
          />
        </PopoverTrigger>

        <PopoverContent className="rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
          <Calendar mode="single" required selected={date} onSelect={onSelect} />
        </PopoverContent>
      </Popover>
    );
  },
};

export const TypeableDatePicker: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date>();

    const onSelect = useCallback((date: Date) => {
      setDate(date);
      setIsOpen(false);
    }, []);

    const [value, setValue] = useState<string>('');
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }, []);
    const { onChangeInput } = useDateInputFormatter({ onChange });

    useEffect(() => {
      if (!isValidDateFormat(value)) return;

      setDate(new Date(value));
    }, [value]);

    return (
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        offsetOptions={{ mainAxis: 12 }}
        isFocusDisabled
      >
        <PopoverTrigger as="div" className="cursor-pointer">
          <TextInput
            placeholder="날짜를 선택해주세요."
            value={value}
            onChange={onChangeInput}
            suffix={<FeatherIcons.Calendar color="var(--color-gray-400)" />}
            className="w-300"
          />
        </PopoverTrigger>

        <PopoverContent className="rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            required
            month={date}
            selected={date}
            onSelect={onSelect}
          />
        </PopoverContent>
      </Popover>
    );
  },
};
