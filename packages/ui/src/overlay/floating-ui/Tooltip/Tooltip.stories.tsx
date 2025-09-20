import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Placement } from '@floating-ui/react';
import Tooltip from './Tooltip';
import Button from '#src/general/Button/Button';
import Switch from '#src/form/Switch/Switch';

const meta = {
  title: 'Overlay/Floating-UI/Tooltip',
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
      <>
        <Tooltip offsetOptions={{ mainAxis: 12 }}>
          <Tooltip.Trigger>
            <Button variant="primary">Hover Me</Button>
          </Tooltip.Trigger>

          <Tooltip.Content>
            <div className="rounded-8 shadow-xs max-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
              Hello
            </div>
          </Tooltip.Content>
        </Tooltip>
      </>
    );
  },
};

export const ControlledExample: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Tooltip
          isInteractionEnabled
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          offsetOptions={{ mainAxis: 12 }}
        >
          <Tooltip.Trigger>
            <Button variant="primary">Hover Me</Button>
          </Tooltip.Trigger>

          <Tooltip.Content>
            <div className="rounded-8 shadow-xs max-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
              Hello
            </div>
          </Tooltip.Content>
        </Tooltip>
      </>
    );
  },
};

export const WithArrowExample: Story = {
  render: function Render() {
    return (
      <Tooltip isShowArrow offsetOptions={{ mainAxis: 12 }}>
        <Tooltip.Trigger>
          <Button variant="primary">Hover Me</Button>
        </Tooltip.Trigger>

        <Tooltip.Content>
          <div className="rounded-8 shadow-xs max-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
            Hello
          </div>
        </Tooltip.Content>
      </Tooltip>
    );
  },
};

export const PositionExample: Story = {
  render: function Render() {
    const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);
    const [isShowArrow, setIsShowArrow] = useState(false);

    // placement
    const [placement, setPlacement] = useState<Placement>('bottom');
    const placement2DList: Placement[][] = [
      ['top', 'top-start', 'top-end'],
      ['right', 'right-start', 'right-end'],
      ['bottom', 'bottom-start', 'bottom-end'],
      ['left', 'left-start', 'left-end'],
    ];

    return (
      <div className="gap-100 flex flex-col">
        <Tooltip
          isOpen={isAlwaysOpen ? true : undefined}
          placement={placement}
          isShowArrow={isShowArrow}
          offsetOptions={{ mainAxis: 12 }}
        >
          <Tooltip.Trigger style={{ alignSelf: 'center' }}>
            <Button variant="primary">Hover Me</Button>
          </Tooltip.Trigger>

          <Tooltip.Content>
            <div className="rounded-8 shadow-xs max-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
              Hello
            </div>
          </Tooltip.Content>
        </Tooltip>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <b>Always Open: {isAlwaysOpen ? 'ON' : 'OFF'}</b>
            <Switch checked={isAlwaysOpen} onCheckedChange={setIsAlwaysOpen} />
          </div>

          <div className="flex flex-col gap-8">
            <b>Show Arrow: {isShowArrow ? 'ON' : 'OFF'}</b>
            <Switch checked={isShowArrow} onCheckedChange={setIsShowArrow} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <b>Position: {placement}</b>
          <div className="grid grid-cols-4 gap-16">
            {placement2DList.map((placementList, i) => (
              <div key={i} className="flex flex-col gap-12">
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
