import { extractS3Key } from '@/_features/file/utils/file.util';
import type { Page } from '@playwright/test';

// 썸네일 삭제 (S3에 사용하지 않는 이미지가 쌓이는 것을 방지하기 위함)
export const removeImages = async (page: Page) => {
  // '업로드된 이미지' alt text를 가진 모든 이미지 찾기
  const images = await page.getByRole('img', { name: '업로드된 이미지' }).all();

  const imageFilenames = await Promise.all(
    images.map(async (image) => {
      const src = await image.getAttribute('src');
      if (src) {
        const imageFileName = extractS3Key(decodeURIComponent(src));
        return imageFileName;
      }
      return null;
    })
  );

  const validImageFilenames = imageFilenames.filter((file): file is string => file !== null);

  if (validImageFilenames.length > 0) {
    // S3에서 썸네일 삭제
    await page.request.delete('http://localhost:3000/api/file', {
      data: {
        filenames: validImageFilenames,
      },
    });
  }
};

export const removeImage = async ({ page, src }: { page: Page; src: string }) => {
  const filename = extractS3Key(decodeURIComponent(src));
  await page.request.delete('http://localhost:3000/api/file', {
    data: {
      filenames: [filename],
    },
  });
};

// 파일 삭제 (S3에 사용하지 않는 파일이 쌓이는 것을 방지하기 위함)
export const removeFiles = async (page: Page) => {
  // 파일 목록에서 파일명 찾기
  const files = await page.getByRole('listitem').all();
  const filenames = await Promise.all(
    files.map(async (file) => {
      const fileUrl = await file.getAttribute('data-file-url');
      if (fileUrl) {
        return `${extractS3Key(fileUrl)}`;
      }
      return null;
    })
  );

  const validFilenames = filenames.filter((file) => file !== null);

  if (validFilenames.length > 0) {
    await page.request.delete('http://localhost:3000/api/file', {
      data: {
        filenames: validFilenames,
      },
    });
  }
};

// 데이터 삭제 (데이터 생성 후 데이터의 일관성을 위해 삭제)
export const removeData = async ({ page, category }: { page: Page; category: string }) => {
  // URL에서 ID 추출
  const currentUrl = page.url();
  const idMatch = currentUrl.match(new RegExp(`/${category}/([^/]+)/edit`));
  const noticeId = idMatch ? idMatch[1] : null;

  if (noticeId) {
    await page.request.delete(`http://localhost:3000/api/admin/${category}`, {
      data: {
        idList: [noticeId],
      },
    });
  }
};
