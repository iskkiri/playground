import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Placement } from '@floating-ui/react';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverContent from './PopoverContent';
import Button from '#src/general/Button/Button';
import Switch from '#src/form/Switch/Switch';

const meta = {
  title: 'Overlay/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: null,
    referenceElement: null,
    visible: false,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const UncontrolledExample: Story = {
  render: function Render() {
    return (
      <Popover offsetOptions={{ mainAxis: 12 }}>
        <PopoverTrigger>
          <Button variant="primary">Click Me</Button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="rounded-8 shadow-xs max-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
            Hello
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const ControlledExample: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Popover
        isInteractionEnabled
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        offsetOptions={{ mainAxis: 12 }}
      >
        <PopoverTrigger>
          <Button variant="primary">Click Me</Button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="rounded-8 shadow-xs max-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
            Hello
            <Button variant="primary" onClick={() => setIsOpen(false)} size={48}>
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const PositionExample: Story = {
  render: function Render() {
    const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);

    // placement
    const [placement, setPlacement] = useState<Placement>('bottom');
    const placement2DList: Placement[][] = [
      ['top', 'top-start', 'top-end'],
      ['right', 'right-start', 'right-end'],
      ['bottom', 'bottom-start', 'bottom-end'],
      ['left', 'left-start', 'left-end'],
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
        <Popover
          isOpen={isAlwaysOpen ? true : undefined}
          placement={placement}
          offsetOptions={{ mainAxis: 12 }}
        >
          <PopoverTrigger style={{ alignSelf: 'center' }}>
            <Button variant="primary">Click Me</Button>
          </PopoverTrigger>

          <PopoverContent>
            <div className="rounded-8 shadow-xs max-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
              Hello
            </div>
          </PopoverContent>
        </Popover>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <b>Always Open: {isAlwaysOpen ? 'ON' : 'OFF'}</b>

          <Switch checked={isAlwaysOpen} onCheckedChange={setIsAlwaysOpen} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <b>Position: {placement}</b>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {placement2DList.map((placementList, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {placementList.map((item, j) => (
                  <Button key={j} onClick={() => setPlacement(item)} variant="linePrimary">
                    {item}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
