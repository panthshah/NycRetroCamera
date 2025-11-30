'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoCaptureProps {
  onPhotoCapture: (photoUrl: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function PhotoCapture({ onPhotoCapture, onClose, isOpen }: PhotoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraReady(false);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    // Don't start if already running
    if (streamRef.current) return;
    
    try {
      setError(null);
      setIsCameraReady(false);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      // Store in ref to avoid dependency issues
      streamRef.current = mediaStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please check permissions or upload a photo instead.');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setCountdown(null);
      setFlash(false);
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  const capturePhoto = useCallback(() => {
    if (!isCameraReady || countdown !== null) return;
    
    // Start countdown
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          
          // Take the photo
          if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            
            canvas.width = video.videoWidth || 1280;
            canvas.height = video.videoHeight || 720;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
              // Flip horizontally for selfie mode
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
              ctx.drawImage(video, 0, 0);
              
              // Flash effect
              setFlash(true);
              setTimeout(() => setFlash(false), 300);
              
              // Get the image
              const photoUrl = canvas.toDataURL('image/jpeg', 0.9);
              
              // Stop camera before navigating
              stopCamera();
              
              setTimeout(() => {
                onPhotoCapture(photoUrl);
              }, 500);
            }
          }
          
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onPhotoCapture, isCameraReady, countdown, stopCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Stop camera immediately when uploading
      stopCamera();
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onPhotoCapture(result);
        }
      };
      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  }, [onPhotoCapture, stopCamera]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-6 max-w-2xl w-full mx-2 sm:mx-4 shadow-2xl border border-gray-700"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
              Capture Your Moment
            </h2>

            {/* Camera preview */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              {error ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-center p-4">
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  
                  {/* Countdown overlay */}
                  {countdown !== null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <motion.span
                        key={countdown}
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="text-8xl font-bold text-white"
                      >
                        {countdown}
                      </motion.span>
                    </div>
                  )}
                  
                  {/* Flash effect */}
                  {flash && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-white"
                    />
                  )}
                  
                  {/* Camera not ready indicator */}
                  {!isCameraReady && !error && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                    </div>
                  )}
                </>
              )}
              
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {/* Capture button */}
              <button
                onClick={capturePhoto}
                disabled={!isCameraReady || countdown !== null}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span>Capture</span>
              </button>

              {/* Upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Upload Photo</span>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <p className="text-gray-400 text-sm text-center mt-4">
              Your photo will be styled in the vintage New York Street Press format
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

