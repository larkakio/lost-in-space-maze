'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
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
      {...(props as HTMLMotionProps<'button'>)}
    >
      {children}
    </motion.button>
  );
}
