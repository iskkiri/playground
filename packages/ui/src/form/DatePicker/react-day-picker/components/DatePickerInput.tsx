'use client';

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import TextInput from '../../../TextInput/TextInput';
import FeatherIcons from '@repo/icons/featherIcons';
import Popover from '#src/overlay/Popover/Popover';
import { cn } from '@repo/utils/cn';
import { isValidDateFormat } from '@repo/utils/formatDate';
import { useDateInputFormatter } from '../../../Calendar/hooks/useDateInputFormatter';
import { useDatePickerContext } from '../hooks/useDatePickerContext';
import { getInputValue } from '../utils/datePickerUtils';

interface DatePickerInputProps
  extends Omit<
    React.ComponentProps<typeof TextInput>,
    'value' | 'onChange' | 'onClick' | 'onFocus' | 'suffix' | 'readOnly'
  > {
  interaction?: 'click' | 'type';
}

export default function DatePickerInput({
  className,
  interaction = 'click',
  ...props
}: DatePickerInputProps) {
  const WrapperComponent = useMemo(() => {
    return interaction === 'type' ? 'div' : React.Fragment;
  }, [interaction]);

  const { open: isOpen, onOpenChange, mode, date, setDate, setMonth } = useDatePickerContext();

  // Input 상태 (typeable용) - mode에 따라 다른 형식
  const [inputValue, setInputValue] = useState<string>(() => getInputValue(date, mode));

  // date가 변경될 때 inputValue 업데이트 (readonly 모드용)
  useEffect(() => {
    if (interaction === 'type') return;

    setInputValue(getInputValue(date, mode));
  }, [date, mode, interaction]);

  // 날짜 입력 포맷터
  const { onInputChange } = useDateInputFormatter({
    onChange: (e) => setInputValue(e.target.value),
  });

  // Input 변경 핸들러 (type 모드용)
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // input 상태 업데이트
      onInputChange(e);
      const value = e.target.value;

      if (!isValidDateFormat(value)) return;

      const newDate = new Date(value);
      // 날짜 업데이트
      setDate(newDate);
      // 월 업데이트
      setMonth(newDate);
    },
    [onInputChange, setDate, setMonth]
  );

  // 팝오버 열림 방지 (type 모드용)
  const preventPopoverOpen = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }, []);

  // 팝오버 닫기 (type 모드용)
  const closePopover = useCallback(() => onOpenChange(false), [onOpenChange]);

  // 캘린더 아이콘 토글 핸들러 (type 모드용)
  const onToggleCalendar = useCallback(() => onOpenChange(!isOpen), [onOpenChange, isOpen]);

  // click/type에 따른 다른 처리
  const value = useMemo(() => {
    if (interaction === 'type') return inputValue;

    return getInputValue(date, mode);
  }, [interaction, inputValue, date, mode]);

  return (
    <Popover.Trigger asChild={interaction === 'type'} className={cn('cursor-pointer')}>
      <WrapperComponent>
        <TextInput
          readOnly={interaction === 'click'}
          value={value}
          onChange={interaction === 'type' ? onChange : undefined}
          onClick={interaction === 'type' ? preventPopoverOpen : undefined}
          onFocus={interaction === 'type' ? closePopover : undefined}
          className={cn(interaction === 'click' && 'pointer-events-none', className)}
          suffix={
            <InputSuffixComponent interaction={interaction} onToggleCalendar={onToggleCalendar} />
          }
          {...props}
        />
      </WrapperComponent>
    </Popover.Trigger>
  );
}

function InputSuffixComponent({
  interaction,
  onToggleCalendar,
}: {
  interaction: 'click' | 'type';
  onToggleCalendar: () => void;
}) {
  if (interaction === 'click') {
    return <FeatherIcons.Calendar color="var(--color-gray-400)" />;
  }

  return (
    <button type="button" onClick={onToggleCalendar} className="flex items-center justify-center">
      <FeatherIcons.Calendar color="var(--color-gray-400)" />
    </button>
  );
}
