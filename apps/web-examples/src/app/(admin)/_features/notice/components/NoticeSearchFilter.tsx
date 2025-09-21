import RadioTab from '@/_components/RadioTab';
import Select from '@repo/ui/form/Select/Select';
import TextInput from '@repo/ui/form/TextInput/TextInput';
import FeatherIcons from '@repo/icons/featherIcons';
import { type UseFormReturn } from 'react-hook-form';
import { noticeSearchOptions } from '../data/notice.data';
import type { AdminSearchSchema } from '@/app/(admin)/_schemas/adminSearch.schema';
import Form from '@repo/ui/form/Form/Form';

interface NoticeSearchFilterProps {
  showStatus: boolean | null;
  onChangeIsShow: (isShow: boolean | null) => () => void;
  form: UseFormReturn<AdminSearchSchema>;
  onSubmit: () => void;
  onReset: () => void;
}

export default function NoticeSearchFilter({
  showStatus,
  onChangeIsShow,
  form,
  onSubmit,
  onReset,
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

          <Form {...form}>
            <form onSubmit={onSubmit} className="flex gap-8 p-16">
              <Form.Field
                control={form.control}
                name="searchType"
                render={({ field: { onChange, value } }) => (
                  <Form.Control>
                    <Select
                      options={noticeSearchOptions}
                      onChange={(option) => onChange(option?.value)}
                      value={
                        noticeSearchOptions.find((option) => option.value === value) ??
                        noticeSearchOptions[0]
                      }
                      aria-label="검색 유형"
                      classNames={{
                        container: () => 'w-160',
                        control: () => 'border-gray-300',
                      }}
                    />
                  </Form.Control>
                )}
              />

              <Form.Field
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <Form.Control>
                    <TextInput
                      {...field}
                      suffix={
                        <button>
                          <FeatherIcons.Search size={20} color={'#ddd'} />
                        </button>
                      }
                      classNames={{ wrapper: 'w-400 h-40 rounded-8' }}
                    />
                  </Form.Control>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      <button onClick={onReset} className="flex w-fit items-center gap-8 text-gray-500">
        <FeatherIcons.RotateCcw size={20} />
        <span>초기화</span>
      </button>
    </>
  );
}
