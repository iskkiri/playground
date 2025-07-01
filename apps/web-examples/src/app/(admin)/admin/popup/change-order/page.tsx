'use client';

import { useMemo, useCallback } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import GoBack from '@/_components/GoBack';
import { AdminSortableItem } from '../../../_components/AdminSortableItem';
import useGoBack from '@/_hooks/useGoBack';
import Pagination from '@repo/ui-third-party/Pagination/Pagination';
import usePagination from '@repo/hooks/usePagination';
import {
  useGetPopupList,
  useUpdatePopupOrder,
} from '@/app/(admin)/_features/popup/hooks/react-query/useAdminPopup';
import { useAlertModal } from '@/_hooks/useDialogModals';
import { useExposureAndOrderDragAndDrop } from '@/app/(admin)/_features/banner/hooks/useExposureAndOrderDragAndDrop';
import Button from '@repo/ui-tailwind/Button/Button';
import DragHandle from '@/stories/DndKit/components/DragHandle';

export default function AdminBannerChangeOrderPage() {
  const { onGoBack } = useGoBack();
  // 페이지네이션
  const { page, onChangePage } = usePagination();

  const { openAlertModal, closeAlertModal } = useAlertModal();

  // 미노출 팝업 목록 조회
  const { data: hiddenPopupListResponse } = useGetPopupList({
    page,
    pageSize: 20,
    isShow: false,
  });
  const hiddenPopupList = useMemo(
    () => hiddenPopupListResponse?.content ?? [],
    [hiddenPopupListResponse]
  );

  // 노출 팝업 목록 조회
  const { data: visiblePopupListResponse } = useGetPopupList({
    page: 1,
    pageSize: 10,
    isShow: true,
  });
  const visiblePopupList = useMemo(
    () => visiblePopupListResponse?.content ?? [],
    [visiblePopupListResponse]
  );

  const { hiddenItems, visibleItems, activeId, activeItem, onDragStart, onDragOver, onDragEnd } =
    useExposureAndOrderDragAndDrop({
      hiddenItemList: hiddenPopupList,
      visibleItemList: visiblePopupList,
      onMaxVisibleItemsExceeded: () => {
        openAlertModal({
          title: '안내',
          content: '노출 배너는 최대 10개까지만 설정할 수 있습니다.',
          onClose: closeAlertModal,
        });
      },
      maxVisibleItems: 10,
    });

  // 팝업 노출 설정 및 순서 변경
  const { mutate: updatePopupOrder, isPending: isUpdatePopupOrderPending } = useUpdatePopupOrder();
  const onUpdatePopupOrder = useCallback(() => {
    updatePopupOrder(visibleItems.map((popup) => popup.id));
  }, [updatePopupOrder, visibleItems]);

  return (
    <div className="flex flex-col gap-32 px-20 py-40">
      <div className="flex items-center gap-8">
        <GoBack />
        <h1 className="typography-h4-36b">팝업 노출 및 순서 변경</h1>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-2 gap-32">
          {/* 미노출 */}
          <div className="flex flex-col gap-16">
            <h2 className="typography-h7-24b text-center">미노출 팝업</h2>
            <SortableContext id="hidden" items={hiddenItems} strategy={verticalListSortingStrategy}>
              <ul
                className="rounded-8 h-360 flex flex-col gap-8 overflow-y-auto border border-gray-100 p-16"
                data-droppable-id="hidden"
              >
                {hiddenItems.map((popup) => (
                  <AdminSortableItem key={popup.id} id={popup.id} containerId="hidden">
                    {popup.title}
                  </AdminSortableItem>
                ))}
              </ul>
            </SortableContext>
            {/* 페이지네이션 */}
            {hiddenPopupListResponse?.totalPages && (
              <Pagination
                page={page}
                pageCount={hiddenPopupListResponse.totalPages}
                onPageChange={onChangePage}
                className="mx-auto"
              />
            )}
          </div>

          {/* 노출 */}
          <div className="flex flex-col gap-16">
            <h2 className="typography-h7-24b text-center">노출 팝업</h2>
            <SortableContext
              id="visible"
              items={visibleItems}
              strategy={verticalListSortingStrategy}
            >
              <ul
                className="rounded-8 h-360 overflow-y-auto border border-gray-100 p-16"
                data-droppable-id="visible"
              >
                {visibleItems.map((popup) => (
                  <AdminSortableItem key={popup.id} id={popup.id} containerId="visible">
                    {popup.title}
                  </AdminSortableItem>
                ))}
              </ul>
            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="flex items-center gap-16">
              <DragHandle isDragging />
              {activeItem?.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="grid grid-cols-[120px_120px] gap-16">
        <Button onClick={onGoBack} type="button" variant="gray">
          취소
        </Button>
        <Button onClick={onUpdatePopupOrder} disabled={isUpdatePopupOrderPending} variant="primary">
          저장하기
        </Button>
      </div>
    </div>
  );
}
