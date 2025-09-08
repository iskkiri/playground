import './styles/accordion.css';

import { Accordion as AccordionPrimitive } from 'radix-ui';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';

export default function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} className={cn('w-600', className)} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item {...props} className={cn('overflow-hidden', className)} />;
}

function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={cn(
          'flex w-full items-center justify-between px-20 py-16',
          'data-[state=open]:[&>svg]:rotate-180',
          'data-[disabled]:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
        <FeatherIcons.ChevronDown className="text-gray-400 transition-transform duration-300 ease-out" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionIconTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex items-center justify-between p-16 pl-20 pr-20">
      {children}

      <AccordionPrimitive.Trigger
        className={cn(
          'flex cursor-pointer items-center justify-center',
          'data-[state=open]:[&>svg]:rotate-180',
          className
        )}
        {...props}
      >
        <FeatherIcons.ChevronDown className="text-gray-400 transition-transform duration-300 ease-out" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      {...props}
      className={cn(
        'bg-neutral-50',
        'data-[state=open]:animate-[slide-down_300ms_ease-out]',
        'data-[state=closed]:animate-[slide-up_300ms_ease-out]',
        className
      )}
      style={
        {
          ...props.style,
          '--slide-down': 'slide-down 300ms ease-out',
          '--slide-up': 'slide-up 300ms ease-out',
        } as React.CSSProperties
      }
    />
  );
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.IconTrigger = AccordionIconTrigger;
Accordion.Content = AccordionContent;
