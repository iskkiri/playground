'use client';

import { useCallback, useMemo, useState, useRef } from 'react';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { useMergeRefs } from 'react-merge-refs';

const inputWrapperVariants = cva(
  'rounded-12 flex h-48 items-center gap-8 border border-gray-300 bg-white px-20 py-0',
  {
    variants: {
      state: {
        default: 'focus-within:border-gray-400 hover:border-gray-400',
        error: 'border-danger',
        disabled: 'cursor-not-allowed border-gray-100 bg-gray-100',
      },
      isDirty: {
        true: 'focus-within:[&_.input-clear-button]:flex',
      },
    },
    defaultVariants: {
      state: 'default',
      isDirty: false,
    },
  }
);

export type TextInputProps = Omit<React.ComponentProps<'input'>, 'prefix'> &
  VariantProps<typeof inputWrapperVariants> & {
    isDirty?: boolean;
    isError?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    onClear?: () => void;
  };

export default function TextInput({
  isDirty,
  onClear: clear,
  isError,
  prefix,
  suffix,
  className,
  ...restProps
}: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onTogglePasswordVisibility = useCallback(() => setIsPasswordVisible((prev) => !prev), []);

  const inputRef = useRef<HTMLInputElement>(null);
  const mergeRefs = useMergeRefs([restProps.ref, inputRef]);

  const onClear = useCallback(() => {
    if (!clear || !inputRef.current) return;

    clear();
    inputRef.current.focus();
  }, [clear]);

  const inputState = useMemo(() => {
    if (isError) return 'error';
    if (restProps.disabled) return 'disabled';
    return 'default';
  }, [isError, restProps.disabled]);

  const inputType = useMemo(() => {
    if (restProps.type !== 'password') return restProps.type;
    return isPasswordVisible ? 'text' : 'password';
  }, [restProps.type, isPasswordVisible]);

  return (
    <div className={cn(inputWrapperVariants({ state: inputState, isDirty }), className)}>
      {prefix}

      <input
        {...restProps}
        ref={mergeRefs}
        type={inputType}
        className={cn(
          'typography-p3-16r h-full w-full min-w-0 flex-1 shrink-0 border-none bg-transparent text-gray-900 outline-none',
          'placeholder:text-gray-400',
          'disabled:cursor-not-allowed disabled:text-gray-400'
        )}
      />

      <button
        onClick={onClear}
        type="button"
        aria-label="입력 내용 지우기"
        className={cn(
          'input-clear-button',
          'hidden',
          'focus-visible:rounded-4 focus-visible:outline-primary focus-visible:outline-solid outline-none focus-visible:outline-1 focus-visible:outline-offset-2'
        )}
      >
        <FeatherIcons.XCircle aria-hidden="true" className="shrink-0 text-gray-300" />
      </button>

      {suffix}

      {restProps.type === 'password' && (
        <button
          type="button"
          onClick={onTogglePasswordVisibility}
          aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보이기'}
          className={
            'focus-visible:rounded-4 focus-visible:outline-primary focus-visible:outline-solid outline-none focus-visible:outline-1 focus-visible:outline-offset-2'
          }
        >
          {isPasswordVisible ? (
            <FeatherIcons.EyeOff aria-hidden="true" className="shrink-0 text-gray-300" />
          ) : (
            <FeatherIcons.Eye aria-hidden="true" className="shrink-0 text-gray-300" />
          )}
        </button>
      )}
    </div>
  );
}
