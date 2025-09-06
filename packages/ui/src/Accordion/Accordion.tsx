import './styles/accordion.scss';

import { Accordion as AccordionPrimitive } from 'radix-ui';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';

export default function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} className={cn('accordion', className)} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item {...props} className={cn('accordion_item', className)} />;
}

function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="accordion_header">
      <AccordionPrimitive.Trigger className={cn('accordion_trigger', className)} {...props}>
        {children}
        <FeatherIcons.ChevronDown />
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
    <AccordionPrimitive.Header className="accordion_collapsible_header">
      {children}

      <AccordionPrimitive.Trigger
        className={cn('accordion_collapsible_trigger', className)}
        {...props}
      >
        <FeatherIcons.ChevronDown />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return <AccordionPrimitive.Content {...props} className={cn('accordion_content', className)} />;
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.IconTrigger = AccordionIconTrigger;
Accordion.Content = AccordionContent;
