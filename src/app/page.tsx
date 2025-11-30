'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PhotoCapture from '@/components/PhotoCapture';

const PolaroidCamera = dynamic(() => import('@/components/PolaroidCamera'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-[#8B7355] text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B7355] border-t-transparent mx-auto mb-4"></div>
        <p className="text-lg">Loading Camera...</p>
      </div>
    </div>
  )
});

export default function Home() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const router = useRouter();

  const loadingMessages = [
    'Developing your photo...',
    'Applying vintage filters...',
    'Setting up the press...',
    'Arranging the layout...',
    'Adding the finishing touches...',
    'Almost ready...',
    'Creating your masterpiece...'
  ];

  const handleCameraCapture = () => {
    setShowCaptureModal(true);
  };

  const handlePhotoCapture = async (url: string) => {
    setShowCaptureModal(false);
    setIsCapturing(true);
    setIsLoading(true);

    // Store photo in sessionStorage
    sessionStorage.setItem('capturedPhoto', url);
    sessionStorage.setItem('photoDate', new Date().toISOString());

    // Animate through loading messages
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingText(loadingMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 900));
    }

    // Navigate to print page
    router.push('/print');
  };

  return (
    <main className="min-h-screen bg-[#F5F0E6] relative overflow-hidden">
      {/* Subtle warm texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(139, 115, 85, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E6] via-[#EDE5D8] to-[#E8DFD0]" />

      {/* Header */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1810] tracking-tight"
          style={{ fontFamily: 'Chomsky, serif' }}
        >
          New York Street Press
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#8B7355] text-xs sm:text-sm mt-1 sm:mt-2"
        >
          Capture moments in vintage newspaper style
        </motion.p>
      </div>

      {/* Camera - Centered */}
      <div className="w-full h-screen flex flex-col items-center justify-center relative z-32">
        <div className="relative">
          <Suspense fallback={
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B7355] border-t-transparent"></div>
            </div>
          }>
            <PolaroidCamera onCapture={handleCameraCapture} isCapturing={isCapturing} />
          </Suspense>
        </div>

        {/* Instructions - Just below camera */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center z-8"
        >
          <p className="text-[#5C4A3A] text-sm font-medium tracking-wide bg-[#F5F0E6]/80 px-4 py-2 rounded-full backdrop-blur-sm inline-block shadow-sm">
            Click the <span className="text-red-600 font-bold mx-1">red button</span> to capture or upload
          </p>
        </motion.div>
      </div>

      {/* Removed absolute positioned instructions */}


      {/* Flash overlay */}
      <AnimatePresence>
        {isCapturing && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white pointer-events-none z-50"
          />
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1a1a1a] z-50 flex flex-col items-center justify-center"
          >
            {/* Animated newspaper printing effect */}
            <div className="relative mb-8">
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-32 bg-[#F5F0E6] rounded-sm shadow-2xl flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="text-[#2C1810] text-xs font-bold text-center px-2" style={{ fontFamily: 'Chomsky, serif' }}>
                  NYS Press
                </div>
              </motion.div>
              
              {/* Animated lines coming out */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ 
                    width: [0, 60, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute h-0.5 bg-[#F5F0E6]"
                  style={{
                    top: `${30 + i * 15}%`,
                    left: '100%',
                    marginLeft: 10,
                  }}
                />
              ))}
            </div>

            {/* Loading text */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[#F5F0E6] text-xl font-medium mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {loadingText}
            </motion.p>

            {/* Progress dots */}
            <div className="flex gap-2">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0.3 }}
                  animate={{ 
                    scale: loadingMessages.indexOf(loadingText) >= i ? 1 : 0.5,
                    opacity: loadingMessages.indexOf(loadingText) >= i ? 1 : 0.3,
                  }}
                  className="w-2 h-2 rounded-full bg-[#F5F0E6]"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Capture Modal */}
      <PhotoCapture
        isOpen={showCaptureModal}
        onClose={() => setShowCaptureModal(false)}
        onPhotoCapture={handlePhotoCapture}
      />
    </main>
  );
}
