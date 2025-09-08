import type { SelectOption } from '#src/form/Select/types/select.types';

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const blockTypeOptions: SelectOption<Level>[] = [
  { label: '문단', value: 0 },
  { label: '제목 1', value: 1 },
  { label: '제목 2', value: 2 },
  { label: '제목 3', value: 3 },
  { label: '제목 4', value: 4 },
  { label: '제목 5', value: 5 },
  { label: '제목 6', value: 6 },
];
