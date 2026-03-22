'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

/* ─── SVG Icons ─── */
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1v-10.5z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
  </svg>
);

const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const NAV_ITEMS = [
  { href: '/',         label: 'Home',     Icon: HomeIcon     },
  { href: '/about',    label: 'About',    Icon: AboutIcon    },
  { href: '/projects', label: 'Projects', Icon: ProjectsIcon },
  { href: '/contact',  label: 'Contact',  Icon: ContactIcon  },
];

/* ─── Individual Dock Item ─── */
interface DockItemProps {
  href: string;
  label: string;
  Icon: React.FC;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}

function DockItem({ href, label, Icon, mouseX }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const pathname = usePathname();
  const isActive = href === '/'
    ? pathname === '/'
    : pathname.startsWith(href);

  /* Magnification: compute distance from mouse to icon center */
  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return 9999;
    const { left, width } = el.getBoundingClientRect();
    return val - left - width / 2;
  });

  const sizeSync = useTransform(
    distance,
    [-130, -60, 0, 60, 130],
    [44, 56, 70, 56, 44]
  );
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-end">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={  { opacity: 0, y: 6,  scale: 0.85 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full mb-3.5 px-2.5 py-1 rounded-lg text-xs
                       font-mono text-primary/90 pointer-events-none z-50
                       bg-surface/80 border border-border backdrop-blur-lg
                       shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            {label}
            {/* Tooltip arrow */}
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-[5px]
                             w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px]
                             border-l-transparent border-r-transparent border-t-border" />
          </motion.div>
        )}
      </AnimatePresence>

      <Link href={href} aria-label={`Navigate to ${label}`}>
        <motion.div
          style={{ width: size, height: size }}
          whileTap={{ scale: 0.82 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={[
            'relative flex items-center justify-center rounded-xl cursor-pointer',
            'transition-colors duration-150',
            isActive
              ? 'bg-accent/20 text-accent-light shadow-[0_0_24px_rgba(124,106,247,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]'
              : 'bg-white/[0.05] text-primary/50 hover:bg-white/[0.09] hover:text-primary/80',
          ].join(' ')}
        >
          <Icon />
          {/* Active indicator dot */}
          {isActive && (
            <motion.span
              layoutId="dock-dot"
              className="absolute -bottom-[9px] w-[5px] h-[5px] rounded-full bg-accent"
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
        </motion.div>
      </Link>
    </div>
  );
}

/* ─── Dock Container ─── */
export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ type: 'spring', stiffness: 110, damping: 22, delay: 0.6 }}
      className="fixed bottom-0 left-0 right-0 pb-6 flex justify-center z-50 pointer-events-none"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2.5 px-4 py-3 pointer-events-auto
                   rounded-[22px] select-none
                   bg-white/[0.04] backdrop-blur-3xl
                   border border-white/[0.07]
                   shadow-[0_10px_50px_rgba(0,0,0,0.7),0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        {NAV_ITEMS.map((item) => (
          <DockItem key={item.href} {...item} mouseX={mouseX} />
        ))}
      </motion.div>
    </motion.nav>
  );
}
