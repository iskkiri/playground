'use client';

import Image from 'next/image';
import React, { useState, useRef, ChangeEvent } from 'react';

interface FormData {
  text: string;
  backgroundColor: string;
  textColor: string;
}

interface GeneratedFavicon {
  size: string;
  dataUrl: string;
}

const ClientFaviconGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    text: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  });
  const [generatedFavicons, setGeneratedFavicons] = useState<GeneratedFavicon[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateFavicon = (
    text: string,
    backgroundColor: string,
    textColor: string,
    size: number
  ): string => {
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

    // 텍스트 설정
    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.floor(size * 0.6)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 텍스트 그리기 (첫 번째 문자만 사용)
    const displayText = text.charAt(0).toUpperCase();
    ctx.fillText(displayText, size / 2, size / 2);

    return canvas.toDataURL('image/png');
  };

  const handleGenerate = (): void => {
    if (!formData.text.trim()) {
      alert('텍스트를 입력해주세요!');
      return;
    }

    const sizes: number[] = [16, 32, 48, 64];
    const favicons: GeneratedFavicon[] = sizes.map((size) => ({
      size: `${size}x${size}`,
      dataUrl: generateFavicon(formData.text, formData.backgroundColor, formData.textColor, size),
    }));

    setGeneratedFavicons(favicons);
  };

  const downloadFavicon = (dataUrl: string, filename: string): void => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="rounded-8 mx-auto max-w-2xl bg-white p-24 shadow-md">
      <h2 className="typography-h1-24r mb-24 text-center text-gray-800">
        클라이언트사이드 파비콘 생성기
      </h2>

      <div className="flex flex-col gap-24">
        {/* 입력 폼 */}
        <div className="space-y-16">
          <div>
            <label className="typography-p4-14r mb-8 block font-medium text-gray-700">
              텍스트 (첫 글자만 사용됩니다)
            </label>
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="rounded-8 focus:ring-primary w-full border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
              placeholder="예: A, 홈, 회사"
              maxLength={10}
            />
          </div>

          <div>
            <label className="typography-p4-14r mb-8 block font-medium text-gray-700">배경색</label>
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
                name="textColor"
                value={formData.textColor}
                onChange={handleInputChange}
                className="rounded-4 h-40 w-48 cursor-pointer border border-gray-300"
              />
              <input
                type="text"
                value={formData.textColor}
                onChange={handleInputChange}
                name="textColor"
                className="rounded-8 focus:ring-primary flex-1 border border-gray-300 px-12 py-8 focus:outline-none focus:ring-2"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="rounded-8 bg-primary hover:bg-primary-dark focus:ring-primary w-full px-16 py-8 text-white focus:outline-none focus:ring-2"
          >
            파비콘 생성
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
                className="rounded-4 flex h-32 w-32 items-center justify-center border border-gray-300 font-bold text-white"
                style={{
                  backgroundColor: formData.backgroundColor,
                  color: formData.textColor,
                  fontSize: '20px',
                }}
              >
                {formData.text.charAt(0).toUpperCase()}
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
                        downloadFavicon(favicon.dataUrl, `favicon-${favicon.size}.png`)
                      }
                      className="typography-p4-14r text-primary hover:text-primary-dark underline"
                    >
                      다운로드
                    </button>
                  </div>
                ))}
              </div>

              <div className="rounded-4 border-info-200 bg-info-50 mt-12 border p-8">
                <p className="typography-p5-12r text-info-800">
                  💡 이미지를 우클릭하여 &quot;다른 이름으로 저장&quot;을 선택해도 됩니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ClientFaviconGenerator;
