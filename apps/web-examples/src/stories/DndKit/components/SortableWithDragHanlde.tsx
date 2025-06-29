import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '@dnd-kit/core';
import DragHandle from './DragHandle';

interface SortableListItemProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
}

/**
 * https://docs.dndkit.com/presets/sortable/usesortable#activator
 * setNodeRef가 연결된 노드가 아닌 다른 노드에 listeners를 연결할 수 있습니다.
 */
export default function SortableWithDragHanlde({ id, children }: SortableListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 300, // default: 250
      easing: 'ease', // default: ease
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, opacity: isDragging ? 0.5 : 1 }}>
      <div className="flex gap-16">
        <DragHandle
          setActivatorNodeRef={setActivatorNodeRef}
          attributes={attributes}
          listeners={listeners}
          isDragging={isDragging}
        />

        {children}
      </div>
    </div>
  );
}
