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
        <p className="text-[#8B7355] text-xl leading-relaxed font-medium" style={{ fontFamily: 'var(--font-garamond), serif' }}>
          For better experience view it on desktop
        </p>
      </div>
    </div>
  );
}