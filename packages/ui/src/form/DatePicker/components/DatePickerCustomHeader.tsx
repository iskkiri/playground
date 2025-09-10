import dayjs from 'dayjs';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import FeatherIcons from '@repo/icons/featherIcons';
import Select from '#src/form/Select/Select';
import type { SingleValue } from 'react-select';
import type { SelectOption } from '#src/form/Select/types/select.types';
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
    control: () => 'px-16',
    menuList: () => 'p-0',
    option: () => 'rounded-0',
  });

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={decreaseMonth}
        className="flex h-32 w-32 shrink-0 items-center justify-center border-none bg-transparent"
      >
        <FeatherIcons.ChevronLeft color="#a3a3a3" className="shrink-0" />
      </button>

      <div className="flex items-center gap-8">
        <Select
          options={yearsOptions}
          value={yearsOptions.find((option) => option.value === selectedYear)}
          onChange={onChangeYear}
          classNames={selectClassNames({
            containerClassName: 'w-104',
          })}
        />

        <Select
          options={monthsOptions}
          value={monthsOptions.find((option) => option.value === selectedMonth)}
          onChange={onChangeMonth}
          classNames={selectClassNames({
            containerClassName: 'w-84',
          })}
        />
      </div>

      <button
        type="button"
        onClick={increaseMonth}
        className="flex h-32 w-32 shrink-0 items-center justify-center border-none bg-transparent"
      >
        <FeatherIcons.ChevronRight color="#a3a3a3" className="flex-shrink-0" />
      </button>
    </div>
  );
}
