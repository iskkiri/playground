/** 숫자 문자열에 천 단위 구분 쉼표(,)를 추가 */
export function addThousandSeparator(numberString: string | number) {
  if (!numberString) return '';

  return numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function removeThousandSeparator(formattedNumber: string) {
  if (!formattedNumber) return '';

  return formattedNumber.replace(/,/g, '');
}
