import { useCallback } from 'react';
import type { Table } from '@tanstack/react-table';
import type { MockUser } from '@/_features/user/api/dtos/getUser.dto';
import { getUserQueryOptions } from '@/_features/user/hooks/react-query/useGetUsers';
import useDownloadExcel from '@/_features/excel/hooks/useDownloadExcel';
import { formatDateISO } from '@repo/utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';

interface UseUserListExcelDownloadParams {
  table: Table<MockUser>;
}

export default function useUserListExcelDownload({ table }: UseUserListExcelDownloadParams) {
  const queryClient = useQueryClient();

  const colHeaders = table
    .getFlatHeaders()
    // display 컬럼은 제외
    .filter((header) => header.column.accessorFn !== undefined)
    .map((header) => ({
      header: String(header.column.columnDef.header),
      key: header.id,
    }));

  const { downloadExcel } = useDownloadExcel();
  const onDownloadExcel = useCallback(async () => {
    // 버튼을 클릭했을 경우에 데이터 조회, 불필요한 쿼리 비용이 발생하지 않도록 staleTime 5분으로 설정하여
    // 5분간은 재요청없이 캐시된 데이터를 사용하도록 함
    const data = await queryClient.ensureQueryData({
      ...getUserQueryOptions({ page: 1, pageSize: 99999 }),
      revalidateIfStale: true,
      staleTime: 60 * 5 * 1000,
    });

    const rows = data.data.map(
      (row) =>
        ({
          name: row.name,
          phone: row.phone,
          email: row.email,
          createdAt: formatDateISO(row.createdAt),
        }) satisfies Omit<MockUser, 'id'>,
      []
    );

    downloadExcel({
      colHeaders,
      rows,
      filename: `회원목록-${formatDateISO(new Date())}`,
    });
  }, [colHeaders, downloadExcel, queryClient]);

  return { onDownloadExcel };
}
