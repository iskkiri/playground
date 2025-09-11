/**
 * 날짜 입력값을 YYYY-MM-DD 형식으로 실시간 포맷팅하는 함수
 * @param value - 입력된 문자열 값
 * @param isDeleting - 삭제 동작인지 여부 (기본값: false)
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDateInput({ value, isDeleting = false }: { value: string; isDeleting?: boolean }): string {
  // 숫자만 추출
  const numbersOnly = value.replace(/\D/g, '');

  let formatted = '';

  if (numbersOnly.length <= 4) {
    // YYYY
    formatted = numbersOnly;
    // 4자리 완성되면 자동으로 - 추가 (삭제 중이 아닐 때만)
    if (numbersOnly.length === 4 && !isDeleting) {
      formatted += '-';
    }
  } else if (numbersOnly.length <= 6) {
    // YYYY-MM
    formatted = `${numbersOnly.substring(0, 4)}-${numbersOnly.substring(4)}`;
    // 6자리 완성되면 자동으로 - 추가 (삭제 중이 아닐 때만)
    if (numbersOnly.length === 6 && !isDeleting) {
      formatted += '-';
    }
  } else if (numbersOnly.length <= 8) {
    // YYYY-MM-DD
    formatted = `${numbersOnly.substring(0, 4)}-${numbersOnly.substring(4, 6)}-${numbersOnly.substring(6)}`;
  } else {
    // 8자리 넘으면 자르기
    formatted = `${numbersOnly.substring(0, 4)}-${numbersOnly.substring(4, 6)}-${numbersOnly.substring(6, 8)}`;
  }

  return formatted;
}