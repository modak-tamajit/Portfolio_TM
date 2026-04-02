'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export default function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if the user has dismissed it before or if already installed
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (dismissed || isStandalone) return;

    // Wait 30 seconds before showing the prompt
    const timer = setTimeout(() => {
      // Basic check for mobile user agents
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        setShowPrompt(true);
      }
    }, 30000);

    // Listen to the beforeinstallprompt event for Android
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    setShowPrompt(false);
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-prompt-dismissed', 'true');
      }
      setDeferredPrompt(null);
    } else {
      // For iOS Safari where beforeinstallprompt isn't supported, 
      // they just have to use the Share menu. We can alert them.
      alert('To install on iOS: tap the Share button and select "Add to Home Screen".');
      localStorage.setItem('pwa-prompt-dismissed', 'true');
    }
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 z-50 sm:hidden flex items-center justify-between p-4 bg-surface-2 border border-border shadow-2xl rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-3 flex items-center justify-center shrink-0 border border-border">
              <Download size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-display font-semibold text-primary text-sm">Add to Home Screen</p>
              <p className="font-body text-secondary text-xs mt-0.5">Install the app for a faster, app-like experience.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstall}
              className="text-xs bg-accent text-white font-medium px-3 py-1.5 rounded-lg hover:bg-accent-light transition-colors"
            >
              Get
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-secondary hover:text-primary transition-colors bg-surface-3 rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
