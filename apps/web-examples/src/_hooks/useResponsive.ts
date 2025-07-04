import { useMediaQuery } from 'react-responsive';

export default function useResponsive() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return { isMobile, isTablet, isDesktop };
}
