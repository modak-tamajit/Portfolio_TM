'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  /* Smooth spring — outer glow lags slightly behind */
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.4 });

  /* Tight spring — inner dot follows cursor closely */
  const dotX = useSpring(mouseX, { stiffness: 400, damping: 22, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 400, damping: 22, mass: 0.2 });

  const activeRef = useRef(false);

  useEffect(() => {
    /* Only show on non-touch devices */
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      if (!activeRef.current) activeRef.current = true;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer glow — lagging */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className="w-[280px] h-[280px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #7c6af7 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      </motion.div>

      {/* Inner dot — tight follow */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-[6px] h-[6px] rounded-full bg-accent/60" />
      </motion.div>
    </>
  );
}
