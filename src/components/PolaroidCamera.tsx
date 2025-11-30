'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PolaroidCamera.module.css';

interface PolaroidCameraProps {
  onCapture: () => void;
  isCapturing: boolean;
}

export default function PolaroidCamera({ onCapture, isCapturing }: PolaroidCameraProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onCapture();
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={styles.camera}
        aria-label="Photorealistic illustration of a Polaroid camera"
      >
        {/* Top section */}
        <div className={styles.top}>
          {/* Flash */}
          <div className={styles.flash}>
            <AnimatePresence>
              {isCapturing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.flashEffect}
                />
              )}
            </AnimatePresence>
          </div>
          
          {/* Timer */}
          <div className={styles.timer}></div>
          
          {/* Sensor */}
          <div className={styles.sensor}></div>
          
          {/* Lens */}
          <div className={styles.lens}>
            <div className={styles.glass}></div>
          </div>
          
          {/* Shutter button */}
          <button 
            className={`${styles.shutter} ${isPressed ? styles.shutterPressed : ''}`}
            onClick={handleClick}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
          />
          
          {/* Viewfinder */}
          <div className={styles.viewfinder}>
            <div className={styles.viewfinderGlass}>
              <div className={styles.viewfinderBack}></div>
            </div>
          </div>
          
          {/* Power button */}
          <div className={styles.power}></div>
        </div>

        {/* Bottom section */}
        <div className={styles.bottom}>
          {/* Toggle container */}
          <div className={styles.bottomToggleContainer}>
            <div className={styles.bottomToggle}>
              <div className={styles.bottomHandle}></div>
            </div>
          </div>
          
          {/* Printer slot */}
          <div className={styles.printer}></div>
          
          {/* Labels */}
          <div className={styles.labels}>
            <div className={styles.rainbow}></div>
            <div className={styles.logo}>Polaroid</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
