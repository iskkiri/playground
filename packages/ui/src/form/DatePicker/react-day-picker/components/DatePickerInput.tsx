'use client';

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import TextInput from '../../../TextInput/TextInput';
import FeatherIcons from '@repo/icons/featherIcons';
import Popover from '#src/overlay/Popover/Popover';
import { cn } from '@repo/utils/cn';
import { isValidDateFormat } from '@repo/utils/formatDate';
import { useDateInputFormatter } from '../../../Calendar/hooks/useDateInputFormatter';
import { useDatePickerContext } from '../hooks/useDatePickerContext';
import { getInputValue } from '../utils/datePicker.util';

interface DatePickerInputProps
  extends Omit<
    React.ComponentProps<typeof TextInput>,
    'value' | 'onChange' | 'onClick' | 'onFocus' | 'suffix' | 'readOnly' | 'classNames'
  > {
  interaction?: 'click' | 'type';
  classNames?: {
    trigger?: string;
  } & React.ComponentProps<typeof TextInput>['classNames'];
}

export default function DatePickerInput({
  classNames,
  interaction = 'click',
  ...props
}: DatePickerInputProps) {
  const WrapperComponent = useMemo(() => {
    return interaction === 'type' ? 'div' : React.Fragment;
  }, [interaction]);

  const { open: isOpen, onOpenChange, mode, date, setDate, setMonth } = useDatePickerContext();

  // Input 상태 (typeable용) - mode에 따라 다른 형식
  const [inputValue, setInputValue] = useState<string>(() => getInputValue(date, mode));
  const [isFocused, setIsFocused] = useState(false);

  // date가 변경될 때 inputValue 업데이트 (readonly 모드용)
  useEffect(() => {
    if (interaction === 'type' && isFocused) return;

    setInputValue(getInputValue(date, mode));
  }, [date, mode, interaction, isFocused]);

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

      if (!value) {
        setDate(undefined);
        return;
      }

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

  // 포커스 시 팝오버 닫기 (type 모드용)
  const onFocus = useCallback(() => {
    setIsFocused(true);
    onOpenChange(false);
  }, [onOpenChange]);

  const onBlur = useCallback(() => setIsFocused(false), []);

  // 캘린더 아이콘 토글 핸들러 (type 모드용)
  const onToggleCalendar = useCallback(() => onOpenChange(!isOpen), [onOpenChange, isOpen]);

  // click/type에 따른 다른 처리
  const value = useMemo(() => {
    if (interaction === 'type') return inputValue;

    return getInputValue(date, mode);
  }, [interaction, inputValue, date, mode]);

  return (
    <Popover.Trigger
      asChild={interaction === 'type'}
      className={cn('cursor-pointer', classNames?.trigger)}
    >
      <WrapperComponent>
        <TextInput
          readOnly={interaction === 'click'}
          value={value}
          onChange={interaction === 'type' ? onChange : undefined}
          onClick={interaction === 'type' ? preventPopoverOpen : undefined}
          onFocus={interaction === 'type' ? onFocus : undefined}
          onBlur={interaction === 'type' ? onBlur : undefined}
          classNames={{
            wrapper: cn(interaction === 'click' && 'pointer-events-none', classNames?.wrapper),
            input: classNames?.input,
          }}
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
