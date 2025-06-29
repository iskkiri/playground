'use client';

import React from 'react';
import styles from './styles/button.module.scss';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'lg',
  loading = false,
  fullWidth = false,
  iconOnly = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    iconOnly && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...props} className={buttonClasses} disabled={disabled || loading}>
      {children}
    </button>
  );
}
