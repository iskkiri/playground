import { useCallback, useState } from 'react';
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export interface UseSortableDragParams<T extends { id: UniqueIdentifier }> {
  /** 드래그 할 아이템 목록 */
  items: T[];
  /** 아이템 순서 업데이트 함수 */
  updateItems: (items: T[]) => void;
}

export default function useSortableDrag<T extends { id: UniqueIdentifier }>({
  items,
  updateItems,
}: UseSortableDragParams<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const onDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(e.active.id);
  }, []);

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      if (e.over && e.active.id !== e.over.id) {
        const oldIndex = items.findIndex((item) => item.id === e.active.id);
        const newIndex = items.findIndex((item) => item.id === e.over?.id);

        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        updateItems(reorderedItems);
      }

      setActiveId(null);
    },
    [items, updateItems]
  );

  return { activeId, onDragStart, onDragEnd };
}
