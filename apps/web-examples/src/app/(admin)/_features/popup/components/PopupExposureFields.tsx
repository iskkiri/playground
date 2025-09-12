import { Controller, type UseFormReturn } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';
import Radio from '@repo/ui/form/Radio/Radio';
import TextInput from '@repo/ui/form/TextInput/TextInput';
import DatePicker from '@repo/ui/form/DatePicker/react-datepicker/DatePicker';

interface PopUpExposureFieldsProps {
  control: UseFormReturn<PopupRegisterSchema>['control'];
  register: UseFormReturn<PopupRegisterSchema>['register'];
  isDirectPosition: boolean;
}

export default function PopupExposureFields({
  control,
  register,
  isDirectPosition,
}: PopUpExposureFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
        <div className="flex items-center self-stretch bg-gray-100 p-16">노출 상태</div>
        <div className="flex flex-col gap-8 p-16" role="radiogroup">
          <Controller
            control={control}
            name="displayType"
            render={({ field: { onChange, value } }) => (
              <Radio name="displayType" value="ALL" onChange={onChange} checked={value === 'ALL'}>
                전체노출
              </Radio>
            )}
          />

          <Controller
            control={control}
            name="displayType"
            render={({ field: { onChange, value } }) => (
              <Radio
                name="displayType"
                value="PC_ONLY"
                onChange={onChange}
                checked={value === 'PC_ONLY'}
              >
                PC만 노출
              </Radio>
            )}
          />

          <Controller
            control={control}
            name="displayType"
            render={({ field: { onChange, value } }) => (
              <Radio
                name="displayType"
                value="MOBILE_ONLY"
                onChange={onChange}
                checked={value === 'MOBILE_ONLY'}
              >
                모바일만 노출
              </Radio>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
        <div className="flex items-center self-stretch bg-gray-100 p-16">PC 노출 위치</div>
        <div className="flex flex-col gap-8 p-16">
          <div className="flex gap-16" role="radiogroup">
            <Controller
              control={control}
              name="pcPosition"
              render={({ field: { onChange, value } }) => (
                <Radio
                  name="pcPosition"
                  value="LEFT"
                  onChange={onChange}
                  checked={value === 'LEFT'}
                >
                  왼쪽
                </Radio>
              )}
            />

            <Controller
              control={control}
              name="pcPosition"
              render={({ field: { onChange, value } }) => (
                <Radio
                  name="pcPosition"
                  value="CENTER"
                  onChange={onChange}
                  checked={value === 'CENTER'}
                >
                  가운데
                </Radio>
              )}
            />

            <Controller
              control={control}
              name="pcPosition"
              render={({ field: { onChange, value } }) => (
                <Radio
                  name="pcPosition"
                  value="RIGHT"
                  onChange={onChange}
                  checked={value === 'RIGHT'}
                >
                  오른쪽
                </Radio>
              )}
            />

            <Controller
              control={control}
              name="pcPosition"
              render={({ field: { onChange, value } }) => (
                <Radio
                  name="pcPosition"
                  value="CUSTOM"
                  onChange={onChange}
                  checked={value === 'CUSTOM'}
                  aria-label="PC 노출 위치 직접 입력"
                >
                  직접 입력
                </Radio>
              )}
            />
          </div>
          {isDirectPosition && (
            <div className="flex gap-16">
              <div className="flex items-center gap-8">
                <span className="typography-p4-14r text-gray-500">왼쪽에서부터(px)</span>
                <TextInput
                  placeholder="왼쪽에서부터(px)"
                  {...register('xCoordinate')}
                  type="number"
                />
              </div>
              <div className="flex items-center gap-8">
                <span className="typography-p4-14r text-gray-500">위에서부터(px)</span>
                <TextInput
                  placeholder="위에서부터(px)"
                  {...register('yCoordinate')}
                  type="number"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
        <div className="flex items-center self-stretch bg-gray-100 p-16">노출 기간</div>
        <div className="flex flex-col gap-8 p-16">
          <Controller
            control={control}
            name="dateRange"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                //
                placeholderText="기간을 선택해주세요."
                selectsRange
                minDate={new Date()}
                selected={value?.startDate ?? null}
                onChange={(dateRange) =>
                  dateRange && onChange({ startDate: dateRange[0], endDate: dateRange[1] })
                }
                startDate={value?.startDate ?? undefined}
                endDate={value?.endDate ?? undefined}
                portalId="root-portal"
                className="w-400"
              />
            )}
          />

          <p className="typography-p4-14r text-gray-500">
            설정하지 않으면 무기한 노출됩니다. 날짜를 설정해도 사용여부가 OFF면 노출 되지 않습니다.
          </p>
        </div>
      </div>
    </>
  );
}
