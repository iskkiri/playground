import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Placement } from '@floating-ui/react';
import Tooltip from './Tooltip';
import TooltipTrigger from './TooltipTrigger';
import TooltipContent from './TooltipContent';
import Button from '#src/_internal/Button';
import Switch from '#src/_internal/Switch';
import styles from '#src/_internal/styles/floating-ui-story.module.scss';

const meta = {
  title: 'components/FloatingUI/Tooltip',
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
          <TooltipTrigger>
            <Button variant="primary">Hover Me</Button>
          </TooltipTrigger>

          <TooltipContent>
            <div className={styles['floating-ui-story__box']}>Hello</div>
          </TooltipContent>
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
          <TooltipTrigger>
            <Button variant="primary">Hover Me</Button>
          </TooltipTrigger>

          <TooltipContent>
            <div className={styles['floating-ui-story__box']}>Hello</div>
          </TooltipContent>
        </Tooltip>
      </>
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
        <Tooltip
          isOpen={isAlwaysOpen ? true : undefined}
          placement={placement}
          offsetOptions={{ mainAxis: 12 }}
        >
          <TooltipTrigger style={{ alignSelf: 'center' }}>
            <Button variant="primary">Hover Me</Button>
          </TooltipTrigger>

          <TooltipContent>
            <div className={styles['floating-ui-story__box']}>Hello</div>
          </TooltipContent>
        </Tooltip>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <b>Always Open: {isAlwaysOpen ? 'ON' : 'OFF'}</b>
          <Switch checked={isAlwaysOpen} onChange={(e) => setIsAlwaysOpen(e.target.checked)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <b>Position: {placement}</b>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {placement2DList.map((placementList, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {placementList.map((item, j) => (
                  <Button key={j} onClick={() => setPlacement(item)} variant="ghost">
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
