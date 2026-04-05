'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import ForgeOSEmbed from '@/components/ForgeOSEmbed';

/* ─────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────── */
const PROJECTS = {
  forgeos: {
    title:    'ForgeOS',
    subtitle: 'Terminal OS written from scratch in C11',
    status:   'complete',
    color:    '#00ff88',
    year:     '2024',
    stack:    ['C11', 'x86 Assembly', 'POSIX', 'GCC', 'Make', 'Linux'],
    tagline:  'What does it actually feel like to write an operating system?',
    problem:
      'OS education is mostly theoretical. You read about kernels and memory models without ever touching one. Most developers go their entire careers without writing a single line below the stdlib. I needed to know what it felt like at the metal.',
    built:
      'A ~3,500-line terminal operating system built entirely from scratch in C11. No OS-dev libraries, no shortcuts. Features include a custom memory allocator using a free-list strategy, a round-robin process scheduler with priority queues, a minimal file system, and a fully interactive shell.',
    decisions: [
      { title: 'C11 over C++',          detail: 'Staying close to the metal means understanding every byte. No abstractions without first understanding what they abstract. C11 forced that discipline.' },
      { title: 'Free-list allocator',   detail: 'Chose a free-list over a bump allocator for memory management — supports fragmentation handling and coalescing of adjacent free blocks.' },
      { title: 'Round-robin scheduler', detail: 'Simple, predictable, and inspectable. Priority queues added on top for foreground/background process differentiation.' },
      { title: 'Custom shell',          detail: 'Built the shell last — it became the integration test for everything else. If the shell works, the whole stack works.' },
    ],
    lessons: [
      'Memory bugs are not random. They have exact causes. Debugging them teaches you to reason precisely.',
      'The best way to understand an abstraction is to build it yourself, then throw it away and use the real one.',
      'A 3,500-line project taught me more about systems than 35,000 lines of framework code ever could.',
    ],
    impact:
      'Demonstrated systems-level depth that most developers never touch — built as a first-year BCA student. Became the anchor project on my resumé and the reason recruiters kept reading.',
    github: 'https://github.com/modak-tamajit',
    demo:   null,
    image:  '/assets/projects/forgeos.png',
    architecture: [
      { layer: 'Shell',       desc: 'Interactive command-line interface, input parsing, built-in commands'  },
      { layer: 'Syscall API', desc: 'System call interface between userspace and kernel'                     },
      { layer: 'Scheduler',   desc: 'Round-robin with priority queues, context switching'                   },
      { layer: 'FS',          desc: 'Minimal file system — inodes, directory entries, basic I/O'            },
      { layer: 'Memory',      desc: 'Free-list allocator, coalescing, block metadata headers'               },
      { layer: 'Boot',        desc: 'Bootloader → kernel entry, GDT setup, interrupt table'                 },
    ],
    codeSnippet: `/* Free-list memory allocator — simplified */
typedef struct Block {
    size_t       size;
    int          free;
    struct Block *next;
} Block;

static Block *heap_start = NULL;

void *forge_malloc(size_t size) {
    Block *curr = heap_start;
    while (curr) {
        if (curr->free && curr->size >= size) {
            curr->free = 0;
            return (void *)(curr + 1);
        }
        curr = curr->next;
    }
    /* Request more from kernel via sbrk */
    Block *blk = sbrk(sizeof(Block) + size);
    blk->size  = size;
    blk->free  = 0;
    blk->next  = NULL;
    if (heap_start) { /* append to list */ }
    else heap_start = blk;
    return (void *)(blk + 1);
}`,
  },

  pathpilot: {
    title:    'PathPilot',
    subtitle: 'AI career advisor for underserved students',
    status:   'complete',
    color:    '#7c6af7',
    year:     '2024',
    stack:    ['Python', 'FastAPI', 'React', 'OpenAI API', 'PostgreSQL', 'TypeScript'],
    tagline:  "The information gap in Indian education is real — and it's damaging.",
    problem:
      "Students in tier-2 cities have no access to quality career guidance. They choose branches based on what their cousin did, not what they're suited for. First-generation college students especially have no framework for making these decisions.",
    built:
      "An AI-powered platform built for Smart India Hackathon (SIH25094). Takes a student's academic profile, interests, and constraints, then generates personalised career roadmaps, recommends certifications, and tracks progress over time.",
    decisions: [
      { title: 'FastAPI backend',    detail: 'Async performance, auto-generated OpenAPI docs, and clean type validation via Pydantic. Handles concurrent student sessions without bottlenecks.' },
      { title: 'Modular AI layer',   detail: "The LLM integration is behind a clean interface — the underlying model can be swapped without touching business logic. Started with OpenAI, designed to be model-agnostic." },
      { title: 'PostgreSQL + JSONB', detail: 'Structured profile data in relational tables, flexible roadmap data in JSONB columns. Best of both worlds for a product where schema evolves fast.' },
      { title: 'React frontend',     detail: 'Deliberately simple UI — the target user is a student in a tier-2 city with a mid-range phone. Performance and clarity over visual complexity.' },
    ],
    lessons: [
      "The hardest part of building for underserved users is resisting the urge to make it \"impressive\" instead of usable.",
      'LLM output quality is 80% prompt engineering and 20% model choice.',
      "PostgreSQL's JSONB is surprisingly powerful for rapidly evolving data models.",
    ],
    impact:
      'Finalist-level project addressing real equity problems in Indian education. LLM-guided approach reduced information paralysis for first-gen college students in simulated user testing.',
    github: 'https://github.com/modak-tamajit',
    demo:   null,
    image:  '/assets/projects/pathpilot.png',
    architecture: [
      { layer: 'React UI',   desc: 'Profile intake form, roadmap display, progress tracking'        },
      { layer: 'FastAPI',    desc: 'REST endpoints, session management, request validation'          },
      { layer: 'AI Engine',  desc: 'Prompt construction, OpenAI API calls, response parsing'         },
      { layer: 'PostgreSQL', desc: 'Student profiles (relational) + roadmap data (JSONB)'            },
      { layer: 'Auth',       desc: 'JWT-based authentication, role separation (student / counselor)' },
    ],
    codeSnippet: `# Roadmap generation endpoint
@router.post("/roadmap/generate")
async def generate_roadmap(
    profile: StudentProfile,
    db: AsyncSession = Depends(get_db)
):
    prompt = build_roadmap_prompt(profile)

    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": prompt},
        ],
        response_format={"type": "json_object"},
    )

    roadmap = RoadmapSchema.model_validate_json(
        response.choices[0].message.content
    )
    await save_roadmap(db, profile.student_id, roadmap)
    return roadmap`,
  },

  extracta: {
    title:    'Extracta',
    subtitle: 'Native SwiftUI document intelligence app',
    status:   'in-progress',
    color:    '#f7a06a',
    year:     '2025',
    stack:    ['Swift', 'SwiftUI', 'Vision Framework', 'Core ML', 'iOS', 'macOS'],
    tagline:  "Privacy-first document intelligence. No cloud. No compromise.",
    problem:
      "Extracting structured data from PDFs and scanned images is tedious. Third-party tools are clunky, cloud-dependent, and privacy-unfriendly. Your documents contain sensitive information — they shouldn't leave your device.",
    built:
      "A native SwiftUI app for iOS and macOS using Apple's Vision framework for OCR combined with an on-device LLM pipeline to classify, extract, and export structured data from documents. Designed to feel like a first-party Apple app.",
    decisions: [
      { title: 'Native-first, no cloud',      detail: 'All processing happens on-device. Vision framework for OCR, Core ML for classification. No API calls for sensitive document data.' },
      { title: 'SwiftUI + declarative arch',  detail: "Single codebase for iOS and macOS via Catalyst. SwiftUI's declarative model maps cleanly to the document processing pipeline." },
      { title: 'Vision + Core ML pipeline',   detail: 'Vision handles text detection and recognition. A fine-tuned Core ML model classifies document type and infers field structure. Chained as an async pipeline.' },
      { title: 'Export flexibility',           detail: 'Extracted data exports to JSON, CSV, or structured PDF. The format is chosen based on detected document type.' },
    ],
    lessons: [
      "Apple's Vision framework is genuinely powerful — the hard part is stitching outputs into a coherent data model.",
      "SwiftUI's previews are a superpower for rapid UI iteration without running the full simulator.",
      'On-device ML means thinking carefully about model size vs accuracy tradeoffs.',
    ],
    impact:
      "Currently in active development. Bridges the gap between Apple's powerful ML frameworks and real-world document workflows. Targeting App Store release in 2025.",
    github: 'https://github.com/modak-tamajit',
    demo:   null,
    image:  '/assets/projects/extracta.png',
    architecture: [
      { layer: 'SwiftUI Views',   desc: 'Document picker, extraction preview, export sheet'                },
      { layer: 'ViewModel',       desc: 'ObservableObject pipeline, async state management'                },
      { layer: 'Vision Pipeline', desc: 'VNRecognizeTextRequest → bounding boxes + raw strings'            },
      { layer: 'Core ML Model',   desc: 'Document type classification, field inference'                    },
      { layer: 'Export Engine',   desc: 'JSON / CSV / PDF generation from structured extraction result'    },
    ],
    codeSnippet: `// Vision text extraction pipeline
func extractText(from image: CGImage) async throws -> [RecognizedText] {
    return try await withCheckedThrowingContinuation { cont in
        let request = VNRecognizeTextRequest { req, err in
            if let err { cont.resume(throwing: err); return }
            let results = req.results as? [VNRecognizedTextObservation] ?? []
            let texts   = results.compactMap { obs -> RecognizedText? in
                guard let top = obs.topCandidates(1).first else { return nil }
                return RecognizedText(
                    string:     top.string,
                    confidence: top.confidence,
                    bounds:     obs.boundingBox
                )
            }
            cont.resume(returning: texts)
        }
        request.recognitionLevel       = .accurate
        request.usesLanguageCorrection = true

        let handler = VNImageRequestHandler(cgImage: image)
        try? handler.perform([request])
    }
}`,
  },
} as const;

type Slug = keyof typeof PROJECTS;

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS[params.slug as Slug];
  if (!project) notFound();

  return (
    <div className="min-h-screen px-4 py-20 max-w-4xl mx-auto">

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0   }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-secondary/60
                     hover:text-secondary transition-colors duration-200"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
            className="w-3.5 h-3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L5 8l5 5" />
          </svg>
          all projects
        </Link>
      </motion.div>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}80` }}
          />
          <span className="font-mono text-xs tracking-widest" style={{ color: project.color }}>
            {project.status === 'in-progress' ? 'IN PROGRESS' : 'SHIPPED'} · {project.year}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight
                       text-primary leading-none mb-3">
          {project.title}
        </h1>
        <p className="text-secondary text-lg mb-5">{project.subtitle}</p>
        <p className="font-display text-xl text-primary/70 italic max-w-xl">
          &ldquo;{project.tagline}&rdquo;
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.stack.map((t) => (
            <span key={t}
              className="text-xs px-3 py-1.5 rounded-lg font-mono
                         bg-surface border border-border text-secondary/70">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Problem & Built ── */}
      <div className="grid md:grid-cols-2 gap-8 mb-14">
        <ScrollReveal>
          <Section label="The Problem" icon="⊘" color={project.color} text={project.problem} />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Section label="What I Built" icon="⊕" color={project.color} text={project.built} />
        </ScrollReveal>
      </div>

      {/* ── Architecture ── */}
      <ScrollReveal className="mb-14">
        <h2 className="font-display font-bold text-xl text-primary mb-5">Architecture</h2>
        <div className="space-y-1">
          {project.architecture.map((layer, i) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-start gap-4 p-4 rounded-xl
                         border border-border bg-surface/40
                         hover:bg-surface-2 hover:border-border-bright
                         transition-all duration-200"
            >
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-md flex-shrink-0 mt-0.5"
                style={{ backgroundColor: project.color + '15', color: project.color }}
              >
                {layer.layer}
              </span>
              <span className="text-sm text-primary/60 font-body">{layer.desc}</span>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── WebAssembly Terminal Embed (Specific to ForgeOS) ── */}
      {project.title === 'ForgeOS' && (
        <ScrollReveal className="mb-14">
          <h2 className="font-display font-bold text-xl text-primary mb-5">Live WebAssembly Terminal</h2>
          <p className="text-secondary/70 mb-5 leading-7 text-sm max-w-2xl">
            This is not a mockup. The C11 OS shell has been compiled to WebAssembly via Emscripten to run natively in your browser. Booting the interactive instance now — type <code className="text-primary font-mono bg-surface border border-border px-1.5 py-0.5 rounded">help</code>.
          </p>
          <ForgeOSEmbed />
        </ScrollReveal>
      )}

      {/* ── Technical Decisions ── */}
      <ScrollReveal className="mb-14">
        <h2 className="font-display font-bold text-xl text-primary mb-5">Technical Decisions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {project.decisions.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="p-5 rounded-2xl border border-border bg-surface/50
                         hover:border-border-bright transition-all duration-300"
            >
              <div className="font-display font-semibold text-primary mb-2">{d.title}</div>
              <div className="text-sm text-primary/60 leading-6">{d.detail}</div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── Code Snippet ── */}
      <ScrollReveal className="mb-14">
        <h2 className="font-display font-bold text-xl text-primary mb-5">A slice of the code</h2>
        <div className="rounded-2xl overflow-hidden border border-border">
          <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-secondary/50">{project.title.toLowerCase()}</span>
          </div>
          <pre className="p-5 bg-[#0d1117] text-sm font-mono text-primary/70
                          overflow-x-auto leading-7 whitespace-pre">
            <code>{project.codeSnippet}</code>
          </pre>
        </div>
      </ScrollReveal>

      {/* ── Lessons ── */}
      <ScrollReveal className="mb-14">
        <h2 className="font-display font-bold text-xl text-primary mb-5">What I learned</h2>
        <div className="space-y-3">
          {project.lessons.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-3 items-start"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: project.color }} />
              <p className="text-primary/70 leading-7">{lesson}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── Impact ── */}
      <ScrollReveal className="mb-14">
        <div
          className="p-6 rounded-2xl border"
          style={{ borderColor: project.color + '30', backgroundColor: project.color + '08' }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-3 block"
            style={{ color: project.color }}>
            Impact
          </span>
          <p className="text-primary/80 leading-7">{project.impact}</p>
        </div>
      </ScrollReveal>

      {/* ── CTAs ── */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-4">
          <MagneticButton
            as="a"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
                       border border-border bg-surface text-secondary
                       hover:text-primary hover:border-accent/40
                       font-mono text-sm transition-all duration-200"
          >
            View on GitHub →
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
                       border border-border bg-surface/50 text-secondary
                       hover:text-primary hover:border-border-bright
                       font-mono text-sm transition-all duration-200"
          >
            ← All projects
          </MagneticButton>
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ─── Section block ─── */
function Section({ label, icon, color, text }: {
  label: string; icon: string; color: string; text: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <span className="font-mono text-xs tracking-widest uppercase text-secondary/60">{label}</span>
      </div>
      <p className="text-primary/70 leading-7 text-sm">{text}</p>
    </div>
  );
}
