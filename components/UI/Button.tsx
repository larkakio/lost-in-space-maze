'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        variant === 'primary' ? 'btn-primary' : 'btn-secondary',
        'font-display text-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
