'use client';

import { useEffect, useState } from 'react';

export default function MobileOverlay() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F0E6] flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md">
        <h1 
          className="text-4xl mb-6 text-[#2C1810]"
          style={{ fontFamily: 'Chomsky, serif' }}
        >
          New York Street Press
        </h1>
        <div className="w-24 h-24 mx-auto mb-6 bg-[#2C1810] rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-[#F5F0E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 
          className="text-2xl font-bold text-[#2C1810] mb-4"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          Desktop Experience Only
        </h2>
        <p className="text-[#8B7355] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-garamond), serif' }}>
          For the authentic vintage camera experience and newspaper layout, please visit us on a desktop or laptop computer.
        </p>
        <div className="mt-8 pt-8 border-t border-[#8B7355]/30">
          <p className="text-[#8B7355] text-sm italic">
            screen width must be &gt; 768px
          </p>
        </div>
      </div>
    </div>
  );
}
