import type { Control } from 'react-hook-form';
import type { SvgFaviconSchema } from '../schemas/svgFavicon.schema';
import Form from '@repo/ui/form/Form/Form';

interface SvgFaviconFormProps {
  sampleIcons: Record<string, string>;
  control: Control<SvgFaviconSchema>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export default function SvgFaviconForm({ sampleIcons, control, onSubmit }: SvgFaviconFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-16 lg:col-span-2">
      {/* 샘플 아이콘 선택 */}
      <div>
        <Form.Field
          control={control}
          name="svgContent"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>샘플 아이콘 선택 (클릭하여 적용)</Form.Label>
              <div className="grid grid-cols-4 gap-8">
                {Object.entries(sampleIcons).map(([name, path]) => (
                  <button
                    key={name}
                    onClick={() => field.onChange(path)}
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
            </Form.Item>
          )}
        />
      </div>

      <div className="flex flex-col gap-16">
        {/* 배경색 */}
        <Form.Field
          control={control}
          name="backgroundColor"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>배경색</Form.Label>

              <div className="flex items-center space-x-8">
                <input
                  type="color"
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
                />
                <Form.Control>
                  <input
                    value={field.value}
                    onChange={field.onChange}
                    className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
                    placeholder="#ffffff"
                  />
                </Form.Control>
              </div>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 아이콘 색상 */}

        <Form.Field
          control={control}
          name="iconColor"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>아이콘 색상</Form.Label>

              <div className="flex items-center space-x-8">
                <input
                  type="color"
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
                />
                <Form.Control>
                  <input
                    value={field.value}
                    onChange={field.onChange}
                    className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
                    placeholder="#000000"
                  />
                </Form.Control>
              </div>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>

      <button className="rounded-8 bg-primary hover:bg-primary-dark focus:ring-primary w-full px-16 py-8 text-white focus:outline-none focus:ring-2">
        SVG 파비콘 생성
      </button>
    </form>
  );
}
