'use client';

import { useCallback, useMemo, useState, useRef } from 'react';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';
import { useMergeRefs } from 'react-merge-refs';

export type TextInputProps = Omit<React.ComponentProps<'input'>, 'prefix' | 'className'> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  classNames?: {
    wrapper?: string;
    input?: string;
  };
};

export default function TextInput({
  ref,
  prefix,
  suffix,
  classNames,
  ...restProps
}: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onTogglePasswordVisibility = useCallback(() => setIsPasswordVisible((prev) => !prev), []);

  const inputRef = useRef<HTMLInputElement>(null);
  const mergeRefs = useMergeRefs([ref, inputRef]);

  const inputType = useMemo(() => {
    if (restProps.type !== 'password') return restProps.type;
    return isPasswordVisible ? 'text' : 'password';
  }, [restProps.type, isPasswordVisible]);

  return (
    <div
      className={cn(
        cn(
          'rounded-12 flex h-48 items-center gap-8 border border-gray-300 bg-white px-20 py-0',
          'enabled:focus-within:border-gray-400 enabled:hover:border-gray-400',
          'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-gray-100 has-[input:disabled]:bg-gray-100',
          'has-[input:enabled[aria-invalid="true"]]:border-red-500'
        ),
        classNames?.wrapper
      )}
    >
      {prefix}

      <input
        data-slot="input"
        ref={mergeRefs}
        type={inputType}
        className={cn(
          'typography-p3-16r h-full w-full min-w-0 flex-1 shrink-0 border-none bg-transparent text-gray-900 outline-none',
          'placeholder:text-gray-400',
          'disabled:cursor-not-allowed disabled:text-gray-400',
          classNames?.input
        )}
        {...restProps}
      />

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
