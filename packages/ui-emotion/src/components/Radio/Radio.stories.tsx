import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Radio from './Radio';
import { useArgs } from 'storybook/preview-api';
import { Controller, useController, useForm } from 'react-hook-form';
// import { within, userEvent } from '@storybook/test';

type Gender = 'MALE' | 'FEMALE' | 'NONE';

const meta = {
  title: 'components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: '체크 여부',
    },
    name: {
      description: '이름',
    },
    value: {
      description: '값',
    },
  },
  args: {
    children: 'Radio',
    checked: false,
    name: 'name',
    value: 'value',
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  // name: '기본',
  render: function Render(props) {
    const [args, updateArgs] = useArgs();

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        updateArgs({ checked: e.target.checked });
      },
      [updateArgs]
    );

    return <Radio {...props} onChange={onChange} checked={args.checked} />;
  },
};

export const Example: Story = {
  // name: '예시',
  render: function Render(props) {
    const [value, setValue] = useState('option1');

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Radio
          {...props}
          name="option"
          value="option1"
          onChange={onChange}
          checked={value === 'option1'}
        >
          옵션1
        </Radio>

        <Radio
          {...props}
          name="option"
          value="option2"
          onChange={onChange}
          checked={value === 'option2'}
        >
          옵션2
        </Radio>

        <Radio
          {...props}
          name="option"
          value="option3"
          onChange={onChange}
          checked={value === 'option3'}
        >
          옵션3
        </Radio>
      </div>
    );
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   await userEvent.click(canvas.getByRole('radio', { name: '옵션1' }));
  //   await userEvent.click(canvas.getByRole('radio', { name: '옵션2' }));
  //   await userEvent.click(canvas.getByRole('radio', { name: '옵션3' }));
  // },
};

/**
 * string 타입의 value를 사용할 경우에는 register를 사용합니다.
 */
export const FormExample: Story = {
  // name: 'React Hook Form 사용 예시',
  render: function Render() {
    const { register } = useForm<{ gender: Gender }>({
      defaultValues: {
        gender: 'NONE',
      },
    });

    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Radio {...register('gender')} value="MALE">
          남성
        </Radio>

        <Radio {...register('gender')} value="FEMALE">
          여성
        </Radio>

        <Radio {...register('gender')} value="NONE">
          선택안함
        </Radio>
      </div>
    );
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   await userEvent.click(canvas.getByRole('radio', { name: '남성' }));
  //   await userEvent.click(canvas.getByRole('radio', { name: '여성' }));
  //   await userEvent.click(canvas.getByRole('radio', { name: '선택안함' }));
  // },
};

/**
 * string 외의 타입을 설정해야할 경우에는 useController 혹은 Controller를 사용합니다.
 * value prop은 string type만을 허용하므로 value를 지정하지 않고,
 * onChange와 checked prop만을 이용하여 값을 설정합니다.
 */
export const FormUseControllerExample: Story = {
  // name: 'React Hook Form useController 예시',
  render: function Render() {
    const { control } = useForm<{ consent: boolean }>({
      defaultValues: {
        consent: true,
      },
    });

    const { field } = useController({ control, name: 'consent' });
    const onChangeConsent = useCallback(
      (value: boolean) => () => {
        field.onChange(value);
      },
      [field]
    );

    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Radio onChange={onChangeConsent(true)} checked={field.value === true}>
          동의
        </Radio>

        <Radio onChange={onChangeConsent(false)} checked={field.value === false}>
          미동의
        </Radio>
      </div>
    );
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   await userEvent.click(canvas.getByRole('radio', { name: '동의' }));
  //   await userEvent.click(canvas.getByRole('radio', { name: '미동의' }));
  // },
};

/**
 * string 외의 타입을 설정해야할 경우에는 Controller를 사용할 수도 있습니다.
 */
export const FormControllerExample: Story = {
  // name: 'React Hook Form Controller 예시',
  render: function Render() {
    const { control } = useForm<{ consent: boolean }>({
      defaultValues: {
        consent: true,
      },
    });

    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <>
              <Radio onChange={() => field.onChange(true)} checked={field.value === true}>
                동의
              </Radio>

              <Radio onChange={() => field.onChange(false)} checked={field.value === false}>
                미동의
              </Radio>
            </>
          )}
        />
      </div>
    );
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   await userEvent.click(canvas.getByRole('radio', { name: '동의' }));
  //   await userEvent.click(canvas.getByRole('radio', { name: '미동의' }));
  // },
};
