import { uploadFiles } from '@/__tests__/utils/file.utils';
import {
  getLastPageButton,
  getToalAndSearchCount,
  searchKeyword,
} from '@/__tests__/utils/filter.utils';
import { removeData, removeImage, removeImages } from '@/__tests__/utils/remove.utils';
import type { CreatePopupRequestDto } from '@/app/(admin)/_features/popup/api/dtos/createPopup.dto';
import test, { expect, type Page } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
  await page.goto('/admin/popup');
});

test('초기에는 7개의 행이 나타나며, 총 개수와 검색 개수가 표기된다.', async ({ page }) => {
  const table = page.getByRole('table');
  expect(table).toBeVisible();

  await expect(page.locator('tbody tr')).toHaveCount(7);

  const { totalCount, searchCount } = getToalAndSearchCount(page);
  await expect(totalCount).toHaveText('총 7개');
  await expect(searchCount).toHaveText('검색 0개');
});

test.describe('필터 및 검색', () => {
  test("노출 상태 필터를 '노출'로 선택할 경우 노출 상태인 팝업만 나타나며, 검색 개수와 총 페이지 수가 변경된다.", async ({
    page,
  }) => {
    const exposureFilter = page.locator('label').filter({ hasText: '노출' });
    await exposureFilter.click();

    const { searchCount } = getToalAndSearchCount(page);
    await expect(searchCount).toHaveText('검색 6개');

    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('1');
  });

  test("'2'으로 검색 시 팝업명에 '2'가 포함된 팝업만 나타나며, 검색 개수와 총 페이지 수가 변경된다.", async ({
    page,
  }) => {
    await searchKeyword({ page, keyword: '2' });

    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(2);

    (await rows.all()).forEach((row) => {
      expect(row.locator('td').nth(1)).toContainText('2');
    });

    const { searchCount } = getToalAndSearchCount(page);
    await expect(searchCount).toHaveText('검색 2개');

    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('1');
  });

  test('초기화 버튼 클릭 시 필터 및 검색이 초기화된다', async ({ page }) => {
    // 노출 필터
    const exposureFilter = page.locator('label').filter({ hasText: '노출' });
    await exposureFilter.click();

    // '2' 검색
    await searchKeyword({ page, keyword: '2' });

    await expect(page.locator('tbody tr')).toHaveCount(2);

    await expect(getToalAndSearchCount(page).searchCount).toHaveText('검색 2개');

    // 초기화
    const resetButton = page.getByRole('button', { name: '초기화' });
    await resetButton.click();

    await expect(page.locator('tbody tr')).toHaveCount(7);

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
    await expect(page.locator('tbody tr')).toHaveCount(7);

    // 페이지 버튼은 3개
    const lastPageButton = getLastPageButton(page);
    await expect(lastPageButton).toHaveText('1');
  });
});

test.describe('팝업 선택 삭제', () => {
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
      await expect(rows).toHaveCount(7);

      // 2개의 행 선택
      await page
        .getByRole('row', { name: '	너비/높이 1:1인 팝업' })
        .locator('label')
        .first()
        .click();
      await page
        .getByRole('row', { name: '너비/높이 2:1인 팝업' })
        .locator('label')
        .first()
        .click();

      const deleteButton = page.getByRole('button', { name: '선택 삭제' });
      await deleteButton.click();

      // 모달이 나타날 때까지 대기
      const modal = page.getByRole('dialog');
      await expect(modal).toBeVisible();

      // 모달 안에 해당 텍스트가 있는지 확인
      await expect(modal).toContainText('선택된 팝업을 삭제하시겠습니까?');
    });

    test('삭제 모달에서 닫기 버튼을 클릭하면 삭제 모달이 닫힌다.', async ({ page }) => {
      const modal = page.getByRole('dialog');

      const closeButton = modal.getByRole('button', { name: '닫기' });
      await closeButton.click();

      await expect(modal).not.toBeVisible();
    });

    test('삭제 모달에서 삭제 버튼을 클릭하면 팝업이 삭제된다.', async ({ page }) => {
      const modal = page.getByRole('dialog');

      const deleteButton = modal.getByRole('button', { name: '삭제' });
      await deleteButton.click();

      await expect(modal).not.toBeVisible();

      await expect(
        page.getByRole('row', { name: '너비/높이 1:1인 팝업', exact: true })
      ).not.toBeVisible();
      await expect(
        page.getByRole('row', { name: '너비/높이 2:1인 팝업', exact: true })
      ).not.toBeVisible();

      // 삭제한 개수만큼 총 개수 감소
      const { totalCount } = getToalAndSearchCount(page);
      await expect(totalCount).toHaveText('총 5개');

      // 삭제한 데이터 복원
      await page.request.post('http://localhost:3000/api/admin/popup/test/reset');
    });
  });
});

test.describe('팝업 생성', () => {
  test.beforeEach(async ({ page }) => {
    const createButton = page.getByRole('button', { name: '추가하기' });
    await createButton.click();

    await expect(page.getByRole('heading', { name: '팝업 생성' })).toBeVisible();
  });

  test.describe('필수 값을 입력하지 않은 경우', () => {
    test('팝업명을 입력하지 않고 제출 시 "팝업명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('팝업명을 입력해주세요.');
    });

    test('팝업 이미지를 업로드하지 않고 제출 시 "팝업 이미지를 업로드해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      const popupNameInput = page.getByPlaceholder('팝업명을 입력해 주세요');
      await popupNameInput.fill('테스트 팝업');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('팝업 이미지를 첨부해주세요.');
    });
  });

  test.describe('필수 값을 입력한 경우', () => {
    const submitAndValidateRequiredPopupValues = async (page: Page) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      await expect(page.getByRole('heading', { name: '팝업 수정' })).toBeVisible();

      // 입력한 팝업명이 저장되었는지 확인
      await expect(page.getByRole('textbox', { name: '팝업명을 입력해 주세요' })).toHaveValue(
        'e2e 테스트 팝업명'
      );
      // 입력한 팝업 이미지가 저장되었는지 확인
      await expect(page.getByRole('img', { name: '업로드된 이미지' })).toHaveAttribute(
        'src',
        /sample3_[A-Za-z0-9-_]+\.webp/
      );
    };

    const fillRequiredPopupValues = async (page: Page) => {
      await page.getByPlaceholder('팝업명을 입력해 주세요').fill('e2e 테스트 팝업명');

      await uploadFiles({
        page,
        files: [
          path.join(process.cwd(), `${process.env.PROJECT_PATH}/public/assets/images/sample3.png`),
        ],
        text: '이미지 첨부',
        isMultiple: false,
      });
    };

    test.beforeEach(async ({ page }) => fillRequiredPopupValues(page));

    // 테스트 후 팝업, 썸네일, 첨부 파일 삭제
    test.afterEach(async ({ page }) => {
      // 팝업 삭제
      await removeData({ page, category: 'popup' });
      // 팝업 이미지 삭제
      await removeImages(page);
    });

    test('팝업명, 팝업 이미지를 첨부해서 제출 시 팝업이 생성된다.', async ({ page }) => {
      await submitAndValidateRequiredPopupValues(page);
    });

    test.describe('노출 상태', () => {
      test('노출 상태를 "PC만 노출"로 설정하고 제출 시, 노출상태가 "PC만 노출"로 설정된다.', async ({
        page,
      }) => {
        const displayTypeSelect = page.getByRole('radio', { name: 'PC만 노출' });
        await displayTypeSelect.click();

        await submitAndValidateRequiredPopupValues(page);

        await expect(displayTypeSelect).toBeChecked();
      });

      test('노출 상태를 "모바일만 노출"로 설정하고 제출 시, 노출상태가 "모바일만 노출"로 설정된다.', async ({
        page,
      }) => {
        const displayTypeSelect = page.getByRole('radio', { name: '모바일만 노출' });
        await displayTypeSelect.click();

        await submitAndValidateRequiredPopupValues(page);

        await expect(displayTypeSelect).toBeChecked();
      });
    });

    test.describe('PC 노출 위치', () => {
      test('PC 노출 위치를 "왼쪽"으로 설정하고 제출 시, PC 노출 위치가 "왼쪽"으로 설정된다.', async ({
        page,
      }) => {
        const pcPositionSelect = page.getByRole('radio', { name: '왼쪽' });
        await pcPositionSelect.click();

        await submitAndValidateRequiredPopupValues(page);

        await expect(pcPositionSelect).toBeChecked();
      });

      test('pc 노출 위치를 "가운데"로 설정하고 제출 시, PC 노출 위치가 "가운데"로 설정된다.', async ({
        page,
      }) => {
        const pcPositionSelect = page.getByRole('radio', { name: '가운데' });
        await pcPositionSelect.click();

        await submitAndValidateRequiredPopupValues(page);

        await expect(pcPositionSelect).toBeChecked();
      });

      test('PC 노출 위치를 "오른쪽"으로 설정하고 제출 시, PC 노출 위치가 "오른쪽"으로 설정된다.', async ({
        page,
      }) => {
        const pcPositionSelect = page.getByRole('radio', { name: '오른쪽' });
        await pcPositionSelect.click();

        await submitAndValidateRequiredPopupValues(page);

        await expect(pcPositionSelect).toBeChecked();
      });

      test('PC 노출 위치를 "직접 입력"으로 선택하고 [x,y] 값을 입력하고 제출 시, PC 노출 위치가 "직접 입력"으로 설정되고 [x, y] 값이 설정된다.', async ({
        page,
      }) => {
        const pcPositionSelect = page.getByRole('radio', { name: 'PC 노출 위치 직접 입력' });
        await pcPositionSelect.click();

        const xCoordinateInput = page.getByPlaceholder('왼쪽에서부터(px)');
        await xCoordinateInput.fill('100');
        const yCoordinateInput = page.getByPlaceholder('위에서부터(px)');
        await yCoordinateInput.fill('200');

        await submitAndValidateRequiredPopupValues(page);

        await expect(pcPositionSelect).toBeChecked();
        await expect(xCoordinateInput).toHaveValue('100');
        await expect(yCoordinateInput).toHaveValue('200');
      });
    });

    test.describe('노출 기간', () => {
      test('오늘 이전 날짜를 선택할 수 없도록 disabled 처리 되어 있다.', async ({ page }) => {
        // 현재 달의 15일 계산
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 15);
        // 시계를 특정 날짜로 설정
        await page.clock.install({ time: firstDayOfMonth });
        // 페이지 새로고침 (모킹된 시간으로 다시 로드)
        await page.reload();

        // 날짜 선택 input 클릭
        const datepickerInputContainer = page.getByLabel('날짜 선택');
        await datepickerInputContainer.click();

        // 날짜 선택 모달이 나타날 때까지 대기
        const datepickerDialog = page.getByRole('dialog', { name: 'Choose Date' });
        await expect(datepickerDialog).toBeVisible();

        // 14일은 비활성화
        const disabledDateOption = page.getByRole('option', { name: /14th/ });
        await expect(disabledDateOption).toBeDisabled();

        // 15일은 활성화
        const enabledDateOption = page.getByRole('option', { name: /15th/ });
        await expect(enabledDateOption).toBeEnabled();
      });

      test('노출 기간을 설정하고 제출 시 노출 기간이 설정된다.', async ({ page }) => {
        // 현재 달의 1일 계산
        const now = new Date();
        const currentMonth = now.getMonth();
        const firstDayOfMonth = new Date(now.getFullYear(), currentMonth, 1);
        // 시계를 특정 날짜로 설정
        await page.clock.install({ time: firstDayOfMonth });
        // 페이지 새로고침 (모킹된 시간으로 다시 로드)
        await page.reload();

        await fillRequiredPopupValues(page);

        // 날짜 선택 input 클릭
        const datepickerInputContainer = page.getByLabel('날짜 선택');
        await datepickerInputContainer.click();

        // 날짜 선택 모달이 나타날 때까지 대기
        const datepickerDialog = page.getByRole('dialog', { name: 'Choose Date' });
        await expect(datepickerDialog).toBeVisible();

        // 15일 선택
        const dateOption = page.getByRole('option', { name: /15th/ });
        await dateOption.click();

        // 20일 선택
        const endDateOption = page.getByRole('option', { name: /20th/ });
        await endDateOption.click();

        // 선택 완료
        const selectButton = datepickerDialog.getByRole('button', { name: '선택 완료' });
        await selectButton.click();

        await submitAndValidateRequiredPopupValues(page);

        const datepickerInput = page.getByRole('textbox', { name: '날짜 입력' });
        await expect(datepickerInput).toHaveValue(
          `2025-${(currentMonth + 1).toString().padStart(2, '0')}-15 - 2025-${(currentMonth + 1).toString().padStart(2, '0')}-20`
        );
      });
    });

    test('팝업 이미지 링크를 입력하고 제출 시 팝업 이미지 링크가 설정된다.', async ({ page }) => {
      const popupLinkInput = page.getByPlaceholder('링크를 입력해 주세요');
      await popupLinkInput.fill('https://google.com');

      await submitAndValidateRequiredPopupValues(page);

      // 링크
      await expect(popupLinkInput).toHaveValue('https://google.com');
    });

    test('이미지 너비를 "직접 입력"으로 선택하고 너비를 입력하여 제출 시 이미지 너비가 설정된다.', async ({
      page,
    }) => {
      const imageWidthSelect = page.getByRole('radio', { name: '이미지 너비 직접 입력' });
      await imageWidthSelect.click();

      const imageWidthInput = page.getByPlaceholder('이미지 너비(px)');
      await imageWidthInput.fill('100');

      await submitAndValidateRequiredPopupValues(page);

      await expect(imageWidthInput).toHaveValue('100');
    });
  });
});

test.describe('팝업 수정', () => {
  test.beforeEach(async ({ page }) => {
    const rows = page.locator('tbody tr');
    // 데이터 로드 대기
    await expect(rows).toHaveCount(7);

    // 수정 페이지로 이동
    await page.getByRole('row', { name: '너비/높이 1:1인 팝업' }).getByRole('link').click();
    await expect(page.getByRole('img', { name: '업로드된 이미지' })).toBeVisible();
  });

  test('입력 필드의 값이 초기화되어 있다.', async ({ page }) => {
    // 팝업명
    const popupNameInput = page.getByPlaceholder('팝업명을 입력해 주세요');
    await expect(popupNameInput).toHaveValue('너비/높이 1:1인 팝업');

    // 노출상태
    const displayTypeSelect = page.getByRole('radio', { name: '전체노출' });
    expect(displayTypeSelect).toBeChecked();

    // PC 노출 위치
    const pcPositionSelect = page.getByRole('radio', { name: '가운데' });
    expect(pcPositionSelect).toBeChecked();

    // 노출 기간
    const datepickerInput = page.getByLabel('날짜 입력');
    expect(datepickerInput).toHaveValue('');

    // 팝업 이미지
    const popupImage = page.getByRole('img', { name: '업로드된 이미지' });
    await expect(popupImage).toHaveAttribute('src', /one-to-one_[A-Za-z0-9-_]+\.png/);

    // 팝업 이미지 링크
    const popupLinkInput = page.getByPlaceholder('링크를 입력해 주세요');
    await expect(popupLinkInput).toHaveValue('https://naver.com');

    // 이미지 너비
    const imageWidthSelect = page.getByRole('radio', { name: '자동' });
    expect(imageWidthSelect).toBeChecked();
  });

  test.describe('필수 값을 입력하지 않은 경우', () => {
    test('팝업명을 입력하지 않고 제출 시 "팝업명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async ({
      page,
    }) => {
      await page.getByPlaceholder('팝업명을 입력해 주세요').fill('');

      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('팝업명을 입력해주세요.');
    });
  });

  test.describe('필수 값을 입력한 경우', () => {
    const submitAndCloseModal = async (page: Page) => {
      const submitButton = page.getByRole('button', { name: '저장하기' });
      await submitButton.click();

      const modal = page.getByRole('dialog');
      await expect(modal).toContainText('팝업 수정이 완료되었습니다.');

      await modal.getByRole('button', { name: '확인' }).click();
    };

    test.afterEach(async ({ page }) => {
      const currentUrl = page.url();
      const idMatch = currentUrl.match(/\/popup\/([^/]+)\/edit/);
      const popupId = idMatch ? idMatch[1] : null;

      // 수정한 배너 복구
      await page.request.put(`http://localhost:3000/api/admin/popup/${popupId}`, {
        data: {
          title: '너비/높이 1:1인 팝업',
          displayType: 'ALL',
          pcPosition: 'CENTER',
          xCoordinate: 0,
          yCoordinate: 0,
          startDate: null,
          endDate: null,
          imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
          link: 'https://naver.com',
          popupWidthStatus: 'AUTO',
          imageWidth: 0,
        } satisfies CreatePopupRequestDto,
      });
    });

    test('팝업명을 "팝업명 수정 테스트"로 수정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, 팝업명이 수정된다.', async ({
      page,
    }) => {
      const popupNameInput = page.getByPlaceholder('팝업명을 입력해 주세요');
      await popupNameInput.fill('팝업명 수정 테스트');

      await submitAndCloseModal(page);

      await expect(popupNameInput).toHaveValue('팝업명 수정 테스트');
    });

    test.describe('노출 상태', () => {
      test('노출 상태를 "PC만 노출"로 수정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, 노출상태가 "PC만 노출"로 수정된다.', async ({
        page,
      }) => {
        const displayTypeSelect = page.getByRole('radio', { name: 'PC만 노출' });
        await displayTypeSelect.click();

        await submitAndCloseModal(page);

        await expect(displayTypeSelect).toBeChecked();
      });

      test('노출 상태를 "모바일만 노출"로 수정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, 노출상태가 "모바일만 노출"로 수정된다.', async ({
        page,
      }) => {
        const displayTypeSelect = page.getByRole('radio', { name: '모바일만 노출' });
        await displayTypeSelect.click();

        await submitAndCloseModal(page);

        await expect(displayTypeSelect).toBeChecked();
      });
    });

    test.describe('PC 노출 위치', () => {
      test('PC 노출 위치를 "왼쪽"으로 수정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, PC 노출 위치가 "왼쪽"으로 수정된다.', async ({
        page,
      }) => {
        const pcPositionSelect = page.getByRole('radio', { name: '왼쪽' });
        await pcPositionSelect.click();

        await submitAndCloseModal(page);

        await expect(pcPositionSelect).toBeChecked();
      });

      test('PC 노출 위치를 "오른쪽"으로 수정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, PC 노출 위치가 "오른쪽"으로 수정된다.', async ({
        page,
      }) => {
        const pcPositionSelect = page.getByRole('radio', { name: '오른쪽' });
        await pcPositionSelect.click();

        await submitAndCloseModal(page);

        await expect(pcPositionSelect).toBeChecked();
      });

      test('PC 노출 위치를 "직접 입력"으로 선택하고 [x,y] 값을 입력하고 제출 시 "팝업 수정 완료" 모달이 나타나고, PC 노출 위치가 "직접 입력"으로 설정되고 [x, y] 값이 설정된다.', async ({
        page,
      }) => {
        const pcPositionSelect = page.getByRole('radio', { name: 'PC 노출 위치 직접 입력' });
        await pcPositionSelect.click();

        const xCoordinateInput = page.getByPlaceholder('왼쪽에서부터(px)');
        await xCoordinateInput.fill('100');
        const yCoordinateInput = page.getByPlaceholder('위에서부터(px)');
        await yCoordinateInput.fill('200');

        await submitAndCloseModal(page);

        await expect(pcPositionSelect).toBeChecked();
        await expect(xCoordinateInput).toHaveValue('100');
        await expect(yCoordinateInput).toHaveValue('200');
      });
    });

    test.describe('노출 기간', () => {
      test('오늘 이전 날짜를 선택할 수 없도록 disabled 처리 되어 있다.', async ({ page }) => {
        // 현재 달의 15일 계산
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 15);
        // 시계를 특정 날짜로 설정
        await page.clock.install({ time: firstDayOfMonth });
        // 페이지 새로고침 (모킹된 시간으로 다시 로드)
        await page.reload();

        // 날짜 선택 input 클릭
        const datepickerInputContainer = page.getByLabel('날짜 선택');
        await datepickerInputContainer.click();

        // 날짜 선택 모달이 나타날 때까지 대기
        const datepickerDialog = page.getByRole('dialog', { name: 'Choose Date' });
        await expect(datepickerDialog).toBeVisible();

        // 14일은 비활성화
        const disabledDateOption = page.getByRole('option', { name: /14th/ });
        await expect(disabledDateOption).toBeDisabled();

        // 15일은 활성화
        const enabledDateOption = page.getByRole('option', { name: /15th/ });
        await expect(enabledDateOption).toBeEnabled();
      });

      test('노출 기간을 설정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, 노출 기간이 수정된다.', async ({
        page,
      }) => {
        // 현재 달의 1일 계산
        const now = new Date();
        const currentMonth = now.getMonth();
        const firstDayOfMonth = new Date(now.getFullYear(), currentMonth, 1);
        // 시계를 특정 날짜로 설정
        await page.clock.install({ time: firstDayOfMonth });
        // 페이지 새로고침 (모킹된 시간으로 다시 로드)
        await page.reload();

        // 날짜 선택 input 클릭
        const datepickerInputContainer = page.getByLabel('날짜 선택');
        await datepickerInputContainer.click();

        // 날짜 선택 모달이 나타날 때까지 대기
        const datepickerDialog = page.getByRole('dialog', { name: 'Choose Date' });
        await expect(datepickerDialog).toBeVisible();

        // 15일 선택
        const dateOption = page.getByRole('option', { name: /15th/ });
        await dateOption.click();

        // 20일 선택
        const endDateOption = page.getByRole('option', { name: /20th/ });
        await endDateOption.click();

        // 선택 완료
        const selectButton = datepickerDialog.getByRole('button', { name: '선택 완료' });
        await selectButton.click();

        await submitAndCloseModal(page);

        const datepickerInput = page.getByRole('textbox', { name: '날짜 입력' });
        await expect(datepickerInput).toHaveValue(
          `2025-${(currentMonth + 1).toString().padStart(2, '0')}-15 - 2025-${(currentMonth + 1).toString().padStart(2, '0')}-20`
        );
      });
    });

    test.describe('팝업 이미지', () => {
      test('팝업 이미지를 수정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, 팝업 이미지가 수정된다.', async ({
        page,
      }) => {
        await uploadFiles({
          page,
          text: '이미지 첨부',
          files: [
            path.join(
              process.cwd(),
              `${process.env.PROJECT_PATH}/public/assets/images/sample3.png`
            ),
          ],
          isMultiple: false,
        });

        await submitAndCloseModal(page);

        const popupImage = page.getByRole('img', { name: '업로드된 이미지' });
        await expect(popupImage).toHaveAttribute('src', /sample3_[A-Za-z0-9-_]+\.webp/);

        // 팝업 이미지를 s3에서 삭제
        const popupImageSrc = await popupImage.getAttribute('src');
        await removeImage({ page, src: popupImageSrc || '' });
      });

      test('팝업 이미지 링크를 수정하고 제출 시 "팝업 수정 완료" 모달이 나타나고, 팝업 이미지 링크가 수정된다.', async ({
        page,
      }) => {
        const popupLinkInput = page.getByPlaceholder('링크를 입력해 주세요');
        await popupLinkInput.fill('https://google.com');

        await submitAndCloseModal(page);

        await expect(popupLinkInput).toHaveValue('https://google.com');
      });
    });

    test('이미지 너비를 "직접 입력"으로 선택하고 너비를 입력하여 제출 시 "팝업 수정 완료" 모달이 나타나고, 이미지 너비가 수정된다', async ({
      page,
    }) => {
      const imageWidthSelect = page.getByRole('radio', { name: '이미지 너비 직접 입력' });
      await imageWidthSelect.click();

      const imageWidthInput = page.getByPlaceholder('이미지 너비(px)');
      await imageWidthInput.fill('100');

      await submitAndCloseModal(page);

      await expect(imageWidthInput).toHaveValue('100');
    });
  });
});
