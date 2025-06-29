import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { nanoid } from 'nanoid';
import { horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import TextInput from '@repo/ui-tailwind/TextInput/TextInput';
import FeatherIcons from '@repo/icons/featherIcons';
import Button from '@repo/ui-tailwind/Button/Button';
import { cn } from '@repo/utils/cn';
import { cardList, imageCardList } from './data/dndKit.data';
import DndSortableContextWithDragHandle from './components/DndSortableContextWithDragHandle';
import DndSortableContext from './components/DndSortableContext';
import type { SwapItem } from './types/dndKit.types';

const meta = {
  title: 'examples/DragAndDrop',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalList: Story = {
  render: function Render() {
    const [cards, setCards] = useState(cardList);

    const swap = useCallback(({ newItems }: SwapItem<(typeof cards)[number]>) => {
      setCards(newItems);
    }, []);

    return (
      <DndSortableContext
        items={cards}
        swap={swap}
        strategy={horizontalListSortingStrategy}
        className="mx-auto flex w-fit gap-16"
      >
        {({ index, isDragging }) => (
          <div
            className={cn(
              'cursor-grab border border-dashed border-gray-300 bg-white p-16',
              isDragging && 'cursor-grabbing'
            )}
          >
            {cards[index].text}
          </div>
        )}
      </DndSortableContext>
    );
  },
};

export const VerticalList: Story = {
  render: function Render() {
    const [cards, setCards] = useState(cardList);

    const swap = useCallback(({ newItems }: SwapItem<(typeof cards)[number]>) => {
      setCards(newItems);
    }, []);

    return (
      <DndSortableContext
        items={cards}
        swap={swap}
        strategy={verticalListSortingStrategy}
        className="w-400 flex flex-col gap-16"
      >
        {({ index, isDragging }) => (
          <div
            className={cn(
              'cursor-grab border border-dashed border-gray-300 bg-white p-16',
              isDragging && 'cursor-grabbing'
            )}
          >
            {cards[index].text}
          </div>
        )}
      </DndSortableContext>
    );
  },
};

export const GridList: Story = {
  render: function Render() {
    const [imageCards, setImageCards] = useState(imageCardList);

    const swap = useCallback(({ newItems }: SwapItem<(typeof imageCards)[number]>) => {
      setImageCards(newItems);
    }, []);

    return (
      <DndSortableContext
        items={imageCards}
        swap={swap}
        className="max-w-1200 mx-auto grid grid-cols-3 gap-8"
      >
        {({ index, isDragging }) => (
          <div
            className={cn(
              'cursor-grab overflow-hidden border border-solid border-gray-300 bg-white p-16',
              isDragging && 'cursor-grabbing'
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageCards[index].image}
              alt=""
              className="aspect-ratio-351/319 w-full object-cover"
            />
            <b className="block py-8 text-center">{imageCards[index].text}</b>
          </div>
        )}
      </DndSortableContext>
    );
  },
};

export const SortableWithDragHandleListAnswer: Story = {
  render: function Render() {
    const [fields, setFields] = useState([{ id: nanoid(), text: '' }]);

    const swap = useCallback(({ newItems }: SwapItem<(typeof fields)[number]>) => {
      setFields(newItems);
    }, []);

    const onAddAnswer = useCallback(() => {
      setFields([...fields, { id: nanoid(), text: '' }]);
    }, [fields]);

    const onRemoveAnswer = useCallback(
      (id: string) => {
        return () => {
          setFields(fields.filter((field) => field.id !== id));
        };
      },
      [fields]
    );

    return (
      <div className="w-800 flex flex-col gap-16">
        <DndSortableContextWithDragHandle
          items={fields}
          swap={swap}
          strategy={verticalListSortingStrategy}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          {({ index }) => (
            <div className="flex w-full gap-16">
              <TextInput
                placeholder="답변 입력"
                className="w-full"
                onChange={(e) => {
                  setFields(
                    fields.map((field, i) =>
                      i === index ? { ...field, text: e.target.value } : field
                    )
                  );
                }}
                value={fields[index].text}
              />

              {fields.length > 1 && (
                <button onClick={onRemoveAnswer(fields[index].id)}>
                  <FeatherIcons.X color={'var(--color-gray-500)'} />
                </button>
              )}
            </div>
          )}
        </DndSortableContextWithDragHandle>

        <Button variant="linePrimary" onClick={onAddAnswer}>
          답변 추가
        </Button>
      </div>
    );
  },
};
