'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import Image from 'next/image';
import profilePic from '@/public/assets/images/profile.jpg';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    setMounted(true);
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const predefinedQuestions = [
    "What did you build?",
    "Are you available for internships?",
    "Tell me about ForgeOS"
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    
    // Add user message to UI
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Map frontend messages format to backend expected history format
      const historyToSend = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          history: historyToSend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4"
              style={{ height: '500px', maxHeight: '80vh' }}
            >
              {/* Header */}
              <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-zinc-700 relative">
                    <Image src={profilePic} alt="Tamajit" className="object-cover" fill sizes="32px" placeholder="blur" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100 text-sm">Talk to Tamajit</h3>
                    <p className="text-xs text-zinc-500">Ask me anything!</p>
                  </div>
                </div>
                <button 
                  onClick={toggleChat}
                  className="p-1 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-zinc-400">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-700 shadow-md relative">
                      <Image src={profilePic} alt="Tamajit" className="object-cover" fill sizes="64px" placeholder="blur" />
                    </div>
                    <p className="text-sm px-4">
                      Hi! I'm an AI version of Tamajit. Ask me about my projects, skills, or what I'm up to.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                      {predefinedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(q)}
                          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1.5 px-3 rounded-full transition-colors border border-zinc-700"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 relative rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${
                          msg.role === 'user' ? 'bg-zinc-800' : 'bg-zinc-900 border border-zinc-700'
                        }`}>
                          {msg.role === 'user' ? <User size={14} /> : <Image src={profilePic} alt="Tamajit" className="object-cover" fill sizes="32px" placeholder="blur" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm ${
                          msg.role === 'user' 
                            ? 'bg-zinc-800 text-zinc-100 rounded-tr-sm' 
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 max-w-[85%]"
                      >
                        <div className="w-8 h-8 relative rounded-full flex-shrink-0 flex items-center justify-center bg-zinc-900 border border-zinc-700 overflow-hidden">
                          <Image src={profilePic} alt="Tamajit" className="object-cover" fill sizes="32px" placeholder="blur" />
                        </div>
                        <div className="p-4 rounded-2xl rounded-tl-sm bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1">
                          <motion.div
                            className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </motion.div>
                    )}
                    {error && (
                      <div className="text-center text-xs text-red-500 bg-red-500/10 py-2 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm rounded-full py-2.5 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 p-1.5 rounded-full bg-blue-600 text-white disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className="w-14 h-14 relative rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-zinc-200 p-0"
        >
          {isOpen ? <X size={24} className="z-10 relative" /> : <div className="absolute inset-0 z-0 pointer-events-none"><Image src={profilePic} alt="Tamajit" className="object-cover" fill sizes="56px" placeholder="blur" /></div>}
        </motion.button>
      </div>
    </>
  );
}
