'use client';

import * as React from 'react';
import { cn } from '@repo/utils/cn';
import InputGroupAddon from './components/InputGroupAddon';
import InputGroupText from './components/InputGroupText';
import InputGroupInput from './components/InputGroupInput';

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'group/input-group rounded-12 relative flex w-full items-center border border-gray-300 outline-none',
        'h-48 min-w-0 has-[>textarea]:h-auto',
        // Variants based on alignment.
        'has-[>[data-align=inline-start]]:[&>input]:pl-8',
        'has-[>[data-align=inline-end]]:[&>input]:pr-8',
        'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
        'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',
        // Hover state.
        'has-[input:enabled]:hover:border-gray-400',
        // Focus state.
        'has-[[data-slot=input-group-control]:focus-visible]:border-gray-400',
        // Error state.
        'has-[input:enabled[data-slot][aria-invalid=true]]:border-red-500',
        // Disabled state.
        'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-gray-100 has-[input:disabled]:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}

InputGroup.Addon = InputGroupAddon;
InputGroup.Text = InputGroupText;
InputGroup.Input = InputGroupInput;

export default InputGroup;
