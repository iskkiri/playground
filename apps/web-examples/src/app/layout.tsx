import '../_styles/globals.css';
import type { Metadata } from 'next';
import FontPreloader from '@/_components/FontPreloader';

export const metadata: Metadata = {
  title: 'Web Examples',
  description: 'Web Examples',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <FontPreloader />
      </head>
      <body>{children}</body>
    </html>
  );
}
