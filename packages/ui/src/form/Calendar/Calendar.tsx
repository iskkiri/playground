'use client';

import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import Button from '../../general/Button/Button';
import { cn } from '@repo/utils/cn';
import FeatherIcons from '@repo/icons/featherIcons';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      // 월 범위를 벗어나는 날짜 표시 여부 (기본: true)
      showOutsideDays={showOutsideDays}
      className={cn('bg-white [--cell-size:--spacing(40)]', className)}
      // 캘린더 헤더 레이아웃: 'label', 'dropdown', 'dropdown-months', 'dropdown-years'
      captionLayout={captionLayout}
      // 날짜 포맷터 함수들 (월 드롭다운을 짧은 형태로 표시 등)
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      // 각 캘린더 요소별 CSS 클래스 정의
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-12', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between',
          defaultClassNames.nav
        ),
        button_previous: cn(
          'size-(--cell-size) flex select-none items-center justify-center p-0',
          'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'size-(--cell-size) flex select-none items-center justify-center p-0',
          'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'h-(--cell-size) flex w-full items-center justify-center',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'h-(--cell-size) flex w-full flex-row-reverse items-center justify-center gap-8 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-md border border-gray-400 px-8',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('bg-popover absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none',
          captionLayout === 'label'
            ? 'typography-p3-16r'
            : // dropdown을 자체 Select로 변경할 경우 불필요
              'typography-p4-14r rounded-4 flex items-center gap-4 py-4 pl-2 pr-1',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('mb-8 flex', defaultClassNames.weekdays),
        weekday: cn(
          'typography-p4-14r flex-1 select-none text-gray-700',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full', defaultClassNames.week),
        day: cn('select-none', defaultClassNames.day),
        range_start: cn('bg-primary-light rounded-l-full', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('bg-primary-light rounded-r-full', defaultClassNames.range_end),
        today: cn(defaultClassNames.today),
        outside: cn('text-gray-300 aria-selected:text-gray-300', defaultClassNames.outside),
        disabled: cn(defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      // 캘린더 서브컴포넌트 커스터마이징 (Root, Chevron, DayButton 등)
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <FeatherIcons.ChevronLeft className={cn('size-20 shrink-0', className)} {...props} />
            );
          }

          if (orientation === 'right') {
            return (
              <FeatherIcons.ChevronRight className={cn('size-20 shrink-0', className)} {...props} />
            );
          }

          return (
            <FeatherIcons.ChevronDown className={cn('size-20 shrink-0', className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      // DayPicker의 나머지 모든 props (mode, selected, onSelect 등)
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // 기본 레이아웃 및 크기
        'typography-p4-14r size-(--cell-size) flex items-center justify-center',
        // 선택 상태별 배경색 및 텍스트 색상
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-white',
        'data-[range-start=true]:bg-primary data-[range-start=true]:text-white',
        'data-[range-end=true]:bg-primary data-[range-end=true]:text-white',
        'data-[range-middle=true]:bg-primary-light data-[range-middle=true]:text-black',
        // 둥근 모서리 (범위 선택에 따라 다름)
        'data-[selected-single=true]:rounded-full',
        'data-[range-end=true]:rounded-full data-[range-start=true]:rounded-full',
        'data-[range-middle=true]:rounded-none',
        'disabled:cursor-not-allowed disabled:text-gray-300',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
