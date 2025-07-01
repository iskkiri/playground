import type { Page } from '@playwright/test';

// 총 개수와 검색 개수 가져오기
export const getToalAndSearchCount = (page: Page) => {
  const totalCount = page.getByRole('status', { name: '전체 개수' });
  const searchCount = page.getByRole('status', { name: '검색 개수' });
  return { totalCount, searchCount };
};

// 마지막 페이지 버튼 가져오기
export const getLastPageButton = (page: Page) => {
  const pagination = page.getByRole('navigation', { name: 'Pagination' });
  const pageButtons = pagination.getByRole('button').filter({ hasText: /^\d+$/ });
  const lastPageButton = pageButtons.last();
  return lastPageButton;
};

// 검색 키워드 입력 후 검색
export const searchKeyword = async ({ page, keyword }: { page: Page; keyword: string }) => {
  const searchInput = page.getByRole('searchbox');
  await searchInput.click();
  await searchInput.fill(keyword);
  await page.keyboard.press('Enter');
};
