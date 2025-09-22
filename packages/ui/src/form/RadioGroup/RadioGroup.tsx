'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import RadioGroupItem from './RadioGroupItem';

export default function RadioGroup(props: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" {...props} />;
}

RadioGroup.Item = RadioGroupItem;
