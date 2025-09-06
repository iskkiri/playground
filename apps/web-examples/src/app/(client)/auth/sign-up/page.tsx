'use client';

import { Controller } from 'react-hook-form';
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import useSignUpForm from '../../_features/user/hooks/useSignUpForm';
import TextInput from '@repo/ui/TextInput/TextInput';
import RadioTab from '@/_components/RadioTab';
import DatePicker from '@repo/ui/DatePicker/DatePicker';
import Button from '@repo/ui/Button/Button';

export default function SignUpPage() {
  const [searchParams] = useQueryStates({
    socialProvider: parseAsStringEnum(['google', 'kakao', 'naver', '']).withDefault(''),
    socialId: parseAsString.withDefault(''),
    email: parseAsString.withDefault(''),
    nickname: parseAsString.withDefault(''),
    gender: parseAsStringEnum(['MALE', 'FEMALE', 'UNKNOWN']).withDefault('UNKNOWN'),
    birthDate: parseAsString.withDefault(''),
  });

  const { control, register, watch, reset, onSubmit } = useSignUpForm();

  // 소셜 로그인 정보 초기화
  useEffect(() => {
    reset({
      socialProvider: searchParams.socialProvider || undefined,
      socialId: searchParams.socialId,
      email: searchParams.email,
      nickname: searchParams.nickname,
      ...(searchParams.gender !== 'UNKNOWN' && { gender: searchParams.gender }),
      birthDate: searchParams.birthDate ? new Date(searchParams.birthDate) : undefined,
    });
  }, [searchParams, reset]);

  return (
    <div className="py-140 w-480 mx-auto px-20">
      <div className="flex flex-col gap-12">
        <h1 className="typography-h5-32b text-center">회원가입</h1>
      </div>

      <form onSubmit={onSubmit} className="mt-48 xl:mt-60">
        <div className="flex flex-col gap-24">
          <label className="flex flex-col gap-8">
            <span className="typography-p4-14b text-gray-700">
              이메일 <b className="font-bold text-red-500">*</b>
            </span>
            <TextInput {...register('email')} disabled />
          </label>

          <label className="flex flex-col gap-8">
            <span className="typography-p4-14b text-gray-700">
              닉네임 <b className="font-bold text-red-500">*</b>
            </span>
            <TextInput {...register('nickname')} placeholder="닉네임을 입력해주세요." />
          </label>

          <div className="flex flex-col gap-8">
            <span className="typography-p4-14b text-gray-700">
              성별 <b className="font-bold text-red-500">*</b>
            </span>
            <div className="flex gap-8">
              <RadioTab
                value="MALE"
                {...register('gender')}
                checked={watch('gender') === 'MALE'}
                className="flex-1"
              >
                남성
              </RadioTab>
              <RadioTab
                value="FEMALE"
                {...register('gender')}
                checked={watch('gender') === 'FEMALE'}
                className="flex-1"
              >
                여성
              </RadioTab>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <span className="typography-p4-14b text-gray-700">
              생년월일 <b className="font-bold text-red-500">*</b>
            </span>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  selected={value}
                  onChange={(date) => onChange(date)}
                  placeholderText={'생년월일 선택'}
                />
              )}
            />
          </div>
        </div>

        <Button variant="primary" size={48} type="submit" className="mt-48 w-full xl:mt-60">
          가입하기
        </Button>
      </form>
    </div>
  );
}
