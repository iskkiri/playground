import { PropsWithChildren } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableProps {
  id: UniqueIdentifier;
}

export default function Sortable({ id, children }: PropsWithChildren<SortableProps>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
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
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ ...style, flexShrink: 0, opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </div>
  );
}
