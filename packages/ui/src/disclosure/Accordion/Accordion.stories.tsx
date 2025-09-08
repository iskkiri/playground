import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';

const meta = {
  title: 'Disclosure/Accordion',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Accordion type="multiple">
        {[...Array(5)].map((_, i) => (
          <Accordion.Item key={i} value={i.toString()}>
            <Accordion.Trigger>Title {i + 1}</Accordion.Trigger>

            <Accordion.Content>
              <div style={{ padding: '16px 24px' }}>Content {i + 1}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};

/**
 * 화살표 아이콘을 클릭했을 때 토글이 됩니다.
 */
export const CollapsibleIcon: Story = {
  render: function Render() {
    return (
      <Accordion type="multiple">
        {[...Array(5)].map((_, index) => (
          <Accordion.Item key={index} value={index.toString()} className="overflow-hidden">
            <Accordion.IconTrigger>Title{index + 1}</Accordion.IconTrigger>

            <Accordion.Content className="bg-neutral-50 data-[state=closed]:animate-[slide-up_300ms_ease-out] data-[state=open]:animate-[slide-down_300ms_ease-out]">
              <div style={{ padding: '16px 24px' }}>Content {index + 1}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};

/**
 * 토글이 되지 않습니다.
 */
export const CollapsibleDisabled: Story = {
  render: function Render() {
    return (
      <Accordion type="multiple" disabled>
        {[...Array(5)].map((_, i) => (
          <Accordion.Item key={i} value={i.toString()}>
            <Accordion.Trigger>Title {i + 1}</Accordion.Trigger>

            <Accordion.Content>
              <div style={{ padding: '16px 24px' }}>Content {i + 1}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};
