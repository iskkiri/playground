import dayjs from 'dayjs';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import FeatherIcons from '@repo/theme/featherIcons';
import Select from '#src/components/Select/Select';
import type { SingleValue } from 'react-select';
import type { SelectOption } from '#src/components/Select/types/select.types';
import { yearsOptions, monthsOptions } from '../data/datepicker.data';

export default function DatePickerCustomHeader({
  decreaseMonth,
  increaseMonth,
  date,
  changeYear,
  changeMonth,
}: ReactDatePickerCustomHeaderProps) {
  const selectedDate = dayjs(date);
  const selectedYear = selectedDate.year();
  const selectedMonth = selectedDate.month() + 1;

  const onChangeYear = (option: SingleValue<SelectOption<number>>) => {
    if (!option) return;

    changeYear(option.value);
  };

  const onChangeMonth = (option: SingleValue<SelectOption<number>>) => {
    if (!option) return;

    changeMonth(option.value - 1);
  };

  return (
    <div className="custom-header">
      <button type="button" onClick={decreaseMonth}>
        <FeatherIcons.ChevronLeft />
      </button>

      <div className="custom-header-select-wrapper">
        <Select
          options={yearsOptions}
          value={yearsOptions.find((option) => option.value === selectedYear)}
          onChange={onChangeYear}
          styles={{ container: (base) => ({ ...base, width: 110 }) }}
        />
        <Select
          options={monthsOptions}
          value={monthsOptions.find((option) => option.value === selectedMonth)}
          onChange={onChangeMonth}
          styles={{ container: (base) => ({ ...base, width: 100 }) }}
        />
      </div>

      <button type="button" onClick={increaseMonth}>
        <FeatherIcons.ChevronRight />
      </button>
    </div>
  );
}
