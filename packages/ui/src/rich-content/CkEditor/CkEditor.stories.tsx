import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CKEditor } from '@ckeditor/ckeditor5-react';
import type { ClassicEditor, Editor, EventInfo } from 'ckeditor5';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { mockFormSchema, type MockFormSchema } from './schemas/mockForm.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CkEditorComponent from './CkEditor';
import { mockEditorData } from '../EditorViewer/data/editor.data';
import Button from '#src/general/Button/Button';
import Form from '#src/form/Form/Form';

const meta = {
  title: 'RichContent/CkEditor',
  component: CkEditorComponent,
  args: {
    editorRef: undefined,
    onChange: () => {},
    data: '',
  },
} satisfies Meta<typeof CkEditorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const editorRef = useRef<CKEditor<ClassicEditor> | null>(null);
    const [value, setValue] = useState('');

    const onChange = useCallback((_event: EventInfo, editor: Editor) => {
      const data = editor.getData();
      setValue(data);
    }, []);

    const onSubmit = useCallback(async () => {
      console.log(value);
    }, [value]);

    return (
      <form onSubmit={onSubmit}>
        <CkEditorComponent
          //
          editorRef={editorRef}
          placeholder="내용을 입력해 주세요"
          onChange={onChange}
          data={value}
          height={800}
        />
        <Button
          variant="primary"
          style={{ display: 'block', width: 100, marginLeft: 'auto', marginTop: 32 }}
        >
          작성
        </Button>
      </form>
    );
  },
};

export const FormExampleWithReactHookForm: Story = {
  render: function Render() {
    const editorRef = useRef<CKEditor<ClassicEditor> | null>(null);
    const form = useForm<MockFormSchema>({
      resolver: zodResolver(mockFormSchema),
      defaultValues: {
        content: '',
      },
    });

    const onSubmit: SubmitHandler<MockFormSchema> = useCallback((values) => {
      console.log(values);
    }, []);

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Field
            control={form.control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <Form.Control>
                <CkEditorComponent
                  editorRef={editorRef}
                  placeholder="내용을 입력해 주세요"
                  onChange={(_event, editor) => {
                    const data = editor.getData();

                    onChange(data);
                  }}
                  data={value}
                  height={800}
                />
              </Form.Control>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            style={{ display: 'block', marginLeft: 'auto', marginTop: 32, width: 100 }}
          >
            작성
          </Button>
        </form>
      </Form>
    );
  },
};

export const FormInitializationExampleWithReactHookForm: Story = {
  render: function Render() {
    const editorRef = useRef<CKEditor<ClassicEditor> | null>(null);
    const form = useForm<MockFormSchema>({
      resolver: zodResolver(mockFormSchema),
      defaultValues: {
        content: '',
      },
    });

    useEffect(() => {
      form.reset({ content: mockEditorData });
    }, [form]);

    const onSubmit: SubmitHandler<MockFormSchema> = useCallback((values) => {
      console.log(values);
    }, []);

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Field
            control={form.control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <Form.Control>
                <CkEditorComponent
                  editorRef={editorRef}
                  placeholder="내용을 입력해 주세요"
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  data={value}
                  height={800}
                />
              </Form.Control>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            style={{ display: 'block', marginLeft: 'auto', marginTop: 32, width: 100 }}
          >
            작성
          </Button>
        </form>
      </Form>
    );
  },
};
