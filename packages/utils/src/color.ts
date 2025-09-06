import Color from 'color';

interface RGBColor {
  a?: number | undefined;
  b: number;
  g: number;
  r: number;
}

// RGBColor 객체 → rgba 문자열
export const rgbToString = (color: RGBColor): string => {
  return Color.rgb(color.r, color.g, color.b, color.a ?? 1).string();
};

// 기존 함수를 color 라이브러리로 변환
export const stringToRGB = (color: string): RGBColor => {
  try {
    const colorObj = Color(color);
    const rgb = colorObj.rgb().object();

    return {
      r: Math.round(rgb.r),
      g: Math.round(rgb.g),
      b: Math.round(rgb.b),
      a: rgb.alpha && rgb.alpha < 1 ? rgb.alpha : undefined,
    };
  } catch (_error) {
    throw new Error('Invalid color format');
  }
};
