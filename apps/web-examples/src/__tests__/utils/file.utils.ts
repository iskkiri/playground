import path from 'path';
import type { Page } from '@playwright/test';

interface CommonUploadFilesOptions {
  page: Page;
  files?: string[];
  isMultiple: boolean;
}

interface UploadFilesOptionsByText extends CommonUploadFilesOptions {
  text: string;
}

interface UploadFilesOptionsByAriaLabel extends CommonUploadFilesOptions {
  ariaLabel: string;
}

type UploadFilesOptions = UploadFilesOptionsByText | UploadFilesOptionsByAriaLabel;

// 파일 업로드
export const uploadFiles = async (params: UploadFilesOptions) => {
  const { page, files, isMultiple } = params;

  // 1. 먼저 파일 선택 이벤트를 기다리도록 설정
  const fileChooserPromise = page.waitForEvent('filechooser');

  // 2. 파일 선택 버튼 클릭
  if ('text' in params) {
    await page.locator('label').filter({ hasText: params.text }).click();
  } else {
    await page.getByLabel(params.ariaLabel).click();
  }

  // 3. 파일 선택 창이 열리면 파일 설정
  const fileChooser = await fileChooserPromise;

  let filePaths: string[] = [];
  if (files && Array.isArray(files) && files.length > 0) {
    filePaths = files;
  } else {
    if (isMultiple) {
      filePaths = [
        path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample3.png`),
        path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample6.png`),
      ];
    } else {
      filePaths = [
        path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample6.png`),
      ];
    }
  }

  await fileChooser.setFiles(filePaths);
};
