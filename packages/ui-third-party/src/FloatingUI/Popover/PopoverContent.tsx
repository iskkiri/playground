import usePopoverContext from './hooks/usePopoverContext';
import { FloatingFocusManager, FloatingPortal, useMergeRefs } from '@floating-ui/react';

export default function PopoverContent({ style, ...props }: React.HTMLProps<HTMLDivElement>) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, props.ref]);

  if (!context.isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext}>
        <div
          ref={ref}
          style={{ ...context.floatingStyles, ...style }}
          {...context.getFloatingProps(props)}
        >
          {props.children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}
