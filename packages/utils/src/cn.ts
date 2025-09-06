import { clsx, type ClassValue } from 'clsx';
import { customTwMerge } from './tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
