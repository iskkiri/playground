import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import FeatherIcons from '@repo/icons/featherIcons';

interface DragHandleProps {
  setActivatorNodeRef?: (node: HTMLElement | null) => void;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  isDragging?: boolean;
}

export default function DragHandle({
  setActivatorNodeRef,
  attributes,
  listeners,
  isDragging,
}: DragHandleProps) {
  return (
    <button
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FeatherIcons.Menu />
    </button>
  );
}
