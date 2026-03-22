'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  threshold?: number;
}

const variants = {
  hidden: (direction: Props['direction']) => {
    const offset = 28;
    switch (direction) {
      case 'up':    return { opacity: 0, y:  offset };
      case 'down':  return { opacity: 0, y: -offset };
      case 'left':  return { opacity: 0, x:  offset };
      case 'right': return { opacity: 0, x: -offset };
      case 'none':  return { opacity: 0            };
      default:      return { opacity: 0, y:  offset };
    }
  },
  visible: { opacity: 1, x: 0, y: 0 },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  threshold = 0.15,
}: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
