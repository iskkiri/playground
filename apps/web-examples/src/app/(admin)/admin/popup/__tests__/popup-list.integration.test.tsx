import TestProviders from '@/__tests__/utils/TestProviders';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import AdminPopupListPage from '../page';
import selectEvent from 'react-select-event';
import popupService from '@/app/(admin)/_features/popup/mocks/services/popup.service';

describe('팝업 목록 페이지', () => {
  const user = userEvent.setup();

  const renderPage = () => {
    render(
      <TestProviders>
        <AdminPopupListPage />
      </TestProviders>
    );
  };

  // 초기 데이터 렌더링 대기
  const waitForDataRows = async () => {
    await waitFor(() => {
      const dataRows = screen.getAllByRole('row').filter((row) => row.closest('tbody'));
      expect(dataRows).toHaveLength(7);
    });
  };

  // 마지막 페이지 버튼 반환
  const getLastPageButton = async () => {
    const pagination = await screen.findByRole('navigation', { name: 'Pagination' });
    const pageButtons = await within(pagination).findAllByRole('button', {
      name: /^Page \d+/,
    });
    return pageButtons[pageButtons.length - 1];
  };

  // 전체 개수와 검색 개수 반환
  const getTotalAndSearchCount = async () => {
    const totalCount = await screen.findByRole('status', { name: '전체 개수' });
    const searchCount = await screen.findByRole('status', { name: '검색 개수' });

    return { totalCount, searchCount };
  };

  it('제목 "팝업 관리"가 렌더링 된다.', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: '팝업 관리' })).toBeInTheDocument();
  });

  describe('테이블', () => {
    beforeEach(() => renderPage());

    it("테이블은 '체크박스', '팝업명', '노출 유형', '시작일', '종료일', '노출 상태', '순서', '작성일자', '관리' 컬럼을 갖는다.", () => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      const tableHeader = screen.getAllByRole('columnheader');
      expect(within(tableHeader[0]).getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '팝업명' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '노출 유형' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '시작일' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '종료일' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '노출 상태' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '순서' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '작성일자' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: '관리' })).toBeInTheDocument();
    });

    it('테이블에 목록이 렌더링 된다.', async () => {
      await waitForDataRows();
    });

    it('테이블 헤더의 체크 박스 클릭 시 모든 행이 토글된다.', async () => {
      await waitForDataRows();

      const checkboxes = screen.getAllByRole('checkbox');
      // 테이블 헤더 체크박스 클릭
      await user.click(checkboxes[0]);

      // 모든 체크박스가 활성화
      await waitFor(() => {
        const updatedCheckboxes = screen.getAllByRole('checkbox', { checked: true });
        expect(updatedCheckboxes).toHaveLength(checkboxes.length);
      });

      // 첫 번째 클릭 후 React가 리렌더링되면서 DOM 요소들이 새로 생성됨. 따라서 새로운 요소를 참조해야 한다.
      // 테이블 헤더 체크박스 클릭
      await user.click(screen.getAllByRole('checkbox')[0]);

      // 모든 체크박스가 비활성화
      await waitFor(() => {
        const updatedCheckboxes = screen.queryAllByRole('checkbox', { checked: true });
        expect(updatedCheckboxes).toHaveLength(0);
      });
    });

    it('테이블 행의 체크박스를 클릭하면 해당 행이 토글된다.', async () => {
      await waitForDataRows();

      // 첫 번째 행의 체크박스 클릭
      await user.click(screen.getAllByRole('checkbox')[1]);

      // 첫 번째 행의 체크박스가 활성화
      await waitFor(() => {
        const updatedCheckboxes = screen.getAllByRole('checkbox');
        expect(updatedCheckboxes[1]).toBeChecked();
      });

      // 첫 번째 행의 체크박스 클릭
      await user.click(screen.getAllByRole('checkbox')[1]);

      // 첫 번째 행의 체크박스가 비활성화
      await waitFor(() => {
        const updatedCheckboxes = screen.getAllByRole('checkbox');
        expect(updatedCheckboxes[1]).not.toBeChecked();
      });
    });

    it('각 행의 관리 버튼은 수정 페이지의 링크이다.', async () => {
      await waitForDataRows();

      const dataRows = screen.getAllByRole('row').filter((row) => row.closest('tbody') !== null);
      expect(dataRows).toHaveLength(7);

      const managementLink = within(dataRows[0]).getByRole('link');
      expect(managementLink).toBeInTheDocument();
      expect(managementLink).toHaveAttribute('href', '/admin/popup/1/edit');
    });
  });

  describe('페이지 사이즈 (전체 데이터 개수 7개이기 때문에 테스트 효용성 없음 / 다른 통합테스트 참고)', () => {
    beforeEach(() => renderPage());

    it('페이지 사이즈를 변경하면 테이블 행의 개수가 변경된다.', async () => {
      const pageSizeSelect = await screen.findByRole('combobox', { name: '페이지 사이즈' });
      expect(pageSizeSelect).toBeInTheDocument();

      // 50개 선택
      await selectEvent.select(pageSizeSelect, '50개');
      await waitFor(() => {
        const dataRows = screen.getAllByRole('row').filter((row) => row.closest('tbody') !== null);
        expect(dataRows).toHaveLength(7);
      });

      // 100개 선택
      await selectEvent.select(pageSizeSelect, '100개');
      await waitFor(() => {
        const dataRows = screen.getAllByRole('row').filter((row) => row.closest('tbody') !== null);
        expect(dataRows).toHaveLength(7);
      });
    });

    it('페이지 사이즈를 변경하면 총 페이지수가 변경된다.', async () => {
      // 10개일 때는 11페이지
      const pageSizeSelect = await screen.findByText('10개');
      expect(pageSizeSelect).toBeInTheDocument();

      const lastPageButton = await getLastPageButton();
      expect(lastPageButton).toHaveTextContent('1');

      // 50개일 때는 3페이지
      await selectEvent.select(pageSizeSelect, '50개');
      await waitFor(async () => {
        const lastPageButton = await getLastPageButton();
        expect(lastPageButton).toHaveTextContent('1');
      });

      // 100개일 때는 2페이지
      await selectEvent.select(pageSizeSelect, '100개');
      await waitFor(async () => {
        const lastPageButton = await getLastPageButton();
        expect(lastPageButton).toHaveTextContent('1');
      });
    });
  });

  it('추가하기 버튼은 팝업 추가 페이지로 이동하는 링크를 가진다.', async () => {
    renderPage();

    const addLink = screen.getByRole('link', { name: '추가하기' });
    expect(addLink).toBeInTheDocument();

    // href 속성 확인
    expect(addLink).toHaveAttribute('href', '/admin/popup/create');
  });

  describe('삭제', () => {
    beforeEach(() => renderPage());

    it('행 선택 전에는 삭제 버튼이 비활성화 되어있어야 한다.', async () => {
      const deleteButton = screen.getByRole('button', { name: '선택 삭제' });
      expect(deleteButton).toBeDisabled();
    });

    it('테이블 행의 체크박스를 선택하면 삭제 버튼이 활성화된다.', async () => {
      await waitForDataRows();

      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);

      const deleteButton = screen.getByRole('button', { name: '선택 삭제' });
      expect(deleteButton).toBeEnabled();
    });

    describe('삭제 모달', () => {
      beforeEach(async () => {
        await waitForDataRows();

        // 첫 번째 행 선택
        const checkboxes = screen.getAllByRole('checkbox');
        await user.click(checkboxes[1]);

        // 삭제 모달 열기
        await user.click(screen.getByRole('button', { name: '선택 삭제' }));
        // 모달 렌더링 대기
        expect(await screen.findByText('선택된 팝업을 삭제하시겠습니까?')).toBeInTheDocument();
      });

      it('"선택된 팝업을 삭제하시겠습니까?", 닫기 버튼, 삭제 버튼이 있는 모달이 표시된다.', async () => {
        expect(screen.getByText('선택된 팝업을 삭제하시겠습니까?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '닫기' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
      });

      it('닫기 버튼을 클릭하면 모달이 닫힌다.', async () => {
        await user.click(screen.getByRole('button', { name: '닫기' }));

        await waitFor(() => {
          expect(screen.queryByText('선택된 팝업을 삭제하시겠습니까?')).not.toBeInTheDocument();
        });
      });

      it('삭제 버튼을 클릭하면 삭제 후 모달이 닫히며, 삭제된 행은 테이블 목록에서 제거된다.', async () => {
        // 삭제 전 데이터 존재 확인
        expect(screen.getByText('너비/높이 1:1인 팝업')).toBeInTheDocument();

        // 삭제 버튼 클릭
        await user.click(screen.getByRole('button', { name: '삭제' }));

        // 모달 닫힘 확인
        await waitFor(() => {
          expect(screen.queryByText('선택된 팝업을 삭제하시겠습니까?')).not.toBeInTheDocument();
        });

        // 삭제된 데이터가 테이블에서 제거되었는지 확인
        await waitFor(() => {
          expect(screen.queryByText('너비/높이 1:1인 팝업')).not.toBeInTheDocument();
        });

        // // 삭제 후 데이터 초기화
        popupService.reset();
      });
    });
  });

  describe('필터', () => {
    beforeEach(async () => {
      renderPage();

      await waitForDataRows();

      // 필터 전
      const { totalCount, searchCount } = await getTotalAndSearchCount();
      expect(totalCount).toHaveTextContent('총 7개');
      expect(searchCount).toHaveTextContent('검색 0개');

      const exposureFilter = screen.getByRole('radio', { name: '숨김' });
      // 노출 상태가 '숨김'값만 조회되도록 필터 적용
      await user.click(exposureFilter);
    });

    it('필터 적용 시 데이터의 총 개수 및 검색된 데이터의 개수가 변경된다.', async () => {
      const { totalCount, searchCount } = await getTotalAndSearchCount();
      expect(totalCount).toHaveTextContent('총 7개');
      expect(searchCount).toHaveTextContent('검색 1개');
    });

    it('필터 적용 시 필터링 된 데이터가 테이블에 표시된다.', async () => {
      expect(await screen.findByText('숨김용 팝업')).toBeInTheDocument();
      expect(screen.queryByText('너비/높이 1:1인 팝업')).not.toBeInTheDocument();
    });

    it('필터 적용 시 총 페이지 수가 변경된다.', async () => {
      const lastPageButton = await getLastPageButton();
      expect(lastPageButton).toHaveTextContent('1');
    });
  });

  describe('검색', () => {
    beforeEach(async () => {
      renderPage();

      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toBeInTheDocument();

      await user.type(searchInput, '1:1');
      await user.keyboard('{Enter}');
    });

    it('검색 시 데이터의 총 개수 및 검색된 데이터의 개수가 변경된다.', async () => {
      const { totalCount, searchCount } = await getTotalAndSearchCount();
      expect(totalCount).toHaveTextContent('총 7개');
      expect(searchCount).toHaveTextContent('검색 4개');
    });

    it('검색 시 필터링 된 데이터가 테이블에 표시된다.', async () => {
      const [popup1, popup2, popup3, popup4] = await Promise.all([
        screen.findByText('너비/높이 1:1인 팝업'),
        screen.findByText('너비/높이 1:1 & 모바일만 노출'),
        screen.findByText('너비/높이 1:1 & PC 만 노출 & 노출 위치 직접 지정'),
        screen.findByText('너비/높이 1:1 & 너비 직접 지정'),
      ]);

      expect(popup1).toBeInTheDocument();
      expect(popup2).toBeInTheDocument();
      expect(popup3).toBeInTheDocument();
      expect(popup4).toBeInTheDocument();
    });

    it('검색 시 총 페이지 수가 변경된다.', async () => {
      const lastPageButton = await getLastPageButton();
      expect(lastPageButton).toHaveTextContent('1');
    });
  });

  it('초기화 버튼 클릭 시 필터 및 검색이 초기화된다. (setup.ts의 useResetSearchFilter 모킹 참고)', async () => {
    render(
      <TestProviders searchParams={{ isShow: 'true', searchType: 'title', keyword: '2' }}>
        <AdminPopupListPage />
      </TestProviders>
    );

    await waitFor(() => {
      const dataRows = screen.getAllByRole('row').filter((row) => row.closest('tbody') !== null);
      expect(dataRows).toHaveLength(2);
    });

    const { totalCount, searchCount } = await getTotalAndSearchCount();
    expect(totalCount).toHaveTextContent('총 7개');
    expect(searchCount).toHaveTextContent('검색 2개');

    const resetButton = screen.getByRole('button', { name: '초기화' });
    await user.click(resetButton);

    const { totalCount: totalCount2, searchCount: searchCount2 } = await getTotalAndSearchCount();
    expect(totalCount2).toHaveTextContent('총 7개');
    expect(searchCount2).toHaveTextContent('검색 0개');
  });
});
