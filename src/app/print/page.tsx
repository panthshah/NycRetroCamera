'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import NewspaperTemplate from '@/components/NewspaperTemplate';
import ExportButton from '@/components/ExportButton';

export default function PrintPage() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const newspaperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // Get photo from sessionStorage
    const storedPhoto = sessionStorage.getItem('capturedPhoto');
    
    if (storedPhoto) {
      setPhotoUrl(storedPhoto);
    } else {
      // No photo, redirect back to home
      router.push('/');
    }
  }, [router]);

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F5F0E6] border-t-transparent"></div>
      </div>
    );
  }

  const handleNewPhoto = () => {
    sessionStorage.removeItem('capturedPhoto');
    sessionStorage.removeItem('photoDate');
    router.push('/');
  };

  if (!photoUrl) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F5F0E6] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#2C2820] flex flex-col">
      {/* Header Bar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1612] px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#3d3530] relative z-50"
      >
        <div className="text-center sm:text-left">
          <h1 
            className="text-xl sm:text-2xl text-[#F5F0E6]"
            style={{ fontFamily: 'Chomsky, serif' }}
          >
            New York Street Press
          </h1>
          <p className="text-[#8B7355] text-xs">Your vintage print is ready!</p>
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleNewPhoto}
            className="px-3 sm:px-5 py-2 bg-transparent border border-[#8B7355] text-[#F5F0E6] rounded-full text-xs sm:text-sm hover:bg-[#8B7355]/20 transition-all"
          >
            ← Take Another
          </button>
          <ExportButton targetRef={newspaperRef} disabled={!photoUrl} />
        </div>
      </motion.header>

      {/* Print Container - Viewport Fitted */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[900px] h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] relative"
          style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Newspaper container with scroll if needed */}
          <div 
            className="w-full h-full overflow-auto rounded-sm"
            style={{
              backgroundColor: '#E8E0D0',
            }}
          >
            <div className="transform origin-top scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100">
              <NewspaperTemplate 
                ref={newspaperRef} 
                photoUrl={photoUrl} 
              />
            </div>
          </div>
          
          {/* Paper edge effects */}
          <div className="absolute inset-0 pointer-events-none rounded-sm"
            style={{
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1), inset 0 0 60px rgba(0,0,0,0.05)',
            }}
          />
        </motion.div>
      </div>

      {/* Footer hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pb-4 text-[#6B5B4B] text-xs"
      >
        Use the &quot;Download&quot; button to save your print as an image
      </motion.div>
    </main>
  );
}

