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
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E6] via-[#EDE5D8] to-[#E8DFD0]" />

      {/* Header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-[#2C1810] tracking-tight"
          style={{ fontFamily: 'Chomsky, serif' }}
        >
          New York Street Press
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#8B7355] text-sm mt-2"
        >
          Capture moments in vintage newspaper style
        </motion.p>
      </div>

      {/* Camera - Centered */}
      <div className="w-full h-screen flex items-center justify-center relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B7355] border-t-transparent"></div>
          </div>
        }>
          <PolaroidCamera onCapture={handleCameraCapture} isCapturing={isCapturing} />
        </Suspense>
      </div>

      {/* Instructions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <p className="text-[#5C4A3A] text-sm mb-4">
          Click the <span className="text-red-500 font-semibold">red button</span> on the camera to take a photo
        </p>
        <button
          onClick={handleCameraCapture}
          className="px-8 py-3 bg-[#2C1810] hover:bg-[#1a0f0a] text-white rounded-full transition-all font-medium shadow-lg hover:shadow-xl"
        >
          📸 Take Photo or Upload
        </button>
      </motion.div>

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
