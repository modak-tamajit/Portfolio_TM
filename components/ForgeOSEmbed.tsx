'use client';

import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

declare global {
  interface Window {
    Module: any;
  }
}

export default function ForgeOSEmbed() {
  const [output, setOutput] = useState<string[]>([
    'Initializing ForgeOS WebAssembly core...',
    'Loading memory layout...',
    'Booting kernel v1.0.0...',
    'Welcome to ForgeOS. Type "help" for a list of commands.'
  ]);
  const [input, setInput] = useState('');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom every time output changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Setup the Emscripten Module integration
    window.Module = {
      print: (text: string) => {
        setOutput((prev) => [...prev, text]);
      },
      printErr: (text: string) => {
        setOutput((prev) => [...prev, `[ERR] ${text}`]);
      },
      onRuntimeInitialized: () => {
        setReady(true);
        setOutput((prev) => [...prev, 'System ready. Interactive shell mounted.']);
      },
    };

    return () => {
      // Clean up module references if unmounted
      delete window.Module;
    };
  }, []);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Echo the command to the terminal visually
    setOutput((prev) => [...prev, `root@forgeos:~# ${input}`]);

    // Check if the C shell exposes an input execution function
    // For standard WASM integrations, you often cwrap a function:
    // e.g. window.Module.ccall('process_input', 'void', ['string'], [input])
    if (ready && window.Module && typeof window.Module.ccall === 'function') {
      try {
        window.Module.ccall('execute_command', 'void', ['string'], [input]);
      } catch (err: any) {
        setOutput((prev) => [...prev, `Kernel panic: Command execution failed - ${err.message}`]);
      }
    } else {
      // Fallback response if the WASM bridge isn't completely hooked up
      if (!ready) {
        setOutput((prev) => [...prev, 'sh: module not yet initialized. Please wait.']);
      } else {
        // We simulate a basic CLI to act as a placeholder if WASM is still compiling
        if (input === 'help') {
          setOutput((prev) => [...prev, 'ForgeOS shell (WASM placeholder) - available builtins: help, version, clear, date']);
        } else if (input === 'version') {
          setOutput((prev) => [...prev, 'ForgeOS v1.0.0 (x86_64 -> WebAssembly cross-compiled)']);
        } else if (input === 'clear') {
          setOutput([]);
        } else if (input === 'date') {
          setOutput((prev) => [...prev, new Date().toString()]);
        } else {
          setOutput((prev) => [...prev, `sh: command not found: ${input}`]);
        }
      }
    }
    
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full rounded-2xl overflow-hidden mt-16 mb-16 shadow-2xl"
      style={{
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.15), 0 20px 40px rgba(0, 0, 0, 0.6)'
      }}
    >
      <Script 
        src="/forgeos/forgeos.js" 
        strategy="lazyOnload"
        onError={() => {
          console.warn("ForgeOS WASM module failed to load. Will use simulation mode.");
          setError(true);
        }}
        onLoad={() => {
          // Additional success logic if needed
        }}
      />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-[#333]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
          <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          root@forgeos ~ (tty1)
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex h-2 w-2 rounded-full ${ready ? 'bg-green-500' : 'bg-green-500 animate-pulse'}`}></span>
          <span className="text-[10px] text-green-500/80 font-mono tracking-widest uppercase">
            {ready ? 'ONLINE' : 'BOOTING'}
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="bg-[#0c0c0c] w-full h-[450px] p-5 font-mono text-sm overflow-hidden flex flex-col relative"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)', backgroundSize: '100% 2px' }}
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[url('/noise.png')]" />
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-hide text-[#a9b1d6] leading-relaxed relative z-10"
        >
          <AnimatePresence initial={false}>
            {output.map((line, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`break-all ${line.startsWith('[ERR]') ? 'text-[#f7768e]' : line.startsWith('root@') ? 'text-[#7aa2f7]' : 'text-[#c0caf5]'}`}
              >
                {line.startsWith('root@') ? (
                  <span className="flex gap-2">
                    <span className="text-[#9ece6a]">root@forgeos</span>
                    <span className="text-[#bb9af7]">~#</span>
                    <span>{line.replace('root@forgeos:~# ', '')}</span>
                  </span>
                ) : line}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <form onSubmit={handleCommand} className="mt-2 flex items-center group">
             <span className="text-[#9ece6a] mr-2">root@forgeos</span>
             <span className="text-[#bb9af7] mr-2">~#</span>
             <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#c0caf5] caret-[#7aa2f7] placeholder-[#333]"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
      </div>
      
      {/* Fallback Banner if WASM isn't available yet */}
      {error && !ready && (
        <div className="absolute inset-x-0 bottom-0 bg-[#f7768e]/10 border-t border-[#f7768e]/30 px-6 py-4 backdrop-blur-md">
          <p className="text-[#f7768e] text-xs font-mono flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            WASM artifact (`/forgeos/forgeos.js`) not found. Simulating fallback OS shell. Run Emscripten build to enable full features.
          </p>
        </div>
      )}
    </motion.div>
  );
}
