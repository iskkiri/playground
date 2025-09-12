import '../styles/date-picker-day.scss';

export default function DatePickerCustomDay(day: number, _date: Date) {
  return <div className="date-picker__custom-day">{day}</div>;
}
