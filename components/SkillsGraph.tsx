'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

const SKILLS_DATA = {
  nodes: [
    { id: 'Me', group: 0, val: 20 },
    // Core
    { id: 'C', group: 1, val: 12 },
    { id: 'Swift', group: 1, val: 12 },
    { id: 'Python', group: 1, val: 10 },
    { id: 'TypeScript', group: 1, val: 10 },
    // Systems
    { id: 'OS Dev', group: 2, val: 8 },
    { id: 'Memory Mgmt', group: 2, val: 6 },
    { id: 'Make', group: 2, val: 5 },
    { id: 'Linux', group: 2, val: 8 },
    // Frontend
    { id: 'React', group: 3, val: 10 },
    { id: 'Next.js', group: 3, val: 12 },
    { id: 'Tailwind', group: 3, val: 8 },
    { id: 'Framer Motion', group: 3, val: 7 },
    // Backend/Data
    { id: 'Node.js', group: 4, val: 8 },
    { id: 'PostgreSQL', group: 4, val: 7 },
    { id: 'Redis', group: 4, val: 6 },
    // Apple Ecosystem
    { id: 'SwiftUI', group: 5, val: 10 },
    { id: 'Vision', group: 5, val: 8 },
    { id: 'Core ML', group: 5, val: 8 },
  ],
  links: [
    // Connect core to Me
    { source: 'Me', target: 'C' },
    { source: 'Me', target: 'Swift' },
    { source: 'Me', target: 'Python' },
    { source: 'Me', target: 'TypeScript' },
    
    // Systems -> C
    { source: 'C', target: 'OS Dev' },
    { source: 'C', target: 'Memory Mgmt' },
    { source: 'C', target: 'Make' },
    { source: 'OS Dev', target: 'Linux' },

    // Frontend -> TypeScript
    { source: 'TypeScript', target: 'React' },
    { source: 'React', target: 'Next.js' },
    { source: 'React', target: 'Framer Motion' },
    { source: 'React', target: 'Tailwind' },

    // Apple Ecosystem -> Swift
    { source: 'Swift', target: 'SwiftUI' },
    { source: 'Swift', target: 'Vision' },
    { source: 'Swift', target: 'Core ML' },

    // Backend/Data -> Python / TS
    { source: 'Python', target: 'PostgreSQL' },
    { source: 'TypeScript', target: 'Node.js' },
    { source: 'Node.js', target: 'Redis' },
  ]
};

const COLORS = ['#7c6af7', '#00ff88', '#f7a06a', '#a899ff', '#e4e4f0', '#5a5a7a'];

export default function SkillsGraph() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: 400
        });
      }
    };
    
    handleResize(); // initial set
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] bg-surface-2/50 border border-border rounded-2xl overflow-hidden shadow-inner cursor-grab active:cursor-grabbing"
    >
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={SKILLS_DATA}
        nodeLabel="id"
        nodeColor={(node: any) => COLORS[node.group % COLORS.length]}
        nodeRelSize={6}
        linkColor={() => 'rgba(90, 90, 122, 0.2)'}
        linkWidth={1.5}
        d3VelocityDecay={0.3}
        cooldownTicks={100}
        onEngineStop={() => {
          // Can attach interactions to zoom/fit but stopping keeps it stable
        }}
      />
    </div>
  );
}
