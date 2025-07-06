/**
 * Loading Screen Component
 * 
 * This component displays a full-screen loading overlay with a progress bar
 * during template transitions. It dynamically adapts its design to match
 * the aesthetic of the template being loaded.
 */

import React, { useEffect, useState } from 'react';
import { 
  Loader2, Sparkles, Palette, Briefcase, Code, Zap, Layers, Mountain, 
  Square, Hash, Shield, Box, Grid3X3, Leaf, Type, BookOpen, Waves, 
  Brain, Terminal, Boxes, Clock, Hexagon, Star, Circle, Triangle
} from 'lucide-react';
import { TemplateName } from '../data/portfolio';

interface LoadingScreenProps {
  template: TemplateName;
  isVisible: boolean;
}

interface LoadingStyles {
  background: string;
  textColor: string;
  accentColor: string;
  progressGradient: string;
  spinnerColor: string;
  particleColor: string;
  icon: React.ReactNode;
  loadingTexts: string[];
  description: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ template, isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  /**
   * Get template-specific loading screen styles
   */
  const getLoadingScreenStyles = (templateName: TemplateName): LoadingStyles => {
    switch (templateName) {
      case 'Minimalist':
        return {
          background: 'bg-white dark:bg-gray-900',
          textColor: 'text-gray-900 dark:text-white',
          accentColor: 'text-gray-600 dark:text-gray-400',
          progressGradient: 'from-gray-400 to-gray-600',
          spinnerColor: 'text-gray-500',
          particleColor: 'bg-gray-400',
          icon: <Palette className="w-8 h-8" />,
          loadingTexts: ['Simplifying...', 'Removing clutter...', 'Focusing on content...', 'Perfecting whitespace...', 'Almost minimal...'],
          description: 'Creating a clean, minimal experience'
        };

      case 'Creative':
        return {
          background: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
          textColor: 'text-white',
          accentColor: 'text-purple-300',
          progressGradient: 'from-purple-500 via-pink-500 to-orange-500',
          spinnerColor: 'text-purple-400',
          particleColor: 'bg-gradient-to-r from-purple-400 to-pink-400',
          icon: <Sparkles className="w-8 h-8" />,
          loadingTexts: ['Unleashing creativity...', 'Mixing colors...', 'Adding magic...', 'Inspiring design...', 'Ready to create...'],
          description: 'Preparing your creative canvas'
        };

      case 'Corporate':
        return {
          background: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900',
          textColor: 'text-blue-900 dark:text-blue-100',
          accentColor: 'text-blue-600 dark:text-blue-400',
          progressGradient: 'from-blue-500 to-indigo-600',
          spinnerColor: 'text-blue-600',
          particleColor: 'bg-blue-500',
          icon: <Briefcase className="w-8 h-8" />,
          loadingTexts: ['Establishing connection...', 'Loading credentials...', 'Preparing workspace...', 'Optimizing performance...', 'Ready for business...'],
          description: 'Setting up your professional environment'
        };

      case 'Dark Tech':
        return {
          background: 'bg-gray-900 dark:bg-black',
          textColor: 'text-green-400',
          accentColor: 'text-green-300',
          progressGradient: 'from-green-500 to-emerald-500',
          spinnerColor: 'text-green-500',
          particleColor: 'bg-green-400',
          icon: <Code className="w-8 h-8" />,
          loadingTexts: ['Initializing terminal...', 'Loading modules...', 'Compiling code...', 'Establishing connection...', 'System ready...'],
          description: 'Booting up the matrix'
        };

      case 'Experimental':
        return {
          background: 'bg-black',
          textColor: 'text-white',
          accentColor: 'text-orange-400',
          progressGradient: 'from-orange-500 via-red-500 to-pink-500',
          spinnerColor: 'text-orange-500',
          particleColor: 'bg-gradient-to-r from-orange-400 to-red-400',
          icon: <Zap className="w-8 h-8" />,
          loadingTexts: ['Experimenting...', 'Breaking boundaries...', 'Pushing limits...', 'Creating chaos...', 'Ready to explore...'],
          description: 'Entering experimental mode'
        };

      case 'Glassmorphism':
        return {
          background: 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900',
          textColor: 'text-gray-900 dark:text-white',
          accentColor: 'text-blue-600 dark:text-blue-400',
          progressGradient: 'from-blue-400 via-purple-500 to-pink-500',
          spinnerColor: 'text-blue-500',
          particleColor: 'bg-white/30',
          icon: <Layers className="w-8 h-8" />,
          loadingTexts: ['Applying blur effects...', 'Creating transparency...', 'Layering elements...', 'Polishing glass...', 'Crystal clear...'],
          description: 'Crafting frosted glass effects'
        };

      case 'Parallax':
        return {
          background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
          textColor: 'text-white',
          accentColor: 'text-purple-300',
          progressGradient: 'from-blue-400 via-purple-500 to-pink-500',
          spinnerColor: 'text-purple-400',
          particleColor: 'bg-purple-400',
          icon: <Mountain className="w-8 h-8" />,
          loadingTexts: ['Creating depth...', 'Layering parallax...', 'Building dimensions...', 'Adding movement...', 'Depth achieved...'],
          description: 'Building dimensional layers'
        };

      case 'Neumorphism':
        return {
          background: 'bg-gray-200 dark:bg-gray-800',
          textColor: 'text-gray-800 dark:text-gray-200',
          accentColor: 'text-gray-600 dark:text-gray-400',
          progressGradient: 'from-blue-400 to-purple-500',
          spinnerColor: 'text-gray-600',
          particleColor: 'bg-gray-400',
          icon: <Square className="w-8 h-8" />,
          loadingTexts: ['Molding surfaces...', 'Creating shadows...', 'Softening edges...', 'Adding tactile feel...', 'Perfectly soft...'],
          description: 'Sculpting soft interfaces'
        };

      case 'Brutalism':
        return {
          background: 'bg-white',
          textColor: 'text-black',
          accentColor: 'text-red-500',
          progressGradient: 'from-yellow-400 via-red-500 to-black',
          spinnerColor: 'text-red-500',
          particleColor: 'bg-black',
          icon: <Hash className="w-8 h-8" />,
          loadingTexts: ['BREAKING RULES...', 'SMASHING CONVENTIONS...', 'BEING BRUTAL...', 'NO MERCY...', 'BRUTALLY READY...'],
          description: 'DESTROYING DESIGN NORMS'
        };

      case 'Cyberpunk':
        return {
          background: 'bg-black',
          textColor: 'text-cyan-400',
          accentColor: 'text-purple-400',
          progressGradient: 'from-cyan-400 via-purple-500 to-pink-500',
          spinnerColor: 'text-cyan-400',
          particleColor: 'bg-cyan-400',
          icon: <Shield className="w-8 h-8" />,
          loadingTexts: ['Jacking into the matrix...', 'Bypassing firewalls...', 'Decrypting data...', 'Neural link established...', 'Welcome to the future...'],
          description: 'Entering the cybernet'
        };

      case 'Skeuomorphism':
        return {
          background: 'bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300',
          textColor: 'text-amber-900',
          accentColor: 'text-amber-700',
          progressGradient: 'from-amber-400 via-yellow-500 to-amber-600',
          spinnerColor: 'text-amber-600',
          particleColor: 'bg-amber-500',
          icon: <Box className="w-8 h-8" />,
          loadingTexts: ['Crafting textures...', 'Adding wood grain...', 'Polishing metal...', 'Creating realism...', 'Perfectly crafted...'],
          description: 'Handcrafting realistic elements'
        };

      case 'Metro UI':
        return {
          background: 'bg-blue-600',
          textColor: 'text-white',
          accentColor: 'text-blue-200',
          progressGradient: 'from-green-400 via-blue-500 to-purple-500',
          spinnerColor: 'text-white',
          particleColor: 'bg-white',
          icon: <Grid3X3 className="w-8 h-8" />,
          loadingTexts: ['Arranging tiles...', 'Organizing layout...', 'Flipping cards...', 'Syncing data...', 'Metro ready...'],
          description: 'Building tile interface'
        };

      case 'Organic':
        return {
          background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900',
          textColor: 'text-emerald-800 dark:text-emerald-200',
          accentColor: 'text-green-600 dark:text-green-400',
          progressGradient: 'from-green-400 via-emerald-500 to-teal-500',
          spinnerColor: 'text-emerald-600',
          particleColor: 'bg-green-400',
          icon: <Leaf className="w-8 h-8" />,
          loadingTexts: ['Growing naturally...', 'Flowing organically...', 'Breathing life...', 'Nurturing growth...', 'Blooming beautifully...'],
          description: 'Cultivating natural beauty'
        };

      case 'Typographic':
        return {
          background: 'bg-white dark:bg-gray-900',
          textColor: 'text-gray-900 dark:text-white',
          accentColor: 'text-gray-600 dark:text-gray-400',
          progressGradient: 'from-gray-600 to-gray-900',
          spinnerColor: 'text-gray-700',
          particleColor: 'bg-gray-600',
          icon: <Type className="w-8 h-8" />,
          loadingTexts: ['Setting type...', 'Adjusting kerning...', 'Perfecting hierarchy...', 'Balancing composition...', 'Typography ready...'],
          description: 'Crafting perfect typography'
        };

      case 'Magazine':
        return {
          background: 'bg-white dark:bg-gray-900',
          textColor: 'text-gray-900 dark:text-white',
          accentColor: 'text-gray-700 dark:text-gray-300',
          progressGradient: 'from-gray-700 via-gray-800 to-gray-900',
          spinnerColor: 'text-gray-800',
          particleColor: 'bg-gray-700',
          icon: <BookOpen className="w-8 h-8" />,
          loadingTexts: ['Printing pages...', 'Arranging articles...', 'Setting headlines...', 'Binding content...', 'Magazine ready...'],
          description: 'Publishing your story'
        };

      case 'Liquid Interface':
        return {
          background: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950',
          textColor: 'text-blue-900 dark:text-blue-100',
          accentColor: 'text-purple-600 dark:text-purple-400',
          progressGradient: 'from-blue-400 via-purple-500 to-pink-500',
          spinnerColor: 'text-blue-600',
          particleColor: 'bg-blue-400',
          icon: <Waves className="w-8 h-8" />,
          loadingTexts: ['Flowing like water...', 'Creating ripples...', 'Morphing shapes...', 'Liquid forming...', 'Perfectly fluid...'],
          description: 'Flowing into liquid form'
        };

      case 'AI Dynamic Layout':
        return {
          background: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950',
          textColor: 'text-blue-900 dark:text-blue-100',
          accentColor: 'text-indigo-600 dark:text-indigo-400',
          progressGradient: 'from-blue-500 via-purple-500 to-indigo-600',
          spinnerColor: 'text-blue-600',
          particleColor: 'bg-blue-500',
          icon: <Brain className="w-8 h-8" />,
          loadingTexts: ['Training neural networks...', 'Analyzing patterns...', 'Optimizing layout...', 'Learning preferences...', 'AI ready...'],
          description: 'Powering up artificial intelligence'
        };

      case 'Retro Terminal':
        return {
          background: 'bg-black',
          textColor: 'text-green-400',
          accentColor: 'text-green-300',
          progressGradient: 'from-green-500 to-green-600',
          spinnerColor: 'text-green-400',
          particleColor: 'bg-green-400',
          icon: <Terminal className="w-8 h-8" />,
          loadingTexts: ['Booting system...', 'Loading drivers...', 'Initializing terminal...', 'Connecting to mainframe...', 'System online...'],
          description: 'Connecting to retro mainframe'
        };

      case 'Animated Isometric':
        return {
          background: 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950',
          textColor: 'text-purple-900 dark:text-purple-100',
          accentColor: 'text-pink-600 dark:text-pink-400',
          progressGradient: 'from-purple-500 via-pink-500 to-orange-500',
          spinnerColor: 'text-purple-600',
          particleColor: 'bg-purple-400',
          icon: <Boxes className="w-8 h-8" />,
          loadingTexts: ['Building 3D world...', 'Calculating perspectives...', 'Animating blocks...', 'Rendering isometric...', 'Dimension ready...'],
          description: 'Constructing 3D isometric world'
        };

      case 'Time Machine Mode':
        return {
          background: 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950',
          textColor: 'text-amber-900 dark:text-amber-100',
          accentColor: 'text-orange-600 dark:text-orange-400',
          progressGradient: 'from-amber-500 via-orange-500 to-red-500',
          spinnerColor: 'text-amber-600',
          particleColor: 'bg-amber-400',
          icon: <Clock className="w-8 h-8" />,
          loadingTexts: ['Calibrating temporal flux...', 'Charging time circuits...', 'Opening time portal...', 'Synchronizing timeline...', 'Time travel ready...'],
          description: 'Preparing time machine'
        };

      case 'Escher Grid':
        return {
          background: 'bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200 dark:from-gray-900 dark:via-slate-950 dark:to-gray-800',
          textColor: 'text-gray-900 dark:text-white',
          accentColor: 'text-slate-600 dark:text-slate-400',
          progressGradient: 'from-gray-600 via-slate-700 to-gray-800',
          spinnerColor: 'text-gray-700',
          particleColor: 'bg-gray-600',
          icon: <Hexagon className="w-8 h-8" />,
          loadingTexts: ['Creating impossible geometry...', 'Tessellating patterns...', 'Bending reality...', 'Calculating infinity...', 'Paradox resolved...'],
          description: 'Constructing impossible tessellations'
        };

      default:
        return {
          background: 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900',
          textColor: 'text-white',
          accentColor: 'text-blue-400',
          progressGradient: 'from-blue-500 via-purple-500 to-pink-500',
          spinnerColor: 'text-blue-400',
          particleColor: 'bg-blue-400',
          icon: <Sparkles className="w-8 h-8" />,
          loadingTexts: ['Initializing...', 'Loading components...', 'Applying styles...', 'Optimizing layout...', 'Almost ready...'],
          description: 'Preparing your experience'
        };
    }
  };

  const styles = getLoadingScreenStyles(template);

  // Loading text animation
  useEffect(() => {
    if (isVisible) {
      let textIndex = 0;
      const textInterval = setInterval(() => {
        setLoadingText(styles.loadingTexts[textIndex]);
        textIndex = (textIndex + 1) % styles.loadingTexts.length;
      }, 600);

      return () => clearInterval(textInterval);
    }
  }, [isVisible, styles.loadingTexts]);

  // Progress bar animation
  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      
      let progressStep = 0;
      const progressInterval = setInterval(() => {
        progressStep += 1; // Increment by 1% each step
        setProgress(progressStep);
        
        if (progressStep >= 100) {
          clearInterval(progressInterval);
        }
      }, 30); // 30ms interval for smooth 1% increments (3000ms total / 100 steps = 30ms per step)
      
      return () => clearInterval(progressInterval);
    } else {
      setProgress(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${styles.background} backdrop-blur-sm`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array(20).fill(0).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${styles.particleColor} rounded-full opacity-20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 text-center ${styles.textColor} max-w-md mx-auto px-6`}>
        {/* Loading spinner with template icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <Loader2 className={`w-20 h-20 animate-spin ${styles.spinnerColor}`} />
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${styles.accentColor} animate-pulse`}>
              {styles.icon}
            </div>
          </div>
        </div>

        {/* Template name */}
        <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${styles.progressGradient} bg-clip-text text-transparent`}>
          {template}
        </h2>
        
        {/* Loading text */}
        <p className={`${styles.accentColor} mb-8 animate-pulse`}>
          {loadingText}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className={`flex justify-between text-sm ${styles.accentColor} mb-2`}>
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-700/30 dark:bg-gray-300/30 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className={`h-full bg-gradient-to-r ${styles.progressGradient} rounded-full transition-all duration-100 ease-out relative overflow-hidden`}
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          
          {/* Progress milestones */}
          <div className={`flex justify-between text-xs ${styles.accentColor} opacity-60 mt-1`}>
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Template description */}
        <div className="mt-8">
          <p className={`text-sm ${styles.accentColor}`}>
            {styles.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;