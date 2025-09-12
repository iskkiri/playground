import { CalendarContainer } from 'react-datepicker';
import Button from '#src/general/Button/Button';

interface Props extends React.ComponentProps<typeof CalendarContainer> {
  onCancel: () => void;
  onComplete: () => void;
  cancelButton?: ({ onCancel }: { onCancel: () => void }) => React.ReactNode;
  completeButton?: ({ onComplete }: { onComplete: () => void }) => React.ReactNode;
}

export default function DatepickerCustomContainer({
  children,
  onCancel,
  onComplete,
  cancelButton,
  completeButton,
}: Props) {
  return (
    <CalendarContainer className="date-picker__custom-calendar-container">
      {children}

      <div className="date-picker__custom-calendar__button-group">
        {cancelButton ? (
          cancelButton({ onCancel })
        ) : (
          <Button type="button" variant="gray" onClick={onCancel}>
            취소
          </Button>
        )}
        {completeButton ? (
          completeButton({ onComplete })
        ) : (
          <Button type="button" variant="primary" onClick={onComplete}>
            선택 완료
          </Button>
        )}
      </div>
    </CalendarContainer>
  );
}
