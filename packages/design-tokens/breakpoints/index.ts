export const customMediaQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)` as const;

export const breakpoints = {
  sm: `@media (min-width: 640px)`,
  md: `@media (min-width: 768px)`,
  lg: `@media (min-width: 1024px)`,
  xl: `@media (min-width: 1280px)`,
  '2xl': `@media (min-width: 1536px)`,
} as const;
