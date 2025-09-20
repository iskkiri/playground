'use client';

import { FormProvider } from 'react-hook-form';
import FormField from './components/FormField';
import FormItem from './components/FormItem';
import FormLabel from './components/FormLabel';
import FormControl from './components/FormControl';
import FormDescription from './components/FormDescription';
import FormMessage from './components/FormMessage';

// FormProvider에 서브컴포넌트들을 속성으로 추가하여 Form.Field, Form.Item 등으로 사용할 수 있도록 함
// Object.assign을 사용해 타입 어설션 없이 타입 안전하게 compound component 패턴 구현
const Form = Object.assign(FormProvider, {
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
});

export default Form;
