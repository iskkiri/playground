import { useMemo } from 'react';
import { closestCenter, DndContext, DragOverlay, type UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, type SortingStrategy } from '@dnd-kit/sortable';
import Sortable from './Sortable';
import useSortableDrag from '../hooks/useSortableDrag';
import type { Swap } from '../types/dndKit.types';

interface DndSortableContextProps<T extends { id: UniqueIdentifier }> {
  items: T[];
  swap: Swap<T>;
  children: ({ index, isDragging }: { index: number; isDragging: boolean }) => React.ReactNode;
  strategy?: SortingStrategy;
  className?: string;
}

export default function DndSortableContext<T extends { id: UniqueIdentifier }>({
  items,
  swap,
  children,
  strategy,
  className,
}: DndSortableContextProps<T>) {
  const { activeId, onDragStart, onDragEnd } = useSortableDrag({
    items,
    updateItems: (newItems) => {
      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = newItems.findIndex((item) => item.id === activeId);

      if (oldIndex !== newIndex) {
        swap({ newItems, oldIndex, newIndex });
      }
    },
  });
  // 드래그 중인 아이템의 인덱스
  const draggingItemIndex = useMemo(
    () => items.findIndex((item) => item.id === activeId),
    [activeId, items]
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={className}>
        <SortableContext items={items} strategy={strategy}>
          {items.map((item, index) => (
            <Sortable key={item.id} id={item.id}>
              {children({ index, isDragging: false })}
            </Sortable>
          ))}
        </SortableContext>

        {/* 드래그 시 보여주는 컴포넌트 */}
        <DragOverlay>
          {activeId && children({ index: draggingItemIndex, isDragging: true })}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
