import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';
import DragHandle from '@/stories/DndKit/components/DragHandle';

interface SortableItemProps {
  id: UniqueIdentifier;
  containerId: string;
  children: React.ReactNode;
}

export function AdminSortableItem({ id, containerId, children }: SortableItemProps) {
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
    data: {
      containerId,
    },
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
      <div className="flex items-center gap-16">
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
