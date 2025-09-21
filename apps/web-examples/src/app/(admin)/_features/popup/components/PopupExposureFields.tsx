import { type UseFormReturn } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';
import Radio from '@repo/ui/form/Radio/Radio';
import TextInput from '@repo/ui/form/TextInput/TextInput';
// import DatePicker from '@repo/ui/form/DatePicker/react-datepicker/DatePicker';
import DatePicker from '@repo/ui/form/DatePicker/react-day-picker/DatePicker';
import Form from '@repo/ui/form/Form/Form';

interface PopUpExposureFieldsProps {
  control: UseFormReturn<PopupRegisterSchema>['control'];
}

export default function PopupExposureFields({ control }: PopUpExposureFieldsProps) {
  return (
    <>
      {/* 노출 상태 */}
      <Form.Field
        control={control}
        name="displayType"
        render={({ field: { onChange, value } }) => (
          <Form.Item className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <Form.Label className="flex items-center self-stretch bg-gray-100 p-16">
              노출 상태
            </Form.Label>

            <Form.Control>
              <div className="flex w-fit flex-col gap-8 p-16" role="radiogroup">
                <Radio name="displayType" value="ALL" onChange={onChange} checked={value === 'ALL'}>
                  전체노출
                </Radio>

                <Radio
                  name="displayType"
                  value="PC_ONLY"
                  onChange={onChange}
                  checked={value === 'PC_ONLY'}
                >
                  PC만 노출
                </Radio>

                <Radio
                  name="displayType"
                  value="MOBILE_ONLY"
                  onChange={onChange}
                  checked={value === 'MOBILE_ONLY'}
                >
                  모바일만 노출
                </Radio>
              </div>
            </Form.Control>
          </Form.Item>
        )}
      />

      {/* PC 노출 위치 */}
      <Form.Field
        control={control}
        name="pcPosition"
        render={({ field: pcPositionField }) => (
          <Form.Item className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <Form.Label className="flex items-center self-stretch bg-gray-100 p-16">
              PC 노출 위치
            </Form.Label>

            <div className="flex w-fit flex-col gap-8 p-16">
              <Form.Control>
                <div className="flex flex-col gap-8 p-16" role="radiogroup">
                  <Radio
                    name="pcPosition"
                    value="LEFT"
                    onChange={pcPositionField.onChange}
                    checked={pcPositionField.value === 'LEFT'}
                  >
                    왼쪽
                  </Radio>

                  <Radio
                    name="pcPosition"
                    value="CENTER"
                    onChange={pcPositionField.onChange}
                    checked={pcPositionField.value === 'CENTER'}
                  >
                    가운데
                  </Radio>

                  <Radio
                    name="pcPosition"
                    value="RIGHT"
                    onChange={pcPositionField.onChange}
                    checked={pcPositionField.value === 'RIGHT'}
                  >
                    오른쪽
                  </Radio>

                  <Radio
                    name="pcPosition"
                    value="CUSTOM"
                    onChange={pcPositionField.onChange}
                    checked={pcPositionField.value === 'CUSTOM'}
                    aria-label="PC 노출 위치 직접 입력"
                  >
                    직접 입력
                  </Radio>
                </div>
              </Form.Control>

              {pcPositionField.value === 'CUSTOM' && (
                <div className="flex w-fit gap-16">
                  <Form.Field
                    control={control}
                    name="xCoordinate"
                    render={({ field: xCoordinateField }) => (
                      <Form.Item className="flex items-center gap-8">
                        <Form.Label className="typography-p4-14r font-normal text-gray-500">
                          왼쪽에서부터(px)
                        </Form.Label>
                        <Form.Control>
                          <TextInput
                            {...xCoordinateField}
                            placeholder="왼쪽에서부터(px)"
                            type="number"
                          />
                        </Form.Control>
                      </Form.Item>
                    )}
                  />

                  <Form.Field
                    control={control}
                    name="yCoordinate"
                    render={({ field: yCoordinateField }) => (
                      <Form.Item className="flex items-center gap-8">
                        <Form.Label className="typography-p4-14r font-normal text-gray-500">
                          위에서부터(px)
                        </Form.Label>
                        <Form.Control>
                          <TextInput
                            {...yCoordinateField}
                            placeholder="위에서부터(px)"
                            type="number"
                          />
                        </Form.Control>
                      </Form.Item>
                    )}
                  />
                </div>
              )}
            </div>
          </Form.Item>
        )}
      />

      {/* 노출 기간 */}
      <Form.Field
        control={control}
        name="dateRange"
        render={({ field }) => (
          <Form.Item className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
            <Form.Label className="flex items-center self-stretch bg-gray-100 p-16">
              노출 기간
            </Form.Label>

            <div className="flex w-fit flex-col gap-8 p-16">
              <DatePicker
                mode="range"
                value={
                  field.value
                    ? {
                        from: field.value?.startDate ?? undefined,
                        to: field.value?.endDate ?? undefined,
                      }
                    : undefined
                }
                onChange={(dateRange) =>
                  dateRange && field.onChange({ startDate: dateRange.from, endDate: dateRange.to })
                }
              >
                <Form.Control>
                  <DatePicker.Input
                    placeholder="기간을 선택해주세요."
                    classNames={{ wrapper: 'w-400' }}
                  />
                </Form.Control>
                <DatePicker.Calendar disabled={(day) => day < new Date()} />
              </DatePicker>

              <Form.Description className="typography-p4-14r font-normal text-gray-500">
                설정하지 않으면 무기한 노출됩니다. 날짜를 설정해도 사용여부가 OFF면 노출 되지
                않습니다.
              </Form.Description>
            </div>
          </Form.Item>
        )}
      />
    </>
  );
}
