'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Music } from 'lucide-react';

export default function Footer() {
  const [spotify, setSpotify] = useState<any>(null);
  const [commit, setCommit] = useState<any>(null);

  useEffect(() => {
    // Fetch Spotify
    fetch('/api/spotify')
      .then(r => r.json())
      .then(data => {
        if (data.title) setSpotify(data);
      })
      .catch(() => {});

    // Fetch GitHub
    fetch('https://api.github.com/users/modak-tamajit/events/public?per_page=10')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const pushes = data.filter((e: any) => e.type === 'PushEvent');
        if (pushes.length > 0 && pushes[0].payload.commits.length > 0) {
          const c = pushes[0].payload.commits[0];
          setCommit({
            message: c.message,
            time: new Date(pushes[0].created_at).toLocaleDateString(),
            id: c.sha.substring(0, 7)
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="w-full border-t border-border bg-surface-2 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: GitHub Activity */}
        <div className="flex items-center gap-3 text-sm font-mono text-secondary w-full md:w-auto">
          <GitCommit size={16} className="text-primary/60 flex-shrink-0" />
          {commit ? (
            <span className="truncate max-w-[250px] sm:max-w-sm">
              Last commit: {commit.message} <span className="opacity-50">· {commit.time}</span>
            </span>
          ) : (
            <span className="animate-pulse">Loading latest commit...</span>
          )}
        </div>

        {/* Right: Spotify Now Playing */}
        <div className="flex items-center gap-3 text-sm font-mono w-full md:w-auto justify-end">
          {spotify ? (
            <a 
              href={spotify.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex flex-col items-end">
                <span className="text-primary/90 truncate max-w-[150px] font-medium text-xs">
                  {spotify.title}
                </span>
                <span className="text-secondary/60 truncate max-w-[150px] text-[10px]">
                  {spotify.artist}
                </span>
              </div>
              {spotify.albumImageUrl ? (
                <img 
                  src={spotify.albumImageUrl} 
                  alt="Album cover" 
                  className="w-8 h-8 rounded-md shadow-md border border-border flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-md bg-surface flex items-center justify-center border border-border">
                  <Music size={14} className="text-tgreen" />
                </div>
              )}
            </a>
          ) : (
            <div className="flex items-center gap-2 text-secondary/60 text-xs">
              <Music size={14} />
              <span>Not playing</span>
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
