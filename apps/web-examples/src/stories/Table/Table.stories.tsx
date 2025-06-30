import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Table } from '@tanstack/react-table';
import AppTable from './Table';
import useBasicUserTable from './hooks/basic/useBasicUserTable';
import Providers from '@/_components/Providers';
import { userHandlers } from '@/_features/user/mocks/handlers/userHandlers';
import useGetUsers from '@/_features/user/hooks/react-query/useGetUsers';
import useColumnPinningTable from './hooks/column-pinning/useColumnPinningTable';
import useResizingTable from './hooks/resizing/useResizingTable';
import usePagination from '@repo/hooks/usePagination';
import Pagination from '@repo/ui-third-party/Pagination/Pagination';
import Select from '@repo/ui-third-party/Select/Select';
import { pageSizeOptions } from '@/_data/pageSizeOptions';
import useRowSelectionChange from './hooks/useRowSelectionChange';
import useManualRowSelectionTable from './hooks/manual-row-selection/useManualRowSelectionTable';
import Button from '@repo/ui-tailwind/Button/Button';
import useUserListExcelDownload from './hooks/excel-download/useUserListExcelDownload';

const meta = {
  title: 'examples/Table',
  component: AppTable,
  tags: ['autodocs'],

  args: {
    table: [] as unknown as Table<unknown>,
  },
  parameters: {
    msw: { handlers: userHandlers },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <Providers>
          <Story />
        </Providers>
      );
    },
  ],
} satisfies Meta<typeof AppTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const { data } = useGetUsers({ page: 1, pageSize: 50 });
    const userList = useMemo(() => data?.data ?? [], [data]);

    // 테이블
    const { table } = useBasicUserTable({ userList });

    return <AppTable {...args} table={table} />;
  },
};

export const ColumnPinningExample: Story = {
  render: function Render(args) {
    const { data } = useGetUsers({ page: 1, pageSize: 50 });
    const userList = useMemo(() => data?.data ?? [], [data]);

    const { table } = useColumnPinningTable({ userList });

    return <AppTable {...args} table={table} />;
  },
};

export const ResizingExample: Story = {
  render: function Render(args) {
    const { data } = useGetUsers({ page: 1, pageSize: 50 });
    const userList = useMemo(() => data?.data ?? [], [data]);

    const { table } = useResizingTable({ userList });

    return <AppTable {...args} table={table} />;
  },
};

export const PaginationExample: Story = {
  render: function Render(args) {
    // 페이지네이션
    const { page, pageSize, onChangePage, onChangePageSize } = usePagination();

    // 유저 목록 조회
    const { data } = useGetUsers({ page, pageSize });
    const userList = useMemo(() => data?.data ?? [], [data]);
    // 테이블
    const { table } = useBasicUserTable({ userList });
    const selectedRowIds = table.getSelectedRowModel().rows.map((row) => row.id);

    return (
      <div className="flex flex-col gap-32">
        <div>
          <span>{selectedRowIds.length}개 선택됨</span>
        </div>

        <AppTable {...args} table={table} />

        <div className="flex items-center justify-end gap-16">
          {data && (
            <Pagination pageCount={data.meta.totalPages} page={page} onPageChange={onChangePage} />
          )}

          <div className="w-160">
            <Select
              options={pageSizeOptions}
              onChange={(option) => option && onChangePageSize(option.value)}
              value={pageSizeOptions.find((option) => option.value === pageSize)}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const ManualSelectionExample: Story = {
  render: function Render(args) {
    // 페이지네이션
    const { page, pageSize, onChangePage, onChangePageSize } = usePagination();

    const { data } = useGetUsers({ page, pageSize });
    const userList = useMemo(() => data?.data ?? [], [data]);

    const { rowSelection, selectedRows, onRowSelectionChange } = useRowSelectionChange();

    // 테이블
    const { table } = useManualRowSelectionTable({
      userList,
      rowSelection,
      // table을 즉시 평가(immediate evaluation)하려고 시도하기 때문에 순환 참조 발생
      // => 테이블을 만들기도 전에 테이블을 사용하려고 시도
      // onRowSelectionChange: onRowSelectionChange(table),

      // 함수가 실제로 호출될 때까지 table의 평가를 지연(lazy evaluation)
      // => 테이블을 만들어 놓고, 나중에 실제로 필요할 때 그 테이블을 사용하는 상황
      onRowSelectionChange: (updater) => onRowSelectionChange({ table, updater }),
    });

    return (
      <div className="flex flex-col gap-32">
        <div>
          <span>{selectedRows.length}개 선택됨</span>
        </div>

        <AppTable {...args} table={table} />

        <div className="flex items-center justify-end gap-16">
          <div className="w-160" />

          {data && (
            <Pagination pageCount={data.meta.totalPages} page={page} onPageChange={onChangePage} />
          )}

          <div className="w-160">
            <Select
              options={pageSizeOptions}
              onChange={(option) => option && onChangePageSize(option.value)}
              value={pageSizeOptions.find((option) => option.value === pageSize)}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const DownloadExcelExample: Story = {
  render: function Render(args) {
    const { data } = useGetUsers({ page: 1, pageSize: 50 });
    const userList = useMemo(() => data?.data ?? [], [data]);

    // 테이블
    const { table } = useBasicUserTable({ userList });
    // 엑셀 다운로드
    const { onDownloadExcel } = useUserListExcelDownload({ table });

    return (
      <div className="flex flex-col gap-32">
        <Button onClick={onDownloadExcel} variant="primary" className="ml-auto w-fit">
          엑셀 다운로드
        </Button>

        <AppTable {...args} table={table} />
      </div>
    );
  },
};

// export const DeleteExample: Story = {
//   render: function Render(args) {
//     // 유저 목록 조회
//     const { data } = useGetUsers({ page: 1, pageSize: 50 });
//     const userList = useMemo(() => data?.data ?? [], [data]);
//     // 유저 삭제
//     const { onDeleteUser } = useDeleteUser();
//     // 테이블
//     const { table } = useDeletableUserTable({ userList, onDeleteUser });
//     const selectedRowIds = table.getSelectedRowModel().rows.map((row) => +row.id);
//     const isSelected = useMemo(() => selectedRowIds.length > 0, [selectedRowIds]);
//     // 유저 다중 삭제
//     const { onDeleteUsers } = useDeleteUsers({ selectedRowIds });

//     return (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
//         <div
//           style={{
//             display: 'flex',
//             height: '32px',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <span>{selectedRowIds.length}개 선택됨</span>

//           {isSelected && (
//             <button
//               onClick={onDeleteUsers}
//               style={{
//                 border: '1px solid #f00',
//                 padding: '8px',
//                 color: 'red',
//                 fontSize: 14,
//               }}
//             >
//               삭제
//             </button>
//           )}
//         </div>

//         <AppTable {...args} table={table} />
//       </div>
//     );
//   },
// };

// /**
//  * 여기서 주목해야할 것은 input이 변경될 때마다
//  * table row가 리렌더링 되면서 input의 포커스가 사라지는 현상이 발생
//  * 이를 해결하기 위해 <input /> 의 이벤트 핸들링을 어떻게 처리하고 있는지가 중요
//  */
// export const MultipleUpdateExample: Story = {
//   render: function Render(args) {
//     // 유저 목록 조회
//     const { data } = useGetUsers({ page: 1, pageSize: 50 });
//     const userList = useMemo(() => data?.data ?? [], [data]);

//     // 편집
//     const { isEditMode, onEditModeOn, control, handleSubmit, onSubmit } = useEditUsers({
//       userList,
//     });

//     // 테이블
//     const { table } = useEitableUserTable({ userList, isEditMode, control });
//     const selectedRowIds = table.getSelectedRowModel().rows.map((row) => +row.id);

//     return (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
//         <div
//           style={{
//             display: 'flex',
//             height: '32px',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <span>{selectedRowIds.length}개 선택됨</span>

//           {isEditMode ? (
//             <button
//               onClick={handleSubmit(onSubmit)}
//               style={{
//                 border: '1px solid #3182ce',
//                 backgroundColor: '#3182ce',
//                 padding: '8px',
//                 color: 'white',
//                 fontSize: '14px',
//               }}
//             >
//               편집완료
//             </button>
//           ) : (
//             <button
//               onClick={onEditModeOn}
//               style={{
//                 border: '1px solid #3182ce',
//                 padding: '8px',
//                 color: '#3182ce',
//                 fontSize: '14px',
//               }}
//             >
//               편집모드
//             </button>
//           )}
//         </div>

//         <AppTable {...args} table={table} />
//       </div>
//     );
//   },
// };

// export const ComprehensiveExample: Story = {
//   render: function Render(args) {
//     // 유저 목록 조회
//     const { data } = useGetUsers({ page: 1, pageSize: 50 });
//     const userList = useMemo(() => data?.data ?? [], [data]);
//     // 유저 삭제
//     const { onDeleteUser } = useDeleteUser();
//     // 편집
//     const { isEditMode, onEditModeOn, control, handleSubmit, onSubmit } = useEditUsers({
//       userList,
//     });

//     // 테이블
//     const { table } = useUserTable({
//       userList,
//       isEditMode,
//       control,
//       onDeleteUser,
//     });
//     const selectedRowIds = table.getSelectedRowModel().rows.map((row) => +row.id);
//     const isSelected = useMemo(() => selectedRowIds.length > 0, [selectedRowIds]);
//     // 유저 다중 삭제
//     const { onDeleteUsers } = useDeleteUsers({ selectedRowIds });

//     return (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
//         <div
//           style={{
//             display: 'flex',
//             height: '32px',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <span>{selectedRowIds.length}개 선택됨</span>

//           <div style={{ display: 'flex', gap: '8px' }}>
//             {isSelected && (
//               <button
//                 onClick={onDeleteUsers}
//                 style={{
//                   border: '1px solid #f00',
//                   padding: '8px',
//                   color: 'red',
//                   fontSize: 14,
//                 }}
//               >
//                 삭제
//               </button>
//             )}

//             {isEditMode ? (
//               <button
//                 onClick={handleSubmit(onSubmit)}
//                 style={{
//                   border: '1px solid #3182ce',
//                   backgroundColor: '#3182ce',
//                   padding: '8px',
//                   color: 'white',
//                   fontSize: '14px',
//                 }}
//               >
//                 편집완료
//               </button>
//             ) : (
//               <button
//                 onClick={onEditModeOn}
//                 style={{
//                   border: '1px solid #3182ce',
//                   padding: '8px',
//                   color: '#3182ce',
//                   fontSize: '14px',
//                 }}
//               >
//                 편집모드
//               </button>
//             )}
//           </div>
//         </div>

//         <AppTable {...args} table={table} />
//       </div>
//     );
//   },
// };

// // tr(table row)에 props를 설정하는 예제
// export const RowPropsExample: Story = {
//   render: function Render(args) {
//     const { data } = useGetUsers({ page: 1, pageSize: 50 });
//     const userList = useMemo(() => data?.data ?? [], [data]);

//     // 테이블
//     const { table } = useRowPropsTable({ userList });

//     return <AppTable {...args} table={table} />;
//   },
// };

// // td(table data cell)에 props를 설정하는 예제
// export const CellPropsExample: Story = {
//   render: function Render(args) {
//     const { data } = useGetUsers({ page: 1, pageSize: 50 });
//     const userList = useMemo(() => data?.data ?? [], [data]);

//     // 테이블
//     const { table } = useCellPropsTable({ userList });

//     return <AppTable {...args} table={table} />;
//   },
// };
