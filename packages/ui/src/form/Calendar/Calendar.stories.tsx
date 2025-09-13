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
import type { DateRange } from 'react-day-picker';

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
    // 팝오버 상태
    const [isOpen, setIsOpen] = useState(false);
    // 월
    const [month, setMonth] = useState<Date>();
    // 날짜
    const [date, setDate] = useState<Date>();

    const onSelect = useCallback((date: Date) => {
      // 날짜 선택 시 날짜 업데이트
      setDate(date);
      // 날짜 선택 시 월 업데이트
      setMonth(date);
      // 팝오버 닫기
      setIsOpen(false);
    }, []);

    const onMonthChange = useCallback((month: Date) => {
      // 월 변경 시 월 업데이트
      setMonth(month);
    }, []);

    /**
     * 팝오버가 닫힐 때, 선택되었던 month이 있을 경우 month를 선택된 날짜의 month로 설정
     * 예시]
     * 1. 선택된 날짜: 2025-09-12
     * 2. select에서 3월 선택. 그러나 최종적으로 날짜 변경은 하지 않음
     * 3. 팝오버를 닫았다가 다시 열었을 때는 선택된 날짜의 month인 9월로 설정되어 있어야 함
     */
    useEffect(() => {
      if (isOpen) return;

      setMonth(date);
    }, [isOpen, date]);

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
          <Calendar
            required
            mode="single"
            captionLayout="dropdown"
            month={month}
            selected={date}
            onSelect={onSelect}
            onMonthChange={onMonthChange}
          />
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * TypeableDatePicker 설계 의도:
 *
 * 왜 캘린더 아이콘만 클릭 가능하게 했는가?
 * - 사용자의 의도를 명확히 구분하기 위함
 * - 입력 필드 클릭 = 직접 타이핑 의도
 * - 아이콘 클릭 = 캘린더로 선택 의도
 * - 입력 중 의도치 않은 팝오버 열림 방지로 더 나은 사용자 경험 제공
 *
 * 참고: shadcn/ui의 DatePicker 구현 방식
 * @see https://ui.shadcn.com/docs/components/date-picker#picker-with-input
 *
 * 동작 방식:
 * 1. 사용자가 직접 날짜를 타이핑할 수 있는 입력 필드 제공
 * 2. 캘린더 아이콘 클릭 시에만 팝오버 열림 (입력 필드 클릭 시에는 열리지 않음)
 * 3. 입력 필드 포커스 시 팝오버 자동 닫힘 (타이핑 방해 방지)
 * 4. 캘린더에서 날짜 선택 시 입력 필드 값도 동기화
 * 5. 유효한 날짜 형식 입력 시 캘린더 날짜도 동기화
 */
export const TypeableDatePicker: Story = {
  render: function Render() {
    // 모달 열림 여부
    const [isOpen, setIsOpen] = useState(false);
    // 날짜 텍스트 입력 상태
    const [value, setValue] = useState<string>('');
    // 월
    const [month, setMonth] = useState<Date>();
    // 날짜
    const [date, setDate] = useState<Date>();

    // 날짜 입력 상태 변경
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }, []);
    const { onInputChange } = useDateInputFormatter({ onChange });
    const onChangeTextInput = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event);

        const value = event.target.value;
        if (!isValidDateFormat(value)) return;

        // 날짜 업데이트
        setDate(new Date(value));
        // 월 업데이트
        setMonth(new Date(value));
      },
      [onInputChange]
    );

    // 텍스트 입력 클릭 시 팝오버 열림 방지
    const onClickTextInput = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    }, []);
    // 텍스트 입력 포커스 시 팝오버 닫기
    const onFocusTextInput = useCallback(() => setIsOpen(false), []);
    // 달력 아이콘 클릭 시 팝오버 토글
    const onToggleCalendar = useCallback(() => setIsOpen((prev) => !prev), []);

    // 연도/월 변경
    const onMonthChange = useCallback((month: Date) => {
      setMonth(month);
    }, []);

    // 날짜 선택
    const onSelectDate = useCallback((date: Date) => {
      // 날짜 업데이트
      setDate(date);
      // 월 업데이트
      setMonth(date);
      // 날짜 입력 값 업데이트
      setValue(date ? formatDate(date) : '');
      // 팝오버 닫기
      setIsOpen(false);
    }, []);

    /**
     * 팝오버가 닫힐 때, 선택되었던 month이 있을 경우 month를 선택된 날짜의 month로 설정
     * 예시]
     * 1. 선택된 날짜: 2025-09-12
     * 2. select에서 3월 선택. 그러나 최종적으로 날짜 변경은 하지 않음
     * 3. 팝오버를 닫았다가 다시 열었을 때는 선택된 날짜의 month인 9월로 설정되어 있어야 함
     */
    useEffect(() => {
      if (isOpen) return;

      setMonth(date);
    }, [isOpen, date]);

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
            value={value}
            onChange={onChangeTextInput}
            onClick={onClickTextInput}
            onFocus={onFocusTextInput}
            suffix={
              <button
                type="button"
                onClick={onToggleCalendar}
                className="flex items-center justify-center"
              >
                <FeatherIcons.Calendar color="var(--color-gray-400)" />
              </button>
            }
            className="w-300"
          />
        </PopoverTrigger>

        <PopoverContent className="rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
          <Calendar
            required
            mode="single"
            captionLayout="dropdown"
            month={month}
            onMonthChange={onMonthChange}
            selected={date}
            onSelect={onSelectDate}
          />
        </PopoverContent>
      </Popover>
    );
  },
};

export const RangeForOneDatePicker: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [month, setMonth] = useState<Date>();
    const [date, setDate] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });

    const onSelect = useCallback((newDate: DateRange) => {
      setDate(newDate);
    }, []);

    const onMonthChange = useCallback((month: Date) => {
      setMonth(month);
    }, []);

    /**
     * 선택된 날짜가 있을 경우 month를 선택된 날짜의 month로 설정
     * 예시]
     * 1. 선택된 날짜: 2025-09-12
     * 2. month를 3월 선택. 그러나 최종적으로 날짜 변경은 하지 않음
     * 3. 팝오버를 닫았다가 다시 열었을 때는 선택된 날짜의 month인 9월로 설정되어 있어야 함
     */
    useEffect(() => {
      if (isOpen) return;

      setMonth(date.from);
    }, [date, isOpen]);

    return (
      <Popover
        placement="bottom"
        offsetOptions={{ mainAxis: 12 }}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger as="div" className="cursor-pointer">
          <TextInput
            placeholder="날짜를 선택해주세요."
            value={date.from && date.to ? `${formatDate(date.from)} ~ ${formatDate(date.to)}` : ''}
            suffix={<FeatherIcons.Calendar color="var(--color-gray-400)" />}
            className="w-300 pointer-events-none"
            readOnly
          />
        </PopoverTrigger>

        <PopoverContent className="rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
          <Calendar
            required
            mode="range"
            captionLayout="dropdown"
            month={month}
            onMonthChange={onMonthChange}
            selected={date}
            onSelect={onSelect}
          />
        </PopoverContent>
      </Popover>
    );
  },
};

export const RangeForTwoDatePickers: Story = {
  render: function Render() {
    const [isOpenStartDate, setIsOpenStartDate] = useState(false);
    const [isOpenEndDate, setIsOpenEndDate] = useState(false);
    const [month, setMonth] = useState<{ from: Date | undefined; to: Date | undefined }>({
      from: undefined,
      to: undefined,
    });

    const [date, setDate] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });

    const onSelectStartDate = useCallback((selectedDate: Date) => {
      setDate((prevDate) => ({ from: selectedDate, to: prevDate.to }));
      setMonth((prevMonth) => ({ ...prevMonth, from: selectedDate }));
      setIsOpenStartDate(false);
    }, []);

    const onSelectEndDate = useCallback((selectedDate: Date) => {
      setDate((prevDate) => ({ from: prevDate.from, to: selectedDate }));
      setMonth((prevMonth) => ({ ...prevMonth, to: selectedDate }));
      setIsOpenEndDate(false);
    }, []);

    const onMonthChange = useCallback(
      (type: 'from' | 'to') => (month: Date) => {
        setMonth((prevMonth) => ({ ...prevMonth, [type]: month }));
      },
      []
    );

    /**
     * 선택된 날짜가 있을 경우 month를 선택된 날짜의 month로 설정
     * 예시]
     * 1. 선택된 날짜: 2025-09-12
     * 2. month를 3월 선택. 그러나 최종적으로 날짜 변경은 하지 않음
     * 3. 팝오버를 닫았다가 다시 열었을 때는 선택된 날짜의 month인 9월로 설정되어 있어야 함
     */
    useEffect(() => {
      if (isOpenStartDate) return;

      setMonth((prevMonth) => ({ ...prevMonth, from: date.from }));
    }, [isOpenStartDate, date]);

    /**
     * 선택된 날짜가 있을 경우 month를 선택된 날짜의 month로 설정
     * 예시]
     * 1. 선택된 날짜: 2025-09-12
     * 2. month를 3월 선택. 그러나 최종적으로 날짜 변경은 하지 않음
     * 3. 팝오버를 닫았다가 다시 열었을 때는 선택된 날짜의 month인 9월로 설정되어 있어야 함
     */
    useEffect(() => {
      if (isOpenEndDate) return;

      setMonth((prevMonth) => ({ ...prevMonth, to: date.to }));
    }, [isOpenEndDate, date]);

    return (
      <div className="flex items-center gap-8">
        <Popover
          placement="bottom"
          offsetOptions={{ mainAxis: 12 }}
          isOpen={isOpenStartDate}
          onOpenChange={setIsOpenStartDate}
        >
          <PopoverTrigger as="div" className="cursor-pointer">
            <TextInput
              placeholder="날짜를 선택해주세요."
              value={date.from ? formatDate(date.from) : ''}
              suffix={<FeatherIcons.Calendar color="var(--color-gray-400)" />}
              className="w-300 pointer-events-none"
              readOnly
            />
          </PopoverTrigger>

          <PopoverContent className="rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
            <Calendar
              required
              mode="range"
              captionLayout="dropdown"
              selected={date}
              month={month.from}
              onMonthChange={onMonthChange('from')}
              onDayClick={onSelectStartDate}
              disabled={(day) => (date.to ? day > date.to : false)}
            />
          </PopoverContent>
        </Popover>

        <span>~</span>

        <Popover
          placement="bottom"
          offsetOptions={{ mainAxis: 12 }}
          isOpen={isOpenEndDate}
          onOpenChange={setIsOpenEndDate}
        >
          <PopoverTrigger as="div" className="cursor-pointer">
            <TextInput
              placeholder="날짜를 선택해주세요."
              value={date.to ? formatDate(date.to) : ''}
              suffix={<FeatherIcons.Calendar color="var(--color-gray-400)" />}
              className="w-300 pointer-events-none"
              readOnly
            />
          </PopoverTrigger>

          <PopoverContent className="rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
            <Calendar
              required
              mode="range"
              captionLayout="dropdown"
              month={month.to}
              selected={date}
              onMonthChange={onMonthChange('to')}
              onDayClick={onSelectEndDate}
              disabled={(day) => (date.from ? day < date.from : false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
