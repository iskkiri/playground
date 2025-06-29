'use client';

import { useCallback, useRef, useState } from 'react';
import type { RefCallBack } from 'react-hook-form';
import type { Interpolation, Theme } from '@emotion/react';
import { textInputWrapperCss } from './TextInput.styles';
import FeatherIcons from '@repo/icons/featherIcons';
import { useMergeRefs } from 'react-merge-refs';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  ref?: React.RefObject<HTMLInputElement> | RefCallBack;
  isDirty?: boolean;
  onClear?: () => void;
  isError?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function TextInput({
  isDirty,
  onClear: clear,
  isError,
  prefix,
  suffix,
  cssStyle,
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

  return (
    <div
      css={[
        textInputWrapperCss.wrapper,
        !restProps.disabled && !isError && textInputWrapperCss.hoverFocus,
        restProps.disabled && textInputWrapperCss.disabled,
        isError && textInputWrapperCss.error,
        isDirty && textInputWrapperCss.dirty,
        cssStyle,
      ]}
    >
      {prefix}

      <input
        {...restProps}
        ref={mergeRefs}
        type={
          restProps.type === 'password' ? (isPasswordVisible ? 'text' : 'password') : restProps.type
        }
        css={textInputWrapperCss.input}
      />

      <button
        onClick={onClear}
        type="button"
        aria-label="입력 내용 지우기"
        css={[textInputWrapperCss.button, textInputWrapperCss.clear]} // Clear 버튼
      >
        <FeatherIcons.XCircle color={'#a2a9b0'} aria-hidden="true" />
      </button>

      {suffix}

      {restProps.type === 'password' && (
        <button
          type="button"
          onClick={onTogglePasswordVisibility}
          aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보이기'}
          css={textInputWrapperCss.button}
        >
          {isPasswordVisible ? (
            <FeatherIcons.EyeOff color={'var(--CoolGray-30,#c2c4c8)'} aria-hidden="true" />
          ) : (
            <FeatherIcons.Eye color={'var(--CoolGray-30,#c2c4c8)'} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
