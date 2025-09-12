export function isDateRange(value: unknown): value is [Date | null, Date | null] {
  if (!Array.isArray(value) || value.length !== 2) return false;

  return (
    (value[0] instanceof Date || value[0] === null) &&
    (value[1] instanceof Date || value[1] === null)
  );
}

export function isDateRangeChange(
  onChange: unknown
): onChange is (date: [Date | null, Date | null]) => void {
  return true;
}

export function isDateSingle(value: unknown): value is Date | null {
  return value instanceof Date || value === null;
}

export function isSingleChange(onChange: unknown): onChange is (date: Date | null) => void {
  return typeof onChange === 'function' && onChange.length === 1; // 단일 Date를 인자로 받는 함수로 간주
}
