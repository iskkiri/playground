// 전화번호 형식으로 변환 (010-1234-5678)
export function formatPhoneNumber(value: string) {
  if (!value) return '';

  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  // 11자리로 제한
  const limitedNumbers = numbers.slice(0, 11);

  // 구간별로 하이픈 추가
  if (limitedNumbers.length <= 3) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 7) {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
  } else {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
  }
}
