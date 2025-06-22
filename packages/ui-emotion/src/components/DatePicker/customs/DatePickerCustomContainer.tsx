import { CalendarContainer } from 'react-datepicker';
import Button from '#src/components/Button/Button';
import { reactDatePickerCss } from '../DatePicker.styles';

interface Props extends React.ComponentProps<typeof CalendarContainer> {
  onCancel: () => void;
  onComplete: () => void;
}

export default function DatepickerCustomContainer({ children, onCancel, onComplete }: Props) {
  return (
    <CalendarContainer css={reactDatePickerCss.container}>
      {children}

      <div css={reactDatePickerCss.buttonGroup}>
        <Button type="button" buttonType="gray" onClick={onCancel}>
          취소
        </Button>
        <Button type="button" buttonType="primary" onClick={onComplete}>
          선택 완료
        </Button>
      </div>
    </CalendarContainer>
  );
}
