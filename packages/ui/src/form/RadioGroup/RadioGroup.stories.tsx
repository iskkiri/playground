import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioGroup from './RadioGroup';
import Label from '../Label/Label';
import { useForm } from 'react-hook-form';
import Form from '../Form/Form';

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // checked: {
    //   description: '체크 여부',
    // },
    // name: {
    //   description: '이름',
    // },
    // value: {
    //   description: '값',
    // },
  },
  args: {
    // children: 'RadioGroup',
    // checked: false,
    // name: 'name',
    // value: 'value',
    // disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const [value, setValue] = useState('option1');

    const onChange = useCallback((value: string) => setValue(value), []);

    return (
      <RadioGroup value={value} onValueChange={onChange} className="flex gap-16">
        <Label className="flex cursor-pointer items-center gap-6">
          <RadioGroup.Item value="option1" />
          <span>옵션1</span>
        </Label>

        <Label className="flex cursor-pointer items-center gap-6">
          <RadioGroup.Item value="option2" />
          <span>옵션2</span>
        </Label>

        <Label className="flex cursor-pointer items-center gap-6">
          <RadioGroup.Item value="option3" />
          <span>옵션3</span>
        </Label>
      </RadioGroup>
    );
  },
};

export const FormExample: Story = {
  render: function Render() {
    const form = useForm<{
      option: string;
    }>({
      defaultValues: {
        option: 'option1',
      },
    });

    return (
      <Form {...form}>
        <form>
          <Form.Field
            control={form.control}
            name="option"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-16"
                  >
                    <Form.Item className="flex items-center gap-6">
                      <Form.Control>
                        <RadioGroup.Item value="option1" />
                      </Form.Control>

                      <Form.Label className="text-16 cursor-pointer">옵션1</Form.Label>
                    </Form.Item>

                    <Form.Item className="flex items-center gap-6">
                      <Form.Control>
                        <RadioGroup.Item value="option2" />
                      </Form.Control>

                      <Form.Label className="text-16 cursor-pointer">옵션2</Form.Label>
                    </Form.Item>

                    <Form.Item className="flex items-center gap-6">
                      <Form.Control>
                        <RadioGroup.Item value="option3" />
                      </Form.Control>

                      <Form.Label className="text-16 cursor-pointer">옵션3</Form.Label>
                    </Form.Item>
                  </RadioGroup>
                </Form.Control>
              </Form.Item>
            )}
          />
        </form>
      </Form>
    );
  },
};
