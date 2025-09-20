import type { Meta } from '@storybook/react-vite';
import Form from './Form';
import { useCallback } from 'react';
import { z } from 'zod';
import TextInput from '../TextInput/TextInput';
import Radio from '../Radio/Radio';
import Button from '#src/general/Button/Button';
import DatePicker from '../DatePicker/react-day-picker/DatePicker';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const meta = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta;

export default meta;

const signUpSchema = z.object({
  email: z
    .string({ message: '이메일을 입력해주세요.' })
    .email({ message: '이메일 형식이 올바르지 않습니다.' }),
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,10}$/, {
      message: '닉네임은 10자 이내로 한글,영문,숫자만 사용할 수 있습니다.',
    }),
  gender: z.enum(['MALE', 'FEMALE'], { message: '성별을 선택해주세요.' }),
  birthDate: z.date({ message: '생년월일을 선택해주세요.' }),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export const Basic = {
  render: function Render() {
    const form = useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: 'example@example.com',
        nickname: '',
        gender: 'MALE',
      },
    });

    const onSubmit: SubmitHandler<SignUpSchema> = useCallback((values) => {
      alert(JSON.stringify(values, null, 2));
    }, []);

    return (
      <div className="py-140 w-480 mx-auto px-20">
        <div className="flex flex-col gap-12">
          <h1 className="typography-h5-32b text-center">회원가입</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-48 flex flex-col gap-24 xl:mt-60"
          >
            <Form.Field
              control={form.control}
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
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label isRequired>닉네임</Form.Label>

                  <Form.Control>
                    <TextInput {...field} />
                  </Form.Control>
                  <Form.Description>
                    * 닉네임은 10자 이내로 한글,영문,숫자를 입력해주세요.
                  </Form.Description>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              control={form.control}
              name="gender"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label isRequired>성별</Form.Label>

                  <Form.Control>
                    <div className="flex gap-8">
                      <Radio
                        {...field}
                        checked={field.value === 'MALE'}
                        value="MALE"
                        className="flex-1"
                      >
                        남성
                      </Radio>
                      <Radio
                        {...field}
                        checked={field.value === 'FEMALE'}
                        value="FEMALE"
                        className="flex-1"
                      >
                        여성
                      </Radio>
                    </div>
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label isRequired>생년월일</Form.Label>

                  <DatePicker {...field}>
                    <Form.Control>
                      <DatePicker.Input placeholder="생년월일을 선택해주세요" />
                    </Form.Control>

                    <DatePicker.Calendar />
                  </DatePicker>
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
  },
};
