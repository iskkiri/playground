import test, { expect, type Page } from '@playwright/test';
import type { UpdateNoticeRequestDto } from '@/app/(admin)/_features/notice/api/dtos/updateNotice.dto';
import { uploadFiles } from '@/__tests__/utils/file.utils';
import { removeData, removeFiles, removeImage, removeImages } from '@/__tests__/utils/remove.utils';
import {
  getLastPageButton,
  getToalAndSearchCount,
  searchKeyword,
} from '@/__tests__/utils/filter.utils';

test.beforeEach(async ({ page }) => {
  await page.goto('/admin/notice');
});

test('초기에는 10개의 행이 나타나며, 총 개수와 검색 개수가 표기된다.', async ({ page }) => {
  const table = page.getByRole('table');
  expect(table).toBeVisible();

  await expect(page.locator('tbody tr')).toHaveCount(10);

  const { totalCount, searchCount } = getToalAndSearchCount(page);
  await expect(totalCount).toHaveText('총 101개');
  await expect(searchCount).toHaveText('검색 0개');
});

test.describe('필터 및 검색', () => {
  test("노출 상태 필터를 '노출'로 선택할 경우 노출 상태인 공지사항만 나타나며, 검색 개수와 총 페이지 수가 변경된다.", async ({
    page,
  }) => {
    const exposureFilter = page.locator('label').filter({ hasText: '노출' });
    await exposureFilter.click();

    const { searchCount } = getToalAndSearchCount(page);
    await expect(searchCount).toHaveText('검색 51개');

    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('6');
  });

  test("'10'으로 검색 시 공지사항 제목에 '10'이 포함된 공지사항만 나타나며, 검색 개수와 총 페이지 수가 변경된다.", async ({
    page,
  }) => {
    await searchKeyword({ page, keyword: '10' });

    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(3);

    (await rows.all()).forEach((row) => {
      expect(row.locator('td').nth(1)).toContainText('10');
    });

    const { searchCount } = getToalAndSearchCount(page);
    await expect(searchCount).toHaveText('검색 3개');

    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('1');
  });

  test('초기화 버튼 클릭 시 필터 및 검색이 초기화된다', async ({ page }) => {
    // 노출 필터
    const exposureFilter = page.locator('label').filter({ hasText: '노출' });
    await exposureFilter.click();

    // '10' 검색
    await searchKeyword({ page, keyword: '10' });

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
    await expect(page.locator('tbody tr')).toHaveCount(50);

    // 페이지 버튼은 3개
    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('3');
  });

  test('페이지 버튼 클릭 시 페이지가 변경된다.', async ({ page }) => {
    const lastPageButton = getLastPageButton(page);
    await lastPageButton.click();
    await expect(page.locator('tbody tr')).toHaveCount(1);
  });
});

test.describe('공지사항 선택 삭제', () => {
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

      // 테스트 공지사항 101, 100  2개의 행 선택
      await page.getByRole('row', { name: '테스트 공지사항 101' }).locator('label').first().click();
      await page.getByRole('row', { name: '테스트 공지사항 100' }).locator('label').first().click();

      const deleteButton = page.getByRole('button', { name: '선택 삭제' });
      await deleteButton.click();

      // 모달이 나타날 때까지 대기
      const modal = page.getByRole('dialog');
      await expect(modal).toBeVisible();

      // 모달 안에 해당 텍스트가 있는지 확인
      await expect(modal).toContainText('선택된 공지사항을 삭제하시겠습니까?');
    });

    test('삭제 모달에서 닫기 버튼을 클릭하면 삭제 모달이 닫힌다.', async ({ page }) => {
      const modal = page.getByRole('dialog');

      const closeButton = modal.getByRole('button', { name: '닫기' });
      await closeButton.click();

      await expect(modal).not.toBeVisible();
    });

    test('삭제 모달에서 삭제 버튼을 클릭하면 공지사항이 삭제된다.', async ({ page }) => {
      const modal = page.getByRole('dialog');

      const deleteButton = modal.getByRole('button', { name: '삭제' });
      await deleteButton.click();

      await expect(modal).not.toBeVisible();

      await expect(
        page.getByRole('row', { name: '테스트 공지사항 101', exact: true })
      ).not.toBeVisible();
      await expect(
        page.getByRole('row', { name: '테스트 공지사항 100', exact: true })
      ).not.toBeVisible();

      // 삭제한 개수만큼 총 개수 감소
      const { totalCount } = getToalAndSearchCount(page);
      await expect(totalCount).toHaveText('총 99개');

      // 삭제한 데이터 복원
      await page.request.post('http://localhost:3000/api/admin/notice/test/reset');
    });
  });
});

test.describe('공지사항 생성', () => {
  test.beforeEach(async ({ page }) => {
    // 공지사항 생성 페이지로 이동
    const createButton = page.getByRole('button', { name: '추가하기' });
    await createButton.click();

    await expect(page.getByRole('heading', { name: '공지사항 생성' })).toBeVisible();
  });

  test.describe('필수 값을 입력하지 않는 경우', () => {
    test('제목을 입력하지 않고 제출 시 "제목을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('제목을 입력해 주세요');
    });

    test('내용을 입력하지 않고 제출 시 "내용을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const titleInput = page.getByPlaceholder('제목을 입력해 주세요');
      await titleInput.fill('제목');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('내용을 입력해 주세요');
    });

    test('썸네일을 업로드하지 않고 제출 시 "썸네일을 업로드해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const titleInput = page.getByPlaceholder('제목을 입력해 주세요');
      await titleInput.fill('제목');

      const contentInput = page.getByRole('textbox', {
        name: '리치 텍스트 편집기.',
      });
      await contentInput.fill('내용');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();
    });
  });

  test.describe('필수 값을 입력한 경우', () => {
    const validateRequiredNoticeValues = async (page: Page) => {
      // 입력한 제목이 저장되었는지 확인
      await expect(page.getByRole('textbox', { name: '제목을 입력해 주세요' })).toHaveValue(
        'e2e 테스트 제목'
      );
      // 입력한 내용이 저장되었는지 확인
      await expect(page.getByText('e2e 테스트 내용')).toBeVisible();
      // 입력한 썸네일이 저장되었는지 확인
      // sample6.png 파일이 업로드되면 sample6_랜덤문자열.webp 형태로 변환되어야 함
      await expect(page.getByRole('img', { name: '업로드된 이미지' })).toHaveAttribute(
        'src',
        /sample6_[A-Za-z0-9-_]+\.webp/
      );
    };

    // 필수 값들 입력
    test.beforeEach(async ({ page }) => {
      const titleInput = page.getByPlaceholder('제목을 입력해 주세요');
      await titleInput.fill('e2e 테스트 제목');

      const contentInput = page.getByRole('textbox', { name: '리치 텍스트 편집기.' });
      await contentInput.fill('e2e 테스트 내용');

      // 썸네일 업로드
      await uploadFiles({ page, text: '이미지 첨부', isMultiple: false });
    });

    // 테스트 후 공지사항, 썸네일, 첨부 파일 삭제
    test.afterEach(async ({ page }) => {
      // 공지사항 삭제
      await removeData({ page, category: 'notice' });
      // 썸네일 삭제
      await removeImages(page);
    });

    test('제목, 내용을 입력하고, 썸네일을 첨부해서 제출 시 공지사항이 생성된다.', async ({
      page,
    }) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      // 공지사항 생성 후 공지사항 수정 페이지로 이동
      await expect(page.getByRole('heading', { name: '공지사항 수정' })).toBeVisible();

      await expect(page.locator('label').filter({ hasText: '노출' })).toBeChecked();
      await validateRequiredNoticeValues(page);
    });

    test("노출 설정을 '숨김'으로 설정하고 제출 시 공지사항이 생성 시 노출 상태가 '숨김'으로 설정된다.", async ({
      page,
    }) => {
      const exposureFilter = page.locator('label').filter({ hasText: '숨김' });
      await exposureFilter.click();

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      // 공지사항 생성 후 공지사항 수정 페이지로 이동
      await expect(page.getByRole('heading', { name: '공지사항 수정' })).toBeVisible();

      await expect(page.locator('label').filter({ hasText: '숨김' })).toBeChecked();
      await validateRequiredNoticeValues(page);
    });

    test('제목, 내용을 입력하고, 썸네일, 파일을 첨부해서 제출 시 공지사항이 생성된다.', async ({
      page,
    }) => {
      // 파일 업로드
      await uploadFiles({ page, text: '파일 첨부', isMultiple: true });

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      // 공지사항 생성 후 공지사항 수정 페이지로 이동
      await expect(page.getByRole('heading', { name: '공지사항 수정' })).toBeVisible();

      await expect(page.locator('label').filter({ hasText: '노출' })).toBeChecked();
      await validateRequiredNoticeValues(page);

      await expect(page.getByRole('listitem').filter({ hasText: 'sample3.png' })).toBeVisible();
      await expect(page.getByRole('listitem').filter({ hasText: 'sample6.png' })).toBeVisible();

      // s3에서 파일 삭제
      await removeFiles(page);
    });
  });
});

test.describe('공지사항 수정', () => {
  test.beforeEach(async ({ page }) => {
    const rows = page.locator('tbody tr');
    // 데이터 로드 대기
    await expect(rows).toHaveCount(10);

    // 테스트 공지사항 95 수정 페이지로 이동
    await page.getByRole('row', { name: '테스트 공지사항 95' }).getByRole('link').click();
    await expect(page.getByRole('heading', { name: '공지사항 수정' })).toBeVisible();
    // 내용 (에디터가 lazy load 되는 것 때문에 명시적으로 대기)
    await expect(page.getByText('이것은 95번째 테스트 공지사항입니다.')).toBeVisible();
  });

  test('입력 필드의 값이 초기화되어 있다.', async ({ page }) => {
    // 노출 설정
    await expect(page.locator('label').filter({ hasText: '노출' })).toBeChecked();
    // 제목
    await expect(page.getByRole('textbox', { name: '제목을 입력해 주세요' })).toHaveValue(
      '테스트 공지사항 95'
    );
    // 썸네일
    await expect(page.getByRole('img', { name: '업로드된 이미지' })).toBeVisible();
    // 내용
    await expect(page.getByText('이것은 95번째 테스트 공지사항입니다.')).toBeVisible();
  });

  test.describe('필수 값을 입력하지 않은 경우', () => {
    test('제목을 입력하지 않고 제출 시 "제목을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const titleInput = page.getByPlaceholder('제목을 입력해 주세요');
      await titleInput.fill('');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('제목을 입력해 주세요');
    });

    test('내용을 입력하지 않고 제출 시 "내용을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const contentInput = page.getByRole('textbox', { name: '리치 텍스트 편집기.' });
      await contentInput.fill('');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('내용을 입력해 주세요');
    });
  });

  test.describe('필수 값을 모두 입력하고 수정하는 경우', () => {
    const submitAndCloseAlert = async (page: Page) => {
      // dialog 이벤트에 대한 Promise 생성
      const dialogPromise = page.waitForEvent('dialog');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      // dialog 처리
      const dialog = await dialogPromise;
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('공지사항 수정 완료');
      await dialog.accept();
    };

    test.afterEach(async ({ page }) => {
      const currentUrl = page.url();
      const idMatch = currentUrl.match(/\/notice\/([^/]+)\/edit/);
      const noticeId = idMatch ? idMatch[1] : null;

      // 수정한 공지사항 복구
      await page.request.put(`http://localhost:3000/api/admin/notice/${noticeId}`, {
        data: {
          title: '테스트 공지사항 95',
          content: '이것은 95번째 테스트 공지사항입니다.',
          isShow: true,
          thumbnail:
            'https://d37qx3oivk5uc5.cloudfront.net/notice/sample3_q6xcmW067YTbFO41ktF8H.webp',
          files: [],
        } satisfies Omit<UpdateNoticeRequestDto, 'id'>,
      });
    });

    test('노출 설정을 "숨김"으로 설정하고 제출 시 "공지사항 수정 완료" alert 메시지가 나타나고, 노출 상태가 "숨김"으로 설정된다.', async ({
      page,
    }) => {
      const exposureFilter = page.locator('label').filter({ hasText: '숨김' });
      await exposureFilter.click();

      await submitAndCloseAlert(page);

      await expect(page.locator('label').filter({ hasText: '숨김' })).toBeChecked();
    });

    test('제목을 "제목 수정 테스트"로 수정하고 제출 시 "공지사항 수정 완료" alert 메시지가 나타나고, 제목이 수정된다.', async ({
      page,
    }) => {
      // 내용
      await expect(page.getByText('이것은 95번째 테스트 공지사항입니다.')).toBeVisible();

      const titleInput = page.getByPlaceholder('제목을 입력해 주세요');
      await titleInput.fill('제목 수정 테스트');

      await submitAndCloseAlert(page);

      await expect(page.getByPlaceholder('제목을 입력해 주세요')).toHaveValue('제목 수정 테스트');
    });

    test('내용을 "내용 수정 테스트"로 수정하고 제출 시 "공지사항 수정 완료" alert 메시지가 나타나고, 내용이 수정된다.', async ({
      page,
    }) => {
      const contentInput = page.getByRole('textbox', { name: '리치 텍스트 편집기.' });
      await contentInput.fill('내용 수정 테스트');

      await submitAndCloseAlert(page);

      await expect(page.getByText('내용 수정 테스트')).toBeVisible();
    });

    test('썸네일을 수정하고 제출 시 "공지사항 수정 완료" alert 메시지가 나타나고, 썸네일이 수정된다.', async ({
      page,
    }) => {
      await uploadFiles({ page, text: '이미지 첨부', isMultiple: false });

      await submitAndCloseAlert(page);

      // sample6.png 파일이 업로드되면 sample6_랜덤문자열.webp 형태로 변환되어야 함
      const thumbnail = page.getByRole('img', { name: '업로드된 이미지' });
      await expect(thumbnail).toHaveAttribute('src', /sample6_[A-Za-z0-9-_]+\.webp/);

      // 썸네일 삭제
      const thumbnailSrc = await thumbnail.getAttribute('src');
      await removeImage({ page, src: thumbnailSrc || '' });
    });

    test('파일을 추가하고 제출 시 "공지사항 수정 완료" alert 메시지가 나타나고, 파일이 추가된다.', async ({
      page,
    }) => {
      await uploadFiles({ page, text: '파일 첨부', isMultiple: true });

      await submitAndCloseAlert(page);

      await expect(page.getByRole('listitem').filter({ hasText: 'sample3.png' })).toBeVisible();
      await expect(page.getByRole('listitem').filter({ hasText: 'sample6.png' })).toBeVisible();

      await removeFiles(page);
    });
  });
});
