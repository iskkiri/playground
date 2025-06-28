'use client';

import styles from './page.module.css';
import Button from '@repo/ui-emotion/Button/Button';
import FeatherIcons from '@repo/icons/featherIcons';

export default function Home() {
  return (
    <div className={styles.page}>
      <Button buttonType="primary">Click me</Button>
      <FeatherIcons.Home color="white" size={64} />
    </div>
  );
}
