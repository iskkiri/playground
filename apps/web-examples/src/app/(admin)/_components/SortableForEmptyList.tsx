import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

interface SortableItemProps {
  id: UniqueIdentifier;
  containerId: string;
}

/**
 * @docs https://github.com/clauderic/dnd-kit/issues/708
 * 빈 리스트를 가진 컨테이너로 드래그 앤 드롭이 불가능한 이슈를 해결하기 위한 컴포넌트
 */
export default function SortableForEmptyList({
  id,
  containerId,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id,
    data: {
      containerId,
    },
    transition: {
      duration: 300, // default: 250
      easing: 'ease', // default: ease
    },
  });

  return <div ref={setNodeRef} {...attributes} {...listeners} />;
}
