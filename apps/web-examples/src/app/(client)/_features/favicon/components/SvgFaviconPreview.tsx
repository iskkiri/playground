import DOMPurify from 'isomorphic-dompurify';

interface SvgFaviconPreviewProps {
  svgContent: string;
  backgroundColor: string;
  iconColor: string;
}

export default function SvgFaviconPreview({
  svgContent,
  backgroundColor,
  iconColor,
}: SvgFaviconPreviewProps) {
  return (
    <div className="rounded-8 border border-gray-200 p-16">
      <h3 className="typography-p4-14r mb-8 font-medium text-gray-700">실시간 미리보기 (32x32)</h3>
      <div className="flex justify-center">
        <div
          className="rounded-4 flex h-32 w-32 items-center justify-center border border-gray-300"
          style={{ backgroundColor: backgroundColor }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ color: iconColor }}>
            <g
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(svgContent, {
                  NAMESPACE: 'http://www.w3.org/2000/svg',
                }),
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
