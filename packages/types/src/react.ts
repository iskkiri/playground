import { ElementType } from 'react';

export type AsProp<T extends ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
};