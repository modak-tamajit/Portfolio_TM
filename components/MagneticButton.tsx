'use client';

import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;          // magnetic pull strength (default 0.35)
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: 'button' | 'a';
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
  as: Tag = 'button',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect  = ref.current.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = e.clientX - cx;
    const dy    = e.clientY - cy;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const props: Record<string, unknown> = {
    className,
    onClick,
  };
  if (Tag === 'a') {
    props.href   = href;
    props.target = target;
    props.rel    = rel;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div style={{ x, y }}>
        <Tag
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement> &
            React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
