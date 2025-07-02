'use client';

import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';

interface FormData {
  svgContent: string;
  backgroundColor: string;
  iconColor: string;
}

interface GeneratedFavicon {
  size: string;
  dataUrl: string;
}

interface SampleIcons {
  [key: string]: string;
}

const SvgFaviconGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    svgContent:
      '<path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    backgroundColor: '#ffffff',
    iconColor: '#000000',
  });
  const [generatedFavicons, setGeneratedFavicons] = useState<GeneratedFavicon[]>([]);
  const [svgError, setSvgError] = useState<string>('');

  // 샘플 SVG 아이콘들
  const sampleIcons: SampleIcons = {
    Box: '<path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    Heart:
      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>',
    Star: '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>',
    Home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>',
    User: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/>',
    Settings:
      '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="m12 1 0 6m0 6 0 10m11-7-6 0m-6 0-10 0" stroke="currentColor" stroke-width="2"/>',
    Mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>',
    Bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" fill="none"/><path d="m13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2"/>',
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'svgContent') {
      setSvgError('');
    }
  };

  const selectSampleIcon = (iconPath: string): void => {
    setFormData((prev) => ({
      ...prev,
      svgContent: iconPath,
    }));
    setSvgError('');
  };

  const validateSvg = (svgContent: string): string | null => {
    try {
      // 간단한 SVG 유효성 검사
      if (!svgContent.trim()) {
        return 'SVG 내용을 입력해주세요.';
      }

      // 기본적인 SVG 태그 검사
      if (!svgContent.includes('<') || !svgContent.includes('>')) {
        return 'SVG 태그 형식이 올바르지 않습니다.';
      }

      return null;
    } catch (_error) {
      return 'SVG 형식이 올바르지 않습니다.';
    }
  };

  const generateSvgFavicon = (
    svgContent: string,
    backgroundColor: string,
    iconColor: string,
    size: number
  ): Promise<string> => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas context를 가져올 수 없습니다.');
    }

    // 배경색 설정
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);

    // SVG를 이미지로 변환
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" style="color: ${iconColor};">
        ${svgContent}
      </svg>
    `;

    const img = new window.Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise<string>((resolve, reject) => {
      img.onload = () => {
        try {
          // SVG 이미지를 canvas에 그리기
          const padding = size * 0.15; // 15% 패딩
          const iconSize = size - padding * 2;
          ctx.drawImage(img, padding, padding, iconSize, iconSize);

          URL.revokeObjectURL(url);
          resolve(canvas.toDataURL('image/png'));
        } catch (error) {
          URL.revokeObjectURL(url);
          reject(error);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('SVG 이미지 로드에 실패했습니다.'));
      };

      img.src = url;
    });
  };

  const handleGenerate = async (): Promise<void> => {
    const error = validateSvg(formData.svgContent);
    if (error) {
      setSvgError(error);
      return;
    }

    setSvgError('');

    try {
      const sizes: number[] = [16, 32, 48, 64];
      const favicons: GeneratedFavicon[] = [];

      for (const size of sizes) {
        const dataUrl = await generateSvgFavicon(
          formData.svgContent,
          formData.backgroundColor,
          formData.iconColor,
          size
        );
        favicons.push({
          size: `${size}x${size}`,
          dataUrl: dataUrl,
        });
      }

      setGeneratedFavicons(favicons);
    } catch (error) {
      setSvgError('파비콘 생성 중 오류가 발생했습니다.');
      console.error('Favicon generation error:', error);
    }
  };

  const downloadFavicon = (dataUrl: string, filename: string): void => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="rounded-8 mx-auto max-w-4xl bg-white p-24 shadow-md">
      <h2 className="typography-h1-24r mb-24 text-center text-gray-800">SVG 기반 파비콘 생성기</h2>

      <div className="flex flex-col gap-24">
        {/* 입력 폼 */}
        <div className="space-y-16 lg:col-span-2">
          {/* 샘플 아이콘 선택 */}
          <div>
            <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
              샘플 아이콘 선택 (클릭하여 적용)
            </label>
            <div className="grid grid-cols-4 gap-8">
              {Object.entries(sampleIcons).map(([name, path]) => (
                <button
                  key={name}
                  onClick={() => selectSampleIcon(path)}
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

          {/* SVG 내용 입력 */}
          <div>
            <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
              SVG 내용 (path, circle, rect 등의 태그)
            </label>
            <textarea
              name="svgContent"
              value={formData.svgContent}
              onChange={handleInputChange}
              className="typography-p4-14r rounded-8 focus:ring-primary w-full border border-gray-300 px-12 py-8 font-mono focus:outline-none focus:ring-2"
              rows={4}
              placeholder='예: <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" fill="none"/>'
            />
            {svgError && <p className="typography-p4-14r text-error-600 mt-4">{svgError}</p>}
            <p className="typography-p5-12r mt-4 text-gray-500">
              currentColor를 사용하면 아이콘 색상이 자동으로 적용됩니다.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {/* 배경색 */}
            <div>
              <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
                배경색
              </label>
              <div className="flex items-center space-x-8">
                <input
                  type="color"
                  name="backgroundColor"
                  value={formData.backgroundColor}
                  onChange={handleInputChange}
                  className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={formData.backgroundColor}
                  onChange={handleInputChange}
                  name="backgroundColor"
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
                  name="iconColor"
                  value={formData.iconColor}
                  onChange={handleInputChange}
                  className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={formData.iconColor}
                  onChange={handleInputChange}
                  name="iconColor"
                  className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="rounded-8 bg-primary hover:bg-primary-dark focus:ring-primary w-full px-16 py-8 text-white focus:outline-none focus:ring-2"
            type="button"
          >
            SVG 파비콘 생성
          </button>
        </div>

        {/* 미리보기 및 결과 */}
        <div className="space-y-16">
          {/* 실시간 미리보기 */}
          <div className="rounded-8 border border-gray-200 p-16">
            <h3 className="typography-p4-14r mb-8 font-medium text-gray-700">
              실시간 미리보기 (32x32)
            </h3>
            <div className="flex justify-center">
              <div
                className="rounded-4 flex h-32 w-32 items-center justify-center border border-gray-300"
                style={{ backgroundColor: formData.backgroundColor }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ color: formData.iconColor }}
                >
                  <g dangerouslySetInnerHTML={{ __html: formData.svgContent }} />
                </svg>
              </div>
            </div>
          </div>

          {/* 생성된 파비콘들 */}
          {generatedFavicons.length > 0 && (
            <div className="rounded-8 border-success-200 bg-success-50 border p-16">
              <h3 className="typography-p4-14r text-success-800 mb-12 font-medium">
                생성된 파비콘들
              </h3>

              <div className="mb-16 grid grid-cols-2 gap-12">
                {generatedFavicons.map((favicon, index) => (
                  <div key={index} className="text-center">
                    <Image
                      src={favicon.dataUrl}
                      alt={`Favicon ${favicon.size}`}
                      className="rounded-4 mx-auto mb-4 border border-gray-300"
                      style={{
                        width: favicon.size.split('x')[0] + 'px',
                        height: favicon.size.split('x')[1] + 'px',
                      }}
                    />
                    <p className="typography-p5-12r text-gray-600">{favicon.size}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <p className="typography-p4-14r font-medium text-gray-700">다운로드:</p>
                {generatedFavicons.map((favicon, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="typography-p4-14r text-gray-600">{favicon.size}</span>
                    <button
                      onClick={() =>
                        downloadFavicon(favicon.dataUrl, `svg-favicon-${favicon.size}.png`)
                      }
                      className="typography-p4-14r text-primary hover:text-primary-dark underline"
                      type="button"
                    >
                      다운로드
                    </button>
                  </div>
                ))}
              </div>

              <div className="rounded-4 border-info-200 bg-info-50 mt-12 border p-8">
                <p className="typography-p5-12r text-info-800">
                  💡 아이콘은 자동으로 15% 패딩이 적용되어 적절한 여백을 가집니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SvgFaviconGenerator;
