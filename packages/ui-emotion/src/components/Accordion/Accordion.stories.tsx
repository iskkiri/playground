import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';
import { accordionBasicExampleCss } from './AccordionExample.styles';
import type { CollapsibleType } from 'rc-collapse/es/interface';
import { isActiveTypeGuard } from './utils/accordion.util';
import FeatherIcons from '@repo/theme/featherIcons';
import theme from '#src/theme/index';

const meta = {
  title: 'components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    /**
     * collapsible: 'header' | 'icon' | 'disabled'
     * - 'header': 헤더를 클릭했을 때만 토글이 됩니다. (기본값)
     * - 'icon': 화살표 아이콘을 클릭했을 때 토글이 됩니다.
     * - 'disabled': 토글이 되지 않습니다.
     */
    items: [
      {
        key: '1',
        label: <div css={accordionBasicExampleCss.label}>Title1</div>,
        children: <div css={accordionBasicExampleCss.content}>Content1</div>,
      },
      {
        key: '2',
        label: <div css={accordionBasicExampleCss.label}>Title2</div>,
        children: <div css={accordionBasicExampleCss.content}>Content2</div>,
      },
      {
        key: '3',
        label: <div css={accordionBasicExampleCss.label}>Title3</div>,
        children: <div css={accordionBasicExampleCss.content}>Content3</div>,
      },
    ],
  },
  argTypes: {
    collapsible: {
      options: ['header', 'icon', 'disabled'] satisfies CollapsibleType[],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    const [activeKey, setActiveKey] = useState<React.Key[]>([]);

    return (
      <div css={accordionBasicExampleCss.container}>
        <Accordion
          {...props}
          // 토글 시 호출되는 콜백 함수
          onChange={setActiveKey}
          // 활성화된 아이템의 키
          activeKey={activeKey}
          items={props.items}
        />
      </div>
    );
  },
};

export const CustomExpandIcon: Story = {
  render: function Render(props) {
    return (
      <div css={accordionBasicExampleCss.container}>
        <Accordion
          {...props}
          expandIcon={(props) => {
            const isActive = isActiveTypeGuard(props) ? props.isActive : false;
            return (
              <FeatherIcons.ChevronRight
                color={theme.colors.coolGray500}
                css={[
                  accordionBasicExampleCss.customDropdown,
                  isActive && accordionBasicExampleCss.customDropdownActive,
                ]}
              />
            );
          }}
        />
      </div>
    );
  },
};

/**
 * 헤더를 클릭했을 때 토글이 됩니다.
 */
export const CollapsibleHeader: Story = {
  render: function Render(props) {
    const [activeKey, setActiveKey] = useState<React.Key[]>([]);

    return (
      <div css={accordionBasicExampleCss.container}>
        <Accordion
          {...props}
          collapsible="header"
          // 토글 시 호출되는 콜백 함수
          onChange={setActiveKey}
          // 활성화된 아이템의 키
          activeKey={activeKey}
          items={props.items}
        />
      </div>
    );
  },
};

/**
 * 화살표 아이콘을 클릭했을 때 토글이 됩니다.
 */
export const CollapsibleIcon: Story = {
  render: function Render(props) {
    const [activeKey, setActiveKey] = useState<React.Key[]>([]);

    return (
      <div css={accordionBasicExampleCss.container}>
        <Accordion
          {...props}
          collapsible="icon"
          // 토글 시 호출되는 콜백 함수
          onChange={setActiveKey}
          // 활성화된 아이템의 키
          activeKey={activeKey}
          items={props.items}
        />
      </div>
    );
  },
};

/**
 * 토글이 되지 않습니다.
 */
export const CollapsibleDisabled: Story = {
  render: function Render(props) {
    const [activeKey, setActiveKey] = useState<React.Key[]>([]);

    return (
      <div css={accordionBasicExampleCss.container}>
        <Accordion
          {...props}
          collapsible="disabled"
          // 토글 시 호출되는 콜백 함수
          onChange={setActiveKey}
          // 활성화된 아이템의 키
          activeKey={activeKey}
          items={props.items}
        />
      </div>
    );
  },
};
