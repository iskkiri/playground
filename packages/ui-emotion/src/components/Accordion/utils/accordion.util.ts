export function isActiveTypeGuard(props: unknown): props is { isActive: boolean } {
  return props !== null && typeof props === 'object' && 'isActive' in props;
}
