import fs from 'fs';
import path from 'path';

// 한 번에 모든 폰트 파일 찾기
function getAllFontPaths(fontNames: string[]): Record<string, string> {
  try {
    const fontDir = path.join(process.cwd(), '.next/static/media');

    if (!fs.existsSync(fontDir)) {
      return {};
    }

    const files = fs.readdirSync(fontDir);
    const fontPaths: Record<string, string> = {};

    fontNames.forEach((fontName) => {
      const fontFile = files.find((file) => file.startsWith(fontName) && file.endsWith('.woff2'));

      if (fontFile) {
        fontPaths[fontName] = `/_next/static/media/${fontFile}`;
      }
    });

    return fontPaths;
  } catch {
    return {};
  }
}

export default function FontPreloader() {
  const fontNames = [
    'Pretendard-Black',
    'Pretendard-ExtraBold',
    'Pretendard-Bold',
    'Pretendard-SemiBold',
    'Pretendard-Medium',
    'Pretendard-Regular',
    'Pretendard-Light',
    'Pretendard-ExtraLight',
    'Pretendard-Thin',
  ];

  const fontPaths = getAllFontPaths(fontNames);

  return (
    <>
      {Object.entries(fontPaths).map(([fontName, fontPath]) => (
        <link
          key={fontName}
          rel="preload"
          href={fontPath}
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
        />
      ))}
    </>
  );
}
