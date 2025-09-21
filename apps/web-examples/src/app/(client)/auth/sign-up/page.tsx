'use client';

import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import useSignUpForm from '../../_features/user/hooks/useSignUpForm';
import TextInput from '@repo/ui/form/TextInput/TextInput';
import RadioTab from '@/_components/RadioTab';
import DatePicker from '@repo/ui/form/DatePicker/react-day-picker/DatePicker';
import Button from '@repo/ui/general/Button/Button';
import Form from '@repo/ui/form/Form/Form';

export default function SignUpPage() {
  const [searchParams] = useQueryStates({
    socialProvider: parseAsStringEnum(['google', 'kakao', 'naver', '']).withDefault(''),
    socialId: parseAsString.withDefault(''),
    email: parseAsString.withDefault(''),
    nickname: parseAsString.withDefault(''),
    gender: parseAsStringEnum(['MALE', 'FEMALE', 'UNKNOWN']).withDefault('UNKNOWN'),
    birthDate: parseAsString.withDefault(''),
  });

  const { onSubmit, ...form } = useSignUpForm();
  const { control, reset } = form;

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

      <Form {...form}>
        <form onSubmit={onSubmit} className="mt-48 flex flex-col gap-24 xl:mt-60">
          <Form.Field
            control={control}
            name="email"
            render={({ field }) => (
              <Form.Item>
                <Form.Label isRequired>이메일</Form.Label>
                <Form.Control>
                  <TextInput {...field} disabled />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            name="nickname"
            render={({ field }) => (
              <Form.Item>
                <Form.Label isRequired>닉네임</Form.Label>
                <Form.Control>
                  <TextInput {...field} placeholder="닉네임을 입력해주세요." />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            name="gender"
            render={({ field }) => (
              <Form.Item>
                <Form.Label isRequired>성별</Form.Label>
                <Form.Control>
                  <div className="flex gap-8">
                    <RadioTab
                      {...field}
                      checked={field.value === 'MALE'}
                      value="MALE"
                      className="flex-1"
                    >
                      남성
                    </RadioTab>
                    <RadioTab
                      {...field}
                      checked={field.value === 'FEMALE'}
                      value="FEMALE"
                      className="flex-1"
                    >
                      여성
                    </RadioTab>
                  </div>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            name="birthDate"
            render={({ field }) => (
              <Form.Item>
                <Form.Label isRequired>생년월일</Form.Label>
                <Form.Control>
                  <DatePicker mode="single" value={field.value} onChange={field.onChange}>
                    <DatePicker.Input placeholder="생년월일 선택" />
                    <DatePicker.Calendar />
                  </DatePicker>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Button variant="primary" size={48} type="submit" className="mt-48 w-full xl:mt-60">
            가입하기
          </Button>
        </form>
      </Form>
    </div>
  );
}
