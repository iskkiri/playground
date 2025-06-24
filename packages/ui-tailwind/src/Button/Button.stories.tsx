import { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';
import FeatherIcons from '@repo/theme/featherIcons';

const meta = {
  title: 'components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 48,
    children: 'Button',
    onClick: () => alert('Button Clicked!'),
    disabled: false,
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['primary', 'linePrimary', 'gray', 'danger', 'none'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: [32, 40, 48, 56, 64],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const PrimaryButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} variant="primary">
        Primary Button
      </Button>
    );
  },
};

export const LinePrimaryButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} variant="linePrimary">
        Line Primary Button
      </Button>
    );
  },
};

export const GrayButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} variant="gray">
        Gray Button
      </Button>
    );
  },
};

export const DangerButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} variant="danger">
        Danger Button
      </Button>
    );
  },
};

export const CustomButton: Story = {
  render: function Render(props) {
    return (
      <Button {...props} variant="none" className="border border-danger bg-transparent text-danger">
        Custom Button
      </Button>
    );
  },
};

export const ButtonWithLeftIcon: Story = {
  render: function Render(props) {
    return (
      <Button {...props} variant="primary" prefix={<FeatherIcons.ChevronLeft />}>
        Button With Left Icon
      </Button>
    );
  },
};

export const ButtonWithRightIcon: Story = {
  render: function Render(props) {
    return (
      <Button {...props} variant="primary" suffix={<FeatherIcons.ChevronRight />}>
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
        variant="primary"
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
        variant="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        size={32}
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
        variant="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        size={40}
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
        variant="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        size={48}
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
        variant="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        size={56}
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
        variant="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        size={64}
      >
        Button With Both Icons
      </Button>
    );
  },
};

export const ResponsiveExample: Story = {
  render: function Render(props) {
    return (
      <Button
        {...props}
        variant="primary"
        prefix={<FeatherIcons.ChevronLeft />}
        suffix={<FeatherIcons.ChevronRight />}
        className="button-size-48 xl:button-size-64"
      >
        Button With Both Icons
      </Button>
    );
  },
};
