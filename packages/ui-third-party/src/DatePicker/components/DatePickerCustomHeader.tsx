import dayjs from 'dayjs';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import FeatherIcons from '@repo/theme/featherIcons';
import Select from '#src/Select/Select';
import type { SingleValue } from 'react-select';
import type { SelectOption } from '#src/Select/types/select.types';
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

  const selectClassNames = ({ containerClassName }: { containerClassName: string }) => ({
    container: () => containerClassName,
    control: () => 'date-picker__custom-select-control',
    menuList: () => 'date-picker__custom-select-menu-list',
    option: () => 'date-picker__custom-select-option',
  });

  return (
    <div className="date-picker__custom-header">
      <button type="button" onClick={decreaseMonth}>
        <FeatherIcons.ChevronLeft color="#a3a3a3" />
      </button>
      <div className="date-picker__custom-header-select-wrapper">
        <Select
          options={yearsOptions}
          value={yearsOptions.find((option) => option.value === selectedYear)}
          onChange={onChangeYear}
          classNames={selectClassNames({
            containerClassName: 'date-picker__custom-year-select-container',
          })}
        />
        <Select
          options={monthsOptions}
          value={monthsOptions.find((option) => option.value === selectedMonth)}
          onChange={onChangeMonth}
          classNames={selectClassNames({
            containerClassName: 'date-picker__custom-month-select-container',
          })}
        />
      </div>

      <button type="button" onClick={increaseMonth}>
        <FeatherIcons.ChevronRight color="#a3a3a3" />
      </button>
    </div>
  );
}
