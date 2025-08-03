import type { UseFormReturn } from 'react-hook-form';
import type { TextFaviconSchema } from '../schemas/textFavicon.schema';

interface TextFaviconFormProps {
  register: UseFormReturn<TextFaviconSchema>['register'];
  watch: UseFormReturn<TextFaviconSchema>['watch'];
  setValue: UseFormReturn<TextFaviconSchema>['setValue'];
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
}

export default function TextFaviconForm({
  register,
  watch,
  setValue,
  onSubmit,
}: TextFaviconFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-16">
      <div>
        <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
          텍스트 (첫 글자만 사용됩니다)
        </label>
        <input
          {...register('text')}
          className="rounded-8 focus:ring-primary w-full border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
          placeholder="예: A, 홈, 회사"
        />
      </div>

      <div>
        <label className="typography-p4-14r mb-8 block font-medium text-gray-700">배경색</label>
        <div className="flex items-center space-x-8">
          <input
            type="color"
            value={watch('backgroundColor')}
            onChange={(e) => setValue('backgroundColor', e.target.value)}
            className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
          />
          <input
            {...register('backgroundColor')}
            className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
          텍스트 색상
        </label>
        <div className="flex items-center space-x-8">
          <input
            type="color"
            value={watch('textColor')}
            onChange={(e) => setValue('textColor', e.target.value)}
            className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
          />
          <input
            {...register('textColor')}
            className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <button className="rounded-8 bg-primary hover:bg-primary-dark focus:ring-primary w-full px-16 py-8 text-white focus:outline-none focus:ring-2">
        파비콘 생성
      </button>
    </form>
  );
}
