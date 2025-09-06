'use client';

import { cn } from '@repo/utils/cn';
import styles from './styles/switch.module.scss';

export default function Switch(props: React.ComponentProps<'input'>) {
  return (
    <label className={styles.label}>
      <input {...props} type="checkbox" />
      <div className={cn(styles.switch, props.checked && styles.active)} />
    </label>
  );
}
