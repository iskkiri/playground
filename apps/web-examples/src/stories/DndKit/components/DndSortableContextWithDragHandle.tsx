import { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  type UniqueIdentifier,
  type Modifier,
} from '@dnd-kit/core';
import { SortableContext, type SortingStrategy } from '@dnd-kit/sortable';
import DragHandle from './DragHandle';
import SortableWithDragHanlde from './SortableWithDragHanlde';
import useSortableDrag from '../hooks/useSortableDrag';
import type { Swap } from '../types/dndKit.types';

interface SortableWithDragHandleContextProps<T extends { id: UniqueIdentifier }> {
  items: T[];
  swap: Swap<T>;
  children: ({ index }: { index: number }) => React.ReactNode;
  strategy?: SortingStrategy;
  modifiers?: Modifier[];
}

export default function DndSortableContextWithDragHandle<T extends { id: UniqueIdentifier }>({
  items,
  swap,
  children,
  strategy,
  modifiers,
}: SortableWithDragHandleContextProps<T>) {
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
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      modifiers={modifiers}
    >
      <SortableContext items={items} strategy={strategy}>
        {items.map((item, index) => (
          <SortableWithDragHanlde key={item.id} id={item.id}>
            {children({ index })}
          </SortableWithDragHanlde>
        ))}
      </SortableContext>

      {/* 드래그 시 보여주는 컴포넌트 */}
      <DragOverlay>
        {activeId && (
          <div className="flex gap-16">
            <DragHandle isDragging />

            {children({ index: draggingItemIndex })}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
