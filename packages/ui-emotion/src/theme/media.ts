const customMediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1280),
  BREAK_POINT: '1280px' as const,
};

export default media;
