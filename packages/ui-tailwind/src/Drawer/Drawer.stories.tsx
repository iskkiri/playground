import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../Button/Button';
import Drawer from './Drawer';

const meta = {
  title: 'components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromLeft: Story = {
  render: () => (
    <Drawer direction="left">
      <Drawer.Trigger asChild>
        <Button variant="linePrimary">Open Left Drawer</Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Left Drawer</Drawer.Title>
          <Drawer.Description>This drawer opens from the left side.</Drawer.Description>
        </Drawer.Header>
        <div className="p-16">
          <p className="text-sm text-gray-600">
            This is the content of the left drawer. You can add any content here.
          </p>
        </div>
        <Drawer.Footer>
          <Button>Submit</Button>
          <Drawer.Close asChild>
            <Button variant="linePrimary">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};

export const FromRight: Story = {
  render: () => (
    <Drawer direction="right">
      <Drawer.Trigger asChild>
        <Button variant="linePrimary">Open Right Drawer</Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Right Drawer</Drawer.Title>
          <Drawer.Description>This drawer opens from the right side.</Drawer.Description>
        </Drawer.Header>
        <div className="p-16">
          <p className="text-sm text-gray-600">
            This is the content of the right drawer. You can add any content here.
          </p>
        </div>
        <Drawer.Footer>
          <Button>Submit</Button>
          <Drawer.Close asChild>
            <Button variant="linePrimary">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};

export const FromBottom: Story = {
  render: () => (
    <Drawer direction="bottom">
      <Drawer.Trigger asChild>
        <Button variant="linePrimary">Open Bottom Drawer</Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Bottom Drawer</Drawer.Title>
          <Drawer.Description>This drawer opens from the bottom.</Drawer.Description>
        </Drawer.Header>
        <div className="p-16">
          <p className="text-sm text-gray-600">
            This is the content of the bottom drawer. You can add any content here.
          </p>
        </div>
        <Drawer.Footer>
          <Button>Submit</Button>
          <Drawer.Close asChild>
            <Button variant="linePrimary">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};

export const FromTop: Story = {
  render: () => (
    <Drawer direction="top">
      <Drawer.Trigger asChild>
        <Button variant="linePrimary">Open Top Drawer</Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Top Drawer</Drawer.Title>
          <Drawer.Description>This drawer opens from the top.</Drawer.Description>
        </Drawer.Header>
        <div className="p-16">
          <p className="text-sm text-gray-600">
            This is the content of the top drawer. You can add any content here.
          </p>
        </div>
        <Drawer.Footer>
          <Button>Submit</Button>
          <Drawer.Close asChild>
            <Button variant="linePrimary">Cancel</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};
