'use client';

import styles from './page.module.css';
import Button from '@repo/ui-emotion/components/Button/Button';
import typography from '@repo/ui-emotion/theme/typography';
import FeatherIcons from '@repo/theme/featherIcons';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 css={[typography['H1/56b'], { color: 'red' }]}>제목1</h1>
      <Button buttonType="primary">Click me</Button>
      <FeatherIcons.Home color="white" size={64} />
    </div>
  );
}
