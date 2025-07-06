/**
 * Loading Screen Component
 * 
 * This component displays a full-screen loading overlay with a progress bar
 * during template transitions. It shows the name of the template being loaded
 * and animates a progress bar that completes over the loading duration.
 */

import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  template: string;
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ template, isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  // Loading text animation
  useEffect(() => {
    if (isVisible) {
      const texts = [
        'Initializing...',
        'Loading components...',
        'Applying styles...',
        'Optimizing layout...',
        'Almost ready...'
      ];
      
      let textIndex = 0;
      const textInterval = setInterval(() => {
        setLoadingText(texts[textIndex]);
        textIndex = (textIndex + 1) % texts.length;
      }, 600);

      return () => clearInterval(textInterval);
    }
  }, [isVisible]);

  // Progress bar animation
  useEffect(() => {
    if (isVisible) {
      // Reset progress when loading starts
      setProgress(0);
      
      // Animate progress bar over 3 seconds (matching setTimeout in App.tsx)
      const startTime = Date.now();
      const duration = 3000; // 3 seconds
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        
        setProgress(newProgress);
        
        if (newProgress < 100) {
          requestAnimationFrame(updateProgress);
        }
      };
      
      requestAnimationFrame(updateProgress);
    } else {
      // Reset progress when not visible
      setProgress(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 backdrop-blur-sm">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array(20).fill(0).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center text-white max-w-md mx-auto px-6">
        {/* Loading spinner */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <Loader2 className="w-20 h-20 animate-spin text-blue-400" />
            <Sparkles className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" />
          </div>
        </div>

        {/* Template name */}
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {template}
        </h2>
        
        {/* Loading text */}
        <p className="text-gray-300 mb-8 animate-pulse">
          {loadingText}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          
          {/* Progress milestones */}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Template description */}
        <div className="mt-8 text-sm text-gray-400">
          <p>Preparing your {template.toLowerCase()} experience...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;