export const extractTextRegex = /(<([^>]+)>)/gi;

export function extractTextFromHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/g, '\n') // 엔터 처리
    .replace(extractTextRegex, '') // 태그 제거
    .replace(/^\n/, '');
}
