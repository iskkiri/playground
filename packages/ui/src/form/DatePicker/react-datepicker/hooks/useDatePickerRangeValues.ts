import { useMemo } from 'react';

interface UseDatePickerRangeValuesParams {
  selectsRange: boolean;
  selectsStart: boolean;
  selectsEnd: boolean;
  innerDate: Date | null;
  innerDateRange: [Date | null, Date | null];
}

export default function useDatePickerRangeValues({
  selectsRange,
  selectsStart,
  selectsEnd,
  innerDate,
  innerDateRange,
}: UseDatePickerRangeValuesParams) {
  return useMemo(() => {
    const startDate = selectsRange ? innerDateRange[0] : selectsStart ? innerDate : undefined;

    const endDate = selectsRange ? innerDateRange[1] : selectsEnd ? innerDate : undefined;

    return { startDate, endDate };
  }, [innerDate, innerDateRange, selectsEnd, selectsRange, selectsStart]);
}
