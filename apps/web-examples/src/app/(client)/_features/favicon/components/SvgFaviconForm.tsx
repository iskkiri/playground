import type { UseFormReturn } from 'react-hook-form';
import type { SvgFaviconSchema } from '../schemas/svgFavicon.schema';

interface SvgFaviconFormProps {
  sampleIcons: Record<string, string>;
  onSelectSampleIcon: (iconPath: string) => () => void;
  register: UseFormReturn<SvgFaviconSchema>['register'];
  watch: UseFormReturn<SvgFaviconSchema>['watch'];
  setValue: UseFormReturn<SvgFaviconSchema>['setValue'];
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export default function SvgFaviconForm({
  sampleIcons,
  onSelectSampleIcon,
  register,
  watch,
  setValue,
  onSubmit,
}: SvgFaviconFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-16 lg:col-span-2">
      {/* 샘플 아이콘 선택 */}
      <div>
        <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
          샘플 아이콘 선택 (클릭하여 적용)
        </label>
        <div className="grid grid-cols-4 gap-8">
          {Object.entries(sampleIcons).map(([name, path]) => (
            <button
              key={name}
              onClick={onSelectSampleIcon(path)}
              className="rounded-8 flex flex-col items-center border border-gray-300 p-12 hover:bg-gray-50"
              title={name}
              type="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ color: '#000000' }}
                className="mb-4"
              >
                <g dangerouslySetInnerHTML={{ __html: path }} />
              </svg>
              <span className="typography-p5-12r text-gray-600">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {/* 배경색 */}
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
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* 아이콘 색상 */}
        <div>
          <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
            아이콘 색상
          </label>
          <div className="flex items-center space-x-8">
            <input
              type="color"
              value={watch('iconColor')}
              onChange={(e) => setValue('iconColor', e.target.value)}
              className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
            />
            <input
              {...register('iconColor')}
              className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      <button className="rounded-8 bg-primary hover:bg-primary-dark focus:ring-primary w-full px-16 py-8 text-white focus:outline-none focus:ring-2">
        SVG 파비콘 생성
      </button>
    </form>
  );
}
