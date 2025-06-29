import type { UniqueIdentifier } from '@dnd-kit/core';

type Id = { id: UniqueIdentifier };

export type SwapItem<T extends Id> = {
  newItems: T[];
  oldIndex: number;
  newIndex: number;
};

export type Swap<T extends Id> = (item: SwapItem<T>) => void;
