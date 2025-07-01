import { uploadFiles } from '@/__tests__/utils/file.utils';
import {
  getLastPageButton,
  getToalAndSearchCount,
  searchKeyword,
} from '@/__tests__/utils/filter.utils';
import { removeData, removeImage, removeImages } from '@/__tests__/utils/remove.utils';
import test, { expect, type Page } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
  await page.goto('/admin/banner');
});

test('초기에는 10개의 행이 나타나며, 총 개수와 검색 개수가 표기된다.', async ({ page }) => {
  const table = page.getByRole('table');
  expect(table).toBeVisible();

  await expect(page.locator('tbody tr')).toHaveCount(10);

  const { totalCount, searchCount } = getToalAndSearchCount(page);
  await expect(totalCount).toHaveText('총 11개');
  await expect(searchCount).toHaveText('검색 0개');
});

test.describe('필터 및 검색', () => {
  test('노출 상태 필터를 선택할 경우 노출 상태인 배너만 나타나며, 검색 개수와 총 페이지 수가 변경된다.', async ({
    page,
  }) => {
    const exposureFilter = page.locator('label').filter({ hasText: '노출' });
    await exposureFilter.click();

    const { searchCount } = getToalAndSearchCount(page);
    await expect(searchCount).toHaveText('검색 5개');

    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('1');
  });

  test("'1'로 검색 시 배너 제목에 '1'이 포함된 배너만 나타나며, 검색 개수와 총 페이지 수가 변경된다.", async ({
    page,
  }) => {
    await searchKeyword({ page, keyword: '1' });

    await expect(getToalAndSearchCount(page).searchCount).toHaveText('검색 3개');

    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('1');
  });

  test('초기화 버튼 클릭 시 필터 및 검색이 초기화된다', async ({ page }) => {
    // 노출 필터
    const exposureFilter = page.locator('label').filter({ hasText: '노출' });
    await exposureFilter.click();

    // '1' 검색
    await searchKeyword({ page, keyword: '1' });

    await expect(page.locator('tbody tr')).toHaveCount(1);

    await expect(getToalAndSearchCount(page).searchCount).toHaveText('검색 1개');

    // 초기화
    const resetButton = page.getByRole('button', { name: '초기화' });
    await resetButton.click();

    await expect(page.locator('tbody tr')).toHaveCount(10);

    await expect(getToalAndSearchCount(page).searchCount).toHaveText('검색 0개');
  });
});

test.describe('페이지네이션', () => {
  test('페이지 사이즈를 50개로 변경 시 테이블 행의 개수가 최대 50개가 되며, 총 페이지 수가 변경된다.', async ({
    page,
  }) => {
    await page.getByRole('combobox', { name: '페이지 사이즈' }).locator('xpath=../..').click();

    // 페이지 사이즈 50개로 변경
    await page.getByRole('option', { name: '50개' }).click();

    // 50개의 데이터가 있어야 한다.
    await expect(page.locator('tbody tr')).toHaveCount(11);

    // 페이지 버튼은 3개
    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('1');
  });

  test('페이지 버튼 클릭 시 페이지가 변경된다.', async ({ page }) => {
    const lastPageButton = getLastPageButton(page);
    await lastPageButton.click();
    await expect(page.locator('tbody tr')).toHaveCount(1);
  });
});

test.describe('배너 선택 삭제', () => {
  test.describe('행을 선택하지 않은 경우', () => {
    test('삭제 버튼이 비활성화 되어 있어서 삭제 모달이 열리지 않는다.', async ({ page }) => {
      const deleteButton = page.getByRole('button', { name: '선택 삭제' });
      await expect(deleteButton).toBeDisabled();
    });
  });

  test.describe('행을 선택한 경우', () => {
    test.beforeEach(async ({ page }) => {
      const rows = page.locator('tbody tr');
      // 데이터 로드 대기
      await expect(rows).toHaveCount(10);

      // 테스트 배너 1, 2  2개의 행 선택
      await page.getByRole('row', { name: '테스트 배너 1' }).locator('label').first().click();
      await page.getByRole('row', { name: '테스트 배너 2' }).locator('label').first().click();

      const deleteButton = page.getByRole('button', { name: '선택 삭제' });
      await deleteButton.click();

      // 모달이 나타날 때까지 대기
      const modal = page.getByRole('dialog');
      await expect(modal).toBeVisible();

      // 모달 안에 해당 텍스트가 있는지 확인
      await expect(modal).toContainText('선택된 배너를 삭제하시겠습니까?');
    });

    test('삭제 모달에서 닫기 버튼을 클릭하면 삭제 모달이 닫힌다.', async ({ page }) => {
      const modal = page.getByRole('dialog');

      const closeButton = modal.getByRole('button', { name: '닫기' });
      await closeButton.click();

      await expect(modal).not.toBeVisible();
    });

    test('삭제 모달에서 삭제 버튼을 클릭하면 배너가 삭제된다.', async ({ page }) => {
      const modal = page.getByRole('dialog');

      const deleteButton = modal.getByRole('button', { name: '삭제' });
      await deleteButton.click();

      await expect(modal).not.toBeVisible();

      await expect(page.getByRole('row', { name: '테스트 배너 1', exact: true })).not.toBeVisible();
      await expect(page.getByRole('row', { name: '테스트 배너 2', exact: true })).not.toBeVisible();

      // 삭제한 개수만큼 총 개수 감소
      const { totalCount } = getToalAndSearchCount(page);
      await expect(totalCount).toHaveText('총 9개');

      // 삭제한 데이터 복원
      await page.request.post('http://localhost:3000/api/admin/banner/test/reset');
    });
  });
});

test.describe('배너 생성', () => {
  test.beforeEach(async ({ page }) => {
    const createButton = page.getByRole('button', { name: '추가하기' });
    await createButton.click();

    await expect(page.getByRole('heading', { name: '배너 생성' })).toBeVisible();
  });

  test.describe('필수 값을 입력하지 않은 경우', () => {
    test('배너명을 입력하지 않고 제출 시 "배너명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('배너명을 입력해 주세요');
    });

    test('모바일 이미지를 업로드하지 않고 제출 시 "모바일용 이미지를 업로드해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const bannerNameInput = page.getByPlaceholder('배너명을 입력해 주세요');
      await bannerNameInput.fill('테스트 배너');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('모바일용 이미지를 업로드해 주세요');
    });

    test('PC 이미지를 업로드하지 않고 제출 시 "PC용 이미지를 업로드해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const bannerNameInput = page.getByPlaceholder('배너명을 입력해 주세요');
      await bannerNameInput.fill('테스트 배너');

      await uploadFiles({ page, ariaLabel: '모바일용 배너 이미지 첨부', isMultiple: false });

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('PC용 이미지를 업로드해 주세요');
    });
  });

  test.describe('필수 값을 입력한 경우', () => {
    const validateRequiredBannerValues = async (page: Page) => {
      // 입력한 배너명이 저장되었는지 확인
      await expect(page.getByRole('textbox', { name: '배너명을 입력해 주세요' })).toHaveValue(
        'e2e 테스트 배너명'
      );
      // 입력한 모바일 이미지가 저장되었는지 확인
      await expect(
        page
          .locator('div')
          .filter({ hasText: /^모바일용 이미지/ })
          .getByRole('img', { name: '업로드된 이미지' })
      ).toHaveAttribute('src', /sample3_[A-Za-z0-9-_]+\.webp/);
      // 입력한 PC 이미지가 저장되었는지 확인
      await expect(
        page
          .locator('div')
          .filter({ hasText: /^PC용 이미지/ })
          .getByRole('img', { name: '업로드된 이미지' })
      ).toHaveAttribute('src', /sample6_[A-Za-z0-9-_]+\.webp/);
    };

    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder('배너명을 입력해 주세요').fill('e2e 테스트 배너명');

      await uploadFiles({
        page,
        files: [
          path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample3.png`),
        ],
        ariaLabel: '모바일용 배너 이미지 첨부',
        isMultiple: false,
      });

      await uploadFiles({
        page,
        files: [
          path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample6.png`),
        ],
        ariaLabel: 'PC용 배너 이미지 첨부',
        isMultiple: false,
      });
    });

    // 테스트 후 배너, 썸네일, 첨부 파일 삭제
    test.afterEach(async ({ page }) => {
      // 배너 삭제
      await removeData({ page, category: 'banner' });
      // 배너 이미지 삭제
      await removeImages(page);
    });

    test('배너명, 모바일 이미지, PC 이미지를 첨부해서 제출 시 배너가 생성된다.', async ({
      page,
    }) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      await expect(page.getByRole('heading', { name: '배너 수정' })).toBeVisible();
      await validateRequiredBannerValues(page);
    });

    test('배너명, 모바일 이미지, PC 이미지를 첨부하고, 모바일 링크, PC 링크를 입력해서 제출 시 배너가 생성된다.', async ({
      page,
    }) => {
      const mobileLinkInput = page
        .locator('div')
        .filter({ hasText: /^모바일용 이미지/ })
        .getByPlaceholder('링크를 입력해 주세요');
      await mobileLinkInput.fill('https://naver.com');

      const pcLinkInput = page
        .locator('div')
        .filter({ hasText: /^PC용 이미지/ })
        .getByPlaceholder('링크를 입력해 주세요');
      await pcLinkInput.fill('https://google.com');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      await expect(page.getByRole('heading', { name: '배너 수정' })).toBeVisible();
      // 필수값
      await validateRequiredBannerValues(page);
      // 모바일 링크
      await expect(mobileLinkInput).toHaveValue('https://naver.com');
      // PC 링크
      await expect(pcLinkInput).toHaveValue('https://google.com');
    });
  });
});

test.describe('배너 수정', () => {
  test.beforeEach(async ({ page }) => {
    const rows = page.locator('tbody tr');
    // 데이터 로드 대기
    await expect(rows).toHaveCount(10);

    // 테스트 배너 10 수정 페이지로 이동
    await page.getByRole('row', { name: '테스트 배너 10' }).getByRole('link').click();
    await expect(page.getByRole('heading', { name: '배너 수정' })).toBeVisible();
  });

  test('입력 필드의 값이 초기화되어 있다.', async ({ page }) => {
    // 배너명
    const bannerNameInput = page.getByPlaceholder('배너명을 입력해 주세요');
    await expect(bannerNameInput).toHaveValue('테스트 배너 10');

    const mobileImageField = page.locator('div').filter({ hasText: /^모바일용 이미지/ });
    // 모바일용 이미지
    const mobileImageSrc = await mobileImageField.getByRole('img').getAttribute('src');
    expect(mobileImageSrc).toMatch(/sample5_[A-Za-z0-9-_]+\.webp/);
    // 모바일용 이미지 링크
    const mobileLinkInput = mobileImageField.getByPlaceholder('링크를 입력해 주세요');
    await expect(mobileLinkInput).toHaveValue('https://naver.com');

    const pcImageField = page.locator('div').filter({ hasText: /^PC용 이미지/ });
    // pc용 이미지
    const pcImageSrc = await pcImageField.getByRole('img').getAttribute('src');
    expect(pcImageSrc).toMatch(/sample6_[A-Za-z0-9-_]+\.webp/);
    // pc용 이미지 링크
    const pcLinkInput = pcImageField.getByPlaceholder('링크를 입력해 주세요');
    await expect(pcLinkInput).toHaveValue('https://google.com');
  });

  test.describe('필수 값을 입력하지 않은 경우', () => {
    test('배너명을 입력하지 않고 제출 시 "배너명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      await page.getByPlaceholder('배너명을 입력해 주세요').fill('');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('배너명을 입력해 주세요');
    });
  });

  test.describe('필수 값을 입력한 경우', () => {
    const submitAndCloseModal = async (page: Page) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('배너 수정이 완료되었습니다.');

      await modal.getByRole('button', { name: '확인' }).click();
    };

    test.afterEach(async ({ page }) => {
      const currentUrl = page.url();
      const idMatch = currentUrl.match(/\/banner\/([^/]+)\/edit/);
      const bannerId = idMatch ? idMatch[1] : null;

      // 수정한 배너 복구
      await page.request.put(`http://localhost:3000/api/admin/banner/${bannerId}`, {
        data: {
          title: '테스트 배너 10',
          mobileImage:
            'https://d37qx3oivk5uc5.cloudfront.net/banner/sample5_Q3TXULpi1koWdLNcDkcON.webp',
          mobileLink: 'https://naver.com',
          pcImage:
            'https://d37qx3oivk5uc5.cloudfront.net/banner/sample6_nPAVCYYtzXEJcfXk4Agdf.webp',
          pcLink: 'https://google.com',
        },
      });
    });

    test('배너명을 "배너명 수정 테스트"로 수정하고 제출 시 "배너 수정 완료" 모달이 나타나고, 배너명이 수정된다.', async ({
      page,
    }) => {
      const bannerNameInput = page.getByPlaceholder('배너명을 입력해 주세요');
      await bannerNameInput.fill('배너명 수정 테스트');

      await submitAndCloseModal(page);

      await expect(bannerNameInput).toHaveValue('배너명 수정 테스트');
    });

    test('모바일용 이미지를 수정하고 제출 시 "배너 수정 완료" 모달이 나타나고, 모바일용 이미지가 수정된다.', async ({
      page,
    }) => {
      await uploadFiles({
        page,
        ariaLabel: '모바일용 배너 이미지 첨부',
        files: [
          path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample6.png`),
        ],
        isMultiple: false,
      });

      await submitAndCloseModal(page);

      const mobileFields = page.locator('div').filter({ hasText: /^모바일용 이미지/ });
      const mobileImage = mobileFields.getByRole('img', { name: '업로드된 이미지' });
      await expect(mobileImage).toHaveAttribute('src', /sample6_[A-Za-z0-9-_]+\.webp/);

      // 모바일용 이미지를 s3에서 삭제
      const mobileImageSrc = await mobileImage.getAttribute('src');
      await removeImage({ page, src: mobileImageSrc || '' });
    });

    test('모바일 링크를 수정하고 제출 시 "배너 수정 완료" 모달이 나타나고, 모바일 링크가 수정된다.', async ({
      page,
    }) => {
      const mobileFields = page.locator('div').filter({ hasText: /^모바일용 이미지/ });
      const mobileLinkInput = mobileFields.getByPlaceholder('링크를 입력해 주세요');
      await mobileLinkInput.fill('https://mobile-link.com');

      await submitAndCloseModal(page);

      await expect(mobileLinkInput).toHaveValue('https://mobile-link.com');
    });

    test('PC 이미지를 수정하고 제출 시 "배너 수정 완료" 모달이 나타나고, PC 이미지가 수정된다.', async ({
      page,
    }) => {
      await uploadFiles({
        page,
        ariaLabel: 'PC용 배너 이미지 첨부',
        files: [
          path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample3.png`),
        ],
        isMultiple: false,
      });

      await submitAndCloseModal(page);

      const pcFields = page.locator('div').filter({ hasText: /^PC용 이미지/ });
      const pcImage = pcFields.getByRole('img', { name: '업로드된 이미지' });
      await expect(pcImage).toHaveAttribute('src', /sample3_[A-Za-z0-9-_]+\.webp/);

      // pc용 이미지를 s3에서 삭제
      const pcImageSrc = await pcImage.getAttribute('src');
      await removeImage({ page, src: pcImageSrc || '' });
    });

    test('PC 링크를 수정하고 제출 시 "배너 수정 완료" 모달이 나타나고, PC 링크가 수정된다.', async ({
      page,
    }) => {
      const pcImageField = page.locator('div').filter({ hasText: /^PC용 이미지/ });
      const pcLinkInput = pcImageField.getByPlaceholder('링크를 입력해 주세요');
      await pcLinkInput.fill('https://pc-link.com');

      await submitAndCloseModal(page);

      await expect(pcImageField.getByPlaceholder('링크를 입력해 주세요')).toHaveValue(
        'https://pc-link.com'
      );
    });
  });
});
