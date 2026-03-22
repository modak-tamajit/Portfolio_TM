'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const PROJECTS = [
  {
    id:       'forgeos',
    title:    'ForgeOS',
    subtitle: 'Terminal OS written from scratch in C11',
    status:   'complete',
    color:    '#00ff88',
    year:     '2024',
    stack:    ['C11', 'x86 Assembly', 'POSIX', 'GCC', 'Make', 'Linux'],
    problem:
      'OS education is mostly theoretical — you read about kernels and memory models without ever touching one. I wanted to know what it actually feels like to write an operating system.',
    built:
      'A ~3,500-line terminal OS with a custom memory allocator, process scheduler, a minimal file system, and a fully functional interactive shell — entirely from scratch, no OS-dev libraries.',
    decisions:
      'Chose C11 over C++ deliberately: staying close to the metal means understanding every byte. No abstractions without understanding. The scheduler uses a simple round-robin with priority queues. Memory management uses a free-list allocator.',
    impact:
      'Demonstrated systems-level depth that most developers never touch — built as a first-year BCA student. Became the anchor project on my resumé and the reason recruiters kept reading.',
    github: 'https://github.com/modak-tamajit',
    demo:   null,
    image:  '/assets/projects/forgeos.png',
  },
  {
    id:       'pathpilot',
    title:    'PathPilot',
    subtitle: 'AI career advisor for underserved students',
    status:   'complete',
    color:    '#7c6af7',
    year:     '2024',
    stack:    ['Python', 'FastAPI', 'React', 'OpenAI API', 'PostgreSQL', 'TypeScript'],
    problem:
      'Students in tier-2 cities have no access to quality career guidance. They choose branches based on what their cousin did, not what they\'re actually suited for. The information gap is real and damaging.',
    built:
      'An AI-powered platform that takes a student\'s academic profile, interests, and constraints, then generates personalised career roadmaps, recommends certifications, and tracks progress. Built for Smart India Hackathon (SIH25094).',
    decisions:
      'FastAPI for its async performance and clean OpenAPI docs. Kept the AI layer modular — the underlying model can be swapped without touching business logic. Used PostgreSQL for structured profile storage with JSONB for flexible roadmap data.',
    impact:
      'Finalist-level project addressing a real equity problem in Indian education. The LLM-guided approach reduced information paralysis for first-gen college students in simulated user testing.',
    github: 'https://github.com/modak-tamajit',
    demo:   null,
    image:  '/assets/projects/pathpilot.png',
  },
  {
    id:       'extracta',
    title:    'Extracta',
    subtitle: 'Native SwiftUI document intelligence app',
    status:   'in-progress',
    color:    '#f7a06a',
    year:     '2025',
    stack:    ['Swift', 'SwiftUI', 'Vision Framework', 'Core ML', 'iOS', 'macOS'],
    problem:
      'Extracting structured data from PDFs and scanned images is tedious. Third-party tools are clunky, cloud-dependent, and privacy-unfriendly. There should be a beautiful native solution.',
    built:
      'A native SwiftUI app for iOS and macOS that uses Apple\'s Vision framework for OCR, combined with an on-device LLM pipeline to classify, extract, and export structured data from documents. Privacy-first by default.',
    decisions:
      'Native-first for performance and privacy — no cloud processing of sensitive documents unless explicitly opted in. SwiftUI for the declarative UI layer. Vision + Core ML for the heavy lifting. Designed to feel like a first-party Apple app.',
    impact:
      'Currently in active development. Bridges the gap between Apple\'s powerful ML frameworks and real-world document workflows. Targeting App Store release in 2025.',
    github: 'https://github.com/modak-tamajit',
    demo:   null,
    image:  '/assets/projects/extracta.png',
  },
];

type Project = (typeof PROJECTS)[number];

export default function ProjectsPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-4 py-20 max-w-5xl mx-auto">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <span className="font-mono text-xs text-tgreen tracking-widest uppercase">
          02 / Projects
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight
                       text-primary mt-3 leading-none">
          Three things
          <br />
          <span className="gradient-text">I actually built.</span>
        </h1>
        <p className="mt-4 text-secondary font-mono text-sm max-w-lg">
          Not tutorials. Not clones. Real problems, real decisions, real code.
        </p>
      </motion.div>

      {/* Project cards */}
      <div className="space-y-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isExpanded={active === project.id}
            onToggle={() => setActive(active === project.id ? null : project.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-2xl border overflow-hidden cursor-pointer
                   transition-all duration-300
                   bg-surface/60 hover:bg-surface-2"
        style={{ borderColor: isExpanded ? project.color + '40' : '#1e1e2e' }}
        onClick={onToggle}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        {/* Card header */}
        <div className="flex items-start justify-between gap-4 p-6 md:p-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {/* Status indicator */}
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: project.color,
                  boxShadow: `0 0 8px ${project.color}80`,
                }}
              />
              <span className="font-mono text-xs tracking-widest"
                style={{ color: project.color }}>
                {project.status === 'in-progress' ? 'IN PROGRESS' : 'SHIPPED'}
              </span>
              <span className="font-mono text-xs text-secondary ml-auto">{project.year}</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary
                           leading-tight mb-1">
              {project.title}
            </h2>
            <p className="text-secondary text-sm">{project.subtitle}</p>
          </div>

          {/* Expand/collapse arrow */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-secondary mt-1 flex-shrink-0 p-1"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
              className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6l5 5 5-5" />
            </svg>
          </motion.div>
        </div>

        {/* Tech stack preview */}
        <div className="px-6 md:px-8 pb-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t}
              className="text-[11px] px-2.5 py-1 rounded-md font-mono
                         bg-surface-3 border border-border text-secondary/70">
              {t}
            </span>
          ))}
        </div>

        {/* Expanded detail */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mx-6 md:mx-8 mb-8 pt-6 border-t"
                style={{ borderColor: project.color + '25' }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left column */}
                  <div className="space-y-6">
                    <DetailBlock
                      label="The Problem"
                      icon="⊘"
                      text={project.problem}
                      color={project.color}
                    />
                    <DetailBlock
                      label="What I Built"
                      icon="⊕"
                      text={project.built}
                      color={project.color}
                    />
                  </div>
                  {/* Right column */}
                  <div className="space-y-6">
                    <DetailBlock
                      label="Technical Decisions"
                      icon="⊗"
                      text={project.decisions}
                      color={project.color}
                    />
                    <DetailBlock
                      label="Impact"
                      icon="◎"
                      text={project.impact}
                      color={project.color}
                    />
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-8" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                               text-sm font-mono border border-border
                               text-secondary hover:text-primary hover:border-accent/40
                               bg-surface transition-all duration-200"
                  >
                    <GithubIcon /> View on GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                                 text-sm font-mono text-white
                                 transition-all duration-200"
                      style={{ backgroundColor: project.color + 'dd' }}
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function DetailBlock({
  label,
  icon,
  text,
  color,
}: {
  label: string;
  icon: string;
  text: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm" style={{ color }}>{icon}</span>
        <span className="font-mono text-xs tracking-widest uppercase text-secondary/70">
          {label}
        </span>
      </div>
      <p className="text-primary/70 text-sm leading-7">{text}</p>
    </div>
  );
}

const GithubIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
             0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
             -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
             2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
             0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
             .64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82
             2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87
             3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
             .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
