import RadioTab from '@/_components/RadioTab';
import Select from '@repo/ui-third-party/Select/Select';
import TextInput from '@repo/ui-tailwind/TextInput/TextInput';
import FeatherIcons from '@repo/icons/featherIcons';
import { Controller, type Control, type FieldValues, type UseFormRegister } from 'react-hook-form';
import { noticeSearchOptions } from '../data/notice.data';
import type { AdminSearchSchema } from '@/app/(admin)/_schemas/adminSearch.schema';

interface NoticeSearchFilterProps {
  showStatus: boolean | null;
  onChangeIsShow: (isShow: boolean | null) => () => void;
  control: Control<AdminSearchSchema>;
  register: UseFormRegister<AdminSearchSchema>;
  dirtyFields: FieldValues;
  onSubmit: () => void;
  onReset: () => void;
  onClearField: (name: 'searchType' | 'keyword') => () => void;
}

export default function NoticeSearchFilter({
  showStatus,
  onChangeIsShow,
  control,
  register,
  dirtyFields,
  onSubmit,
  onReset,
  onClearField,
}: NoticeSearchFilterProps) {
  return (
    <>
      <div className="rounded-8 border border-gray-200">
        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">노출 상태</div>

          <div className="flex gap-8 p-16">
            <RadioTab name="isShow" onChange={onChangeIsShow(null)} checked={showStatus === null}>
              전체
            </RadioTab>
            <RadioTab name="isShow" onChange={onChangeIsShow(true)} checked={showStatus === true}>
              노출
            </RadioTab>
            <RadioTab name="isShow" onChange={onChangeIsShow(false)} checked={showStatus === false}>
              숨김
            </RadioTab>
          </div>
        </div>

        <div className="grid grid-cols-[200px_auto] items-center">
          <div className="flex items-center self-stretch bg-gray-100 p-16">검색</div>

          <form onSubmit={onSubmit} className="flex gap-8 p-16">
            <Controller
              control={control}
              name="searchType"
              render={({ field: { onChange, value } }) => (
                <Select
                  //
                  options={noticeSearchOptions}
                  onChange={(option) => onChange(option?.value)}
                  value={
                    noticeSearchOptions.find((option) => option.value === value) ??
                    noticeSearchOptions[0]
                  }
                  aria-label="검색 유형"
                  className="w-160"
                />
              )}
            />

            <TextInput
              {...register('keyword')}
              type="search"
              suffix={
                <button type="submit">
                  <FeatherIcons.Search size={20} color={'#ddd'} />
                </button>
              }
              isDirty={dirtyFields.keyword}
              onClear={onClearField('keyword')}
              className="w-400"
            />
          </form>
        </div>
      </div>

      <button onClick={onReset} className="flex w-fit items-center gap-8 text-gray-500">
        <FeatherIcons.RotateCcw size={20} />
        <span>초기화</span>
      </button>
    </>
  );
}
