'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const TOOLS = [
  'GitHub', 'Linux', 'Python', 'C / C++', 'Git',
  'VS Code', 'PostgreSQL', 'Notion', 'Swift', 'TypeScript',
  'Next.js', 'Xcode', 'Make', 'Shell', 'Tailwind CSS',
];

/* Duplicate for seamless loop */
const TRACK = [...TOOLS, ...TOOLS, ...TOOLS];

export default function ToolsStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Edge fade masks */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-24 z-10
                   bg-gradient-to-r from-bg to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-24 z-10
                   bg-gradient-to-l from-bg to-transparent pointer-events-none"
      />

      <div
        ref={containerRef}
        className="flex items-center overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)' }}
      >
        <div
          className="flex items-center gap-0 animate-scroll-x"
          style={{ willChange: 'transform' }}
          aria-label="Tools I work with"
        >
          {TRACK.map((tool, i) => (
            <ToolItem key={`${tool}-${i}`} name={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolItem({ name }: { name: string }) {
  return (
    <span
      className="group flex items-center gap-5 px-5 py-1.5 shrink-0 cursor-default"
    >
      {/* Dot separator */}
      <span
        aria-hidden
        className="w-1 h-1 rounded-full bg-border group-hover:bg-accent
                   transition-colors duration-300"
      />

      <span
        className="font-mono text-xs tracking-widest uppercase
                   text-secondary/50 hover:text-secondary/90
                   transition-colors duration-300 select-none"
      >
        {name}
      </span>
    </span>
  );
}
