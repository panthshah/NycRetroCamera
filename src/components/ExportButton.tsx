'use client';

import { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import { motion } from 'framer-motion';

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
}

export default function ExportButton({ targetRef, disabled }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleExport = async (format: 'png' | 'jpeg' | 'print') => {
    if (!targetRef.current) return;
    
    setIsExporting(true);
    setShowOptions(false);
    
    try {
      if (format === 'print') {
        window.print();
      } else {
        const exportFn = format === 'png' ? toPng : toJpeg;
        const dataUrl = await exportFn(targetRef.current, {
          quality: 0.95,
          pixelRatio: 2,
          backgroundColor: '#FDEECD'
        });
        
        // Download the image
        const link = document.createElement('a');
        link.download = `nyc-street-press-${Date.now()}.${format}`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowOptions(!showOptions)}
        disabled={disabled || isExporting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-full font-semibold
          transition-all shadow-lg
          ${disabled 
            ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
            : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white'
          }
        `}
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export / Print</span>
          </>
        )}
      </motion.button>

      {/* Export options dropdown */}
      {showOptions && !disabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden z-10 min-w-[180px]"
        >
          <button
            onClick={() => handleExport('png')}
            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-3"
          >
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Download PNG
          </button>
          <button
            onClick={() => handleExport('jpeg')}
            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-3"
          >
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Download JPEG
          </button>
          <button
            onClick={() => handleExport('print')}
            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-3 border-t border-gray-700"
          >
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </motion.div>
      )}
    </div>
  );
}

