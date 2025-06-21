import { Meta, StoryObj } from '@storybook/react-vite';
import { css } from '@emotion/react';
import Button from './Button';
import FeatherIcons from '@repo/theme/featherIcons';
import { buttonSize } from './Button.styles';

const meta = {
  title: 'components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    buttonType: 'primary',
    children: 'Button',
    onClick: () => alert('Button Clicked!'),
  },
  argTypes: {
    buttonType: { control: { type: 'select' } },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const PrimaryButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} buttonType="primary">
        Primary Button
      </Button>
    );
  },
};

export const LinePrimaryButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} buttonType="linePrimary">
        Line Primary Button
      </Button>
    );
  },
};

export const GrayButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} buttonType="gray">
        Gray Button
      </Button>
    );
  },
};

export const DangerButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} buttonType="danger">
        Danger Button
      </Button>
    );
  },
};

export const CustomButton: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="none"
        cssStyle={css`
          border: 1px solid #ff6967;
          color: #ff6967;
          background-color: transparent;
        `}
      >
        Custom Button
      </Button>
    );
  },
};

export const ButtonWithLeftIcon: Story = {
  render: function Render(props) {
    return (
      <Button {...props} buttonType="primary" prefix={<FeatherIcons.ChevronLeft />}>
        Button With Left Icon
      </Button>
    );
  },
};

export const ButtonWithRightIcon: Story = {
  render: function Render(props) {
    return (
      <Button {...props} buttonType="primary" suffix={<FeatherIcons.ChevronRight />}>
        Button With Right Icon
      </Button>
    );
  },
};

export const ButtonWithBothIcons: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
      >
        Button With Both Icons
      </Button>
    );
  },
};

export const ButtonWithSize32: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        cssStyle={buttonSize[32]}
      >
        Button With Both Icons
      </Button>
    );
  },
};

export const ButtonWithSize40: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        cssStyle={buttonSize[40]}
      >
        Button With Both Icons
      </Button>
    );
  },
};

export const ButtonWithSize48: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        cssStyle={buttonSize[48]}
      >
        Button With Both Icons
      </Button>
    );
  },
};

export const ButtonWithSize56: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        cssStyle={buttonSize[56]}
      >
        Button With Both Icons
      </Button>
    );
  },
};

export const ButtonWithSize64: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        cssStyle={buttonSize[64]}
      >
        Button With Both Icons
      </Button>
    );
  },
};

const responsiveStyle = css`
  ${buttonSize[48]}

  @media (min-width: 1280px) {
    ${buttonSize[64]}
  }
`;

export const ResponsiveExample: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        buttonType="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        cssStyle={responsiveStyle}
      >
        Button With Both Icons
      </Button>
    );
  },
};
