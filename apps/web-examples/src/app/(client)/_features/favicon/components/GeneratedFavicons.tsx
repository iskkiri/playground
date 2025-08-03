import Image from 'next/image';
import type { DownloadFaviconParams, GeneratedFavicon } from '../types/favicon.types';

interface GeneratedFaviconsProps {
  generatedFavicons: GeneratedFavicon[];
  onDownloadFavicon: (params: DownloadFaviconParams) => () => void;
}

export default function GeneratedFavicons({
  generatedFavicons,
  onDownloadFavicon,
}: GeneratedFaviconsProps) {
  return (
    <div className="rounded-8 border-success-200 bg-success-50 border p-16">
      <h3 className="typography-p4-14r text-success-800 mb-12 font-medium">생성된 파비콘들</h3>

      {/* 생성된 파비콘들을 2열 그리드로 표시 */}
      <div className="mb-16 grid grid-cols-2 gap-12">
        {generatedFavicons.map((favicon, index) => (
          <div key={index} className="text-center">
            <Image
              src={favicon.dataUrl}
              alt={`Favicon ${favicon.size}`}
              width={favicon.size}
              height={favicon.size}
              className="rounded-4 mx-auto mb-4 border border-gray-300"
              style={{
                // 파비콘 크기에 맞게 이미지 크기 동적 설정
                width: favicon.size,
                height: favicon.size,
              }}
            />
            <p className="typography-p5-12r text-gray-600">
              {favicon.size} x {favicon.size}
            </p>
          </div>
        ))}
      </div>

      {/* 다운로드 버튼들 섹션 */}
      <div className="space-y-8">
        <p className="typography-p4-14r font-medium text-gray-700">다운로드:</p>
        {generatedFavicons.map((favicon, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="typography-p4-14r text-gray-600">
              {favicon.size} x {favicon.size}
            </span>
            <button
              onClick={onDownloadFavicon({
                dataUrl: favicon.dataUrl,
                filename: `favicon-${favicon.size}.png`,
              })}
              className="typography-p4-14r text-primary hover:text-primary-dark underline"
            >
              다운로드
            </button>
          </div>
        ))}
      </div>

      {/* 사용자 도움말 팁 */}
      <div className="rounded-4 border-info-200 bg-info-50 mt-12 border p-8">
        <p className="typography-p5-12r text-info-800">
          💡 이미지를 우클릭하여 &quot;다른 이름으로 저장&quot;을 선택해도 됩니다.
        </p>
      </div>
    </div>
  );
}
