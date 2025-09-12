import type { SelectOption } from '#src/form/Select/types/select.types';

/**
 * 생년월일 선택을 위한 연도 옵션
 * - 현재 연도부터 과거 120년까지 선택 가능
 * - 최대 수명을 고려하여 120년으로 설정
 */
export const yearsOptions = [...Array(120)].map((_, i) => {
  const year = new Date().getFullYear() - i;

  return {
    label: `${year}년`,
    value: year,
  } satisfies SelectOption<number>;
});

export const monthsOptions = [...Array(12)].map((_, i) => {
  const month = i + 1;

  return {
    label: `${month}월`,
    value: month,
  } satisfies SelectOption<number>;
});
