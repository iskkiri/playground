import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckBox from './CheckBox';
import { useArgs } from 'storybook/preview-api';
import { Controller, useController, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { typography } from '@repo/design-tokens/typography/index.ts';

const signUpFormCss = {
  divider: css`
    border: none;
    height: 1px;
    background: var(--CoolGray-20, #e1e2e4);
    width: 100%;
    margin: 0;
  `,

  listItem: css`
    ${typography['P3/16r']};
    display: flex;
    align-items: center;
  `,

  consentButton: css`
    ${typography['P3/16r']};
    cursor: pointer;
    border: none;
    color: var(--CoolGray-500, #6b727a);
    background-color: transparent;
    text-decoration: underline;
    text-underline-offset: 4px;
    padding: 0;
    margin-bottom: 2px;
  `,
};

const meta = {
  title: 'components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: '전체 동의',
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    const [args, updateArgs] = useArgs();

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        updateArgs({ checked: e.target.checked });
      },
      [updateArgs]
    );

    return <CheckBox {...props} checked={args.checked} onChange={onChange} />;
  },
};

export const Example: Story = {
  render: function Render(props) {
    const [consent, setConsent] = useState(false);

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked),
      []
    );

    return (
      <CheckBox {...props} checked={consent} onChange={onChange}>
        [필수] 이용약관 동의하기
      </CheckBox>
    );
  },
};

/**
 * 단순히 true, false와 같은 boolean으로 값을 얻고 싶은 경우에는 register를 사용합니다.
 */
export const FormExample: Story = {
  render: function Render(props) {
    const { register, watch } = useForm<{ consent: boolean }>({
      defaultValues: {
        consent: false,
      },
    });

    return (
      <CheckBox {...props} {...register('consent')} checked={watch('consent')}>
        [필수] 이용약관 동의하기
      </CheckBox>
    );
  },
};

/**
 * useController를 사용하여 설정할 수도 있습니다.
 * 사용할 수 있다는 것일 뿐, register를 사용하여 일관된 코드를 작성합니다.
 */
export const FormUseControllerExample: Story = {
  render: function Render(props) {
    const { control } = useForm<{ consent: boolean }>({
      defaultValues: {
        consent: false,
      },
    });

    const { field } = useController({ control, name: 'consent' });

    return (
      <CheckBox {...props} checked={field.value} onChange={field.onChange}>
        [필수] 이용약관 동의하기
      </CheckBox>
    );
  },
};

/**
 * Controller를 사용하여 설정할 수도 있습니다.
 * 사용할 수 있다는 것일 뿐, register를 사용하여 일관된 코드를 작성합니다.
 */
export const FormControllerExample: Story = {
  render: function Render(props) {
    const { control } = useForm<{ consent: boolean }>({
      defaultValues: {
        consent: false,
      },
    });

    return (
      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <CheckBox {...props} checked={field.value} onChange={field.onChange}>
            [필수] 이용약관 동의하기
          </CheckBox>
        )}
      />
    );
  },
};

/**
 * 모두 동의 예시
 */
export const AllConsentExample: Story = {
  render: function Render() {
    const { register, watch, setValue } = useForm({
      defaultValues: {
        fourteenYN: false,
        serviceTermsYN: false,
        personalInfoYN: false,
        marketingYN: false,
      },
    });

    // 전체 동의 여부
    const isAllConsent = [
      //
      watch('fourteenYN'),
      watch('serviceTermsYN'),
      watch('personalInfoYN'),
      watch('marketingYN'),
    ].every((value) => value === true);

    // 전체 동의
    const onToggleAllConsent = useCallback(() => {
      setValue('fourteenYN', !isAllConsent);
      setValue('serviceTermsYN', !isAllConsent);
      setValue('personalInfoYN', !isAllConsent);
      setValue('marketingYN', !isAllConsent);
    }, [isAllConsent, setValue]);

    return (
      <div css={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <CheckBox onChange={onToggleAllConsent} checked={isAllConsent}>
          전체동의
        </CheckBox>

        <hr css={signUpFormCss.divider} />

        <div css={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CheckBox {...register('fourteenYN')} checked={watch('fourteenYN')}>
            만 14세 이상입니다. (필수)
          </CheckBox>
          <CheckBox {...register('serviceTermsYN')} checked={watch('serviceTermsYN')}>
            <div css={signUpFormCss.listItem}>
              <button type="button" css={signUpFormCss.consentButton}>
                서비스 이용약관
              </button>
              에 동의합니다. (필수)
            </div>
          </CheckBox>
          <CheckBox {...register('personalInfoYN')} checked={watch('personalInfoYN')}>
            <div css={signUpFormCss.listItem}>
              <button type="button" css={signUpFormCss.consentButton}>
                개인정보 수집 및 이용
              </button>
              에 동의합니다. (필수)
            </div>
          </CheckBox>
          <CheckBox {...register('marketingYN')} checked={watch('marketingYN')}>
            <div css={signUpFormCss.listItem}>
              <button type="button" css={signUpFormCss.consentButton}>
                마케팅 수신
              </button>
              에 동의합니다. (선택)
            </div>
          </CheckBox>
        </div>
      </div>
    );
  },
};

/**
 * boolean 값이 아닌 List(Array)로 값을 관리하는 예시
 */
type Vitamin = 'vitaminA' | 'vitaminB' | 'vitaminC' | 'vitaminD';

export const ListValuesExample: Story = {
  render: function Render() {
    const { register, watch } = useForm<{ vitamins: Vitamin[] }>({
      defaultValues: {
        vitamins: [],
      },
    });
    const getIsCheckedVitamins = useCallback(
      (vitamin: Vitamin) => watch('vitamins')?.includes(vitamin),
      [watch]
    );

    return (
      <div css={{ display: 'flex', gap: 16 }}>
        <CheckBox
          {...register('vitamins')}
          value="vitaminA"
          checked={getIsCheckedVitamins('vitaminA')}
        >
          비타민 A
        </CheckBox>
        <CheckBox
          {...register('vitamins')}
          value="vitaminB"
          checked={getIsCheckedVitamins('vitaminB')}
        >
          비타민 B
        </CheckBox>
        <CheckBox
          {...register('vitamins')}
          value="vitaminC"
          checked={getIsCheckedVitamins('vitaminC')}
        >
          비타민 C
        </CheckBox>
        <CheckBox
          {...register('vitamins')}
          value="vitaminD"
          checked={getIsCheckedVitamins('vitaminD')}
        >
          비타민 D
        </CheckBox>
      </div>
    );
  },
};
