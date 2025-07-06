import React from 'react';
import { TemplateName } from '../data/portfolio';
import { 
  Loader2, Brain, Terminal, Hexagon, Clock, Waves, Leaf, Type, 
  BookOpen, Grid3X3, Box, Shield, Hash, Square, Mountain, Layers, 
  Sparkles, Code, Briefcase, Palette, Zap, Boxes, Mail, Linkedin, 
  Github, Star, Award, Users, Circle, Triangle, Database, Server,
  Monitor, Eye, Cpu, Sun, Moon, Coffee, Sunset, Heart, Flower,
  RotateCcw, Rewind, Pause, FastForward
} from 'lucide-react';

interface LoadingScreenProps {
  template: TemplateName;
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ template, isVisible }) => {
  if (!isVisible) return null;

  /**
   * Get template-specific background classes
   */
  const getTemplateBackground = (template: TemplateName) => {
    switch (template) {
      case 'Minimalist':
        return 'bg-white dark:bg-gray-900';
      case 'Creative':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950';
      case 'Corporate':
        return 'bg-gray-50 dark:bg-gray-900';
      case 'Dark Tech':
        return 'bg-gray-900 dark:bg-black';
      case 'Experimental':
        return 'bg-black dark:bg-gray-950';
      case 'Glassmorphism':
        return 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900';
      case 'Parallax':
        return 'bg-slate-900';
      case 'Neumorphism':
        return 'bg-gray-200 dark:bg-gray-800';
      case 'Brutalism':
        return 'bg-white';
      case 'Cyberpunk':
        return 'bg-black';
      case 'Skeuomorphism':
        return 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300';
      case 'Metro UI':
        return 'bg-gray-100';
      case 'Organic':
        return 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50';
      case 'Typographic':
        return 'bg-white';
      case 'Magazine':
        return 'bg-white';
      case 'Liquid Interface':
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950';
      case 'AI Dynamic Layout':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950';
      case 'Retro Terminal':
        return 'bg-black';
      case 'Animated Isometric':
        return 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950';
      case 'Time Machine Mode':
        return 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950';
      case 'Escher Grid':
        return 'bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200 dark:from-gray-900 dark:via-slate-950 dark:to-gray-800';
      default:
        return 'bg-white dark:bg-gray-900';
    }
  };

  /**
   * Get template-specific loading message
   */
  const getLoadingMessage = (template: TemplateName) => {
    switch (template) {
      case 'Minimalist':
        return 'Simplifying the interface...';
      case 'Creative':
        return 'Unleashing creativity...';
      case 'Corporate':
        return 'Preparing professional experience...';
      case 'Dark Tech':
        return 'Initializing terminal...';
      case 'Experimental':
        return 'Pushing boundaries...';
      case 'Glassmorphism':
        return 'Applying glass effects...';
      case 'Parallax':
        return 'Creating depth layers...';
      case 'Neumorphism':
        return 'Crafting soft shadows...';
      case 'Brutalism':
        return 'Breaking design rules...';
      case 'Cyberpunk':
        return 'Entering the matrix...';
      case 'Skeuomorphism':
        return 'Adding realistic textures...';
      case 'Metro UI':
        return 'Arranging tiles...';
      case 'Organic':
        return 'Growing natural forms...';
      case 'Typographic':
        return 'Setting beautiful type...';
      case 'Magazine':
        return 'Laying out editorial design...';
      case 'Liquid Interface':
        return 'Flowing into shape...';
      case 'AI Dynamic Layout':
        return 'Analyzing user patterns...';
      case 'Retro Terminal':
        return 'Booting retro system...';
      case 'Animated Isometric':
        return 'Rendering 3D blocks...';
      case 'Time Machine Mode':
        return 'Traveling through time...';
      case 'Escher Grid':
        return 'Creating impossible geometry...';
      default:
        return 'Please wait while we prepare your experience...';
    }
  };

  /**
   * Render template-specific loading design
   * Returns a unique loading screen design for each template
   */
  const renderTemplateLoadingDesign = () => {
    switch (template) {
      case 'Minimalist':
        return (
          <div className="text-center">
            <div className="mb-6 w-16 h-16 mx-auto border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center">
              <Palette className="w-8 h-8 text-gray-600 dark:text-gray-400 animate-pulse" />
            </div>
            <h2 className="text-3xl font-light mb-4 text-gray-800 dark:text-gray-200">
              Loading {template}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {getLoadingMessage(template)}
            </p>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full h-px bg-gray-300 dark:bg-gray-700">
                <div className="h-px bg-gray-800 dark:bg-gray-200 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Creative':
        return (
          <div className="text-center relative">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 opacity-30">
              <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-40 right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-10 left-1/2 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Loading {template}
            </h2>
            <p className="text-lg text-purple-200">
              {getLoadingMessage(template)}
            </p>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Corporate':
        return (
          <div className="text-center">
            <div className="mb-6 w-20 h-20 mx-auto bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-white animate-spin" />
            </div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
              Loading {template}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {getLoadingMessage(template)}
            </p>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-blue-600 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-8">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
          </div>
        );

      case 'Dark Tech':
        return (
          <div className="text-center font-mono">
            <div className="mb-6 border border-green-500 p-4 inline-block">
              <Code className="w-10 h-10 text-green-400 animate-pulse" />
            </div>
            <div className="text-green-500 text-sm mb-2">$ loading --template "Dark Tech"</div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              {template.toLowerCase().replace(' ', '_')}
            </h2>
            <div className="text-green-500 text-sm mb-2">$ echo $STATUS</div>
            <p className="text-green-300 mb-4">
              {getLoadingMessage(template)}
            </p>
            <div className="text-green-500 text-sm mb-2">$ progress --show</div>
            <div className="mt-4 w-64 mx-auto">
              <div className="w-full bg-gray-800 border border-green-500 h-4 overflow-hidden">
                <div className="h-full bg-green-500 bg-opacity-30 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="mt-4 text-green-400 text-sm animate-pulse">
              <span>|</span>
            </div>
          </div>
        );

      case 'Experimental':
        return (
          <div className="text-center relative">
            {/* Dynamic Background */}
            <div className="absolute inset-0 -z-10 opacity-30">
              <div 
                className="absolute w-60 h-60 bg-gradient-to-r from-orange-500 to-red-500 rounded-full filter blur-3xl"
                style={{
                  top: '30%',
                  left: '30%',
                  animation: 'pulse 4s infinite'
                }}
              />
              <div 
                className="absolute w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl"
                style={{
                  top: '60%',
                  left: '60%',
                  animation: 'pulse 5s infinite',
                  animationDelay: '1s'
                }}
              />
            </div>
            
            <div className="mb-6">
              <Zap className="w-16 h-16 text-orange-500 mx-auto animate-pulse" />
            </div>
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              {template}
            </h2>
            <p className="text-xl text-white opacity-80">
              {getLoadingMessage(template)}
            </p>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-pulse"></div>
            </div>
          </div>
        );

      case 'Glassmorphism':
        return (
          <div className="text-center relative">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="backdrop-blur-md bg-white/20 dark:bg-gray-900/20 rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl max-w-sm mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 backdrop-blur-md bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-800/30 dark:to-gray-800/10 rounded-full border border-white/40 dark:border-gray-600/40 flex items-center justify-center shadow-xl">
                <Layers className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Loading {template}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {getLoadingMessage(template)}
              </p>
              <div className="mt-6 w-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 rounded-full h-2 border border-white/40 dark:border-gray-600/40">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Parallax':
        return (
          <div className="text-center text-white relative">
            {/* Parallax Background Layers */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              {/* Layer 1 - Slowest */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
              </div>

              {/* Layer 2 - Medium */}
              <div className="absolute inset-0 opacity-20" style={{ transform: 'translateY(20px)' }}>
                <div className="absolute top-40 right-40 w-40 h-40 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-2xl"></div>
              </div>

              {/* Layer 3 - Fastest */}
              <div className="absolute inset-0 opacity-10" style={{ transform: 'translateY(40px)' }}>
                <div className="absolute top-60 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400/40 to-red-400/40 rounded-full blur-xl"></div>
                <div className="absolute bottom-60 right-1/2 w-32 h-32 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <div className="mb-6">
              <Mountain className="w-16 h-16 text-white mx-auto animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Loading {template}
            </h2>
            <p className="text-xl text-gray-300">
              {getLoadingMessage(template)}
            </p>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Neumorphism':
        return (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark flex items-center justify-center">
                <Square className="w-8 h-8 text-gray-600 dark:text-gray-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-light tracking-wide mb-4 text-gray-700 dark:text-gray-300">
              Loading {template}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {getLoadingMessage(template)}
            </p>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Brutalism':
        return (
          <div className="text-center relative">
            {/* Geometric shapes background */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 w-16 h-16 bg-red-500 transform rotate-45"></div>
              <div className="absolute top-8 right-8 w-12 h-12 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-4 left-1/4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-green-500"></div>
              <div className="absolute bottom-8 right-1/3 w-20 h-8 bg-purple-500"></div>
            </div>
            
            <div className="mb-8">
              <div className="bg-black text-yellow-400 inline-block px-8 py-4 transform skew-x-12 border-4 border-red-500">
                <Hash className="w-12 h-12 animate-spin" />
              </div>
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 transform -skew-x-12 text-black drop-shadow-[8px_8px_0px_#ff0000]">
              LOADING
            </h1>
            <div className="bg-red-500 text-white inline-block px-4 py-2 transform -rotate-2">
              <p className="text-lg font-bold uppercase">{getLoadingMessage(template)}</p>
            </div>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full bg-black h-8 border-4 border-yellow-400">
                <div className="h-full bg-yellow-400 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Cyberpunk':
        return (
          <div className="text-center font-mono relative">
            {/* Matrix Rain Background */}
            <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
              <div className="grid grid-cols-20 gap-0 h-full text-xs leading-none">
                {Array(20).fill(0).map((_, index) => (
                  <div key={index} className="flex flex-col text-cyan-400 animate-pulse">
                    {Array(20).fill(0).map((_, charIndex) => (
                      <span key={charIndex} className="opacity-70">01</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scanline Effect */}
            <div 
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 255, 255, 0.1) 51%, transparent 52%)',
                backgroundSize: '100% 4px',
                animation: 'scanline 0.5s linear infinite'
              }}
            />
            
            {/* Cyberpunk Avatar */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto relative">
                {/* Holographic frame */}
                <div className="absolute inset-0 border-4 border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm">
                  <div className="absolute inset-2 border-2 border-purple-400 bg-black/50 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                
                {/* Corner brackets */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-r-4 border-t-4 border-cyan-400"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-cyan-400"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 text-cyan-400 uppercase tracking-wider">
              LOADING<span className="animate-pulse">_</span>
            </h2>
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 border border-cyan-400 mb-4">
              <p className="text-xl font-bold text-black uppercase tracking-wider">{getLoadingMessage(template)}</p>
            </div>
            <div className="mt-4 w-64 mx-auto">
              <div className="w-full bg-black border border-cyan-400 h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" style={{ width: '60%' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Skeuomorphism':
        return (
          <div className="text-center relative">
            {/* Leather texture overlay */}
            <div className="absolute inset-0 -z-10 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,0,0,0.1) 1px, transparent 1px),
                               radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
            
            {/* Embossed Profile Picture Frame */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto relative">
                {/* Wooden frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 rounded-full shadow-xl p-4">
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 rounded-full shadow-inner-lg border-4 border-amber-800 flex items-center justify-center">
                    <Box className="w-12 h-12 text-amber-800 animate-spin" />
                  </div>
                </div>
                
                {/* Brass corner decorations */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
              </div>
            </div>
            
            {/* Brass nameplate */}
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-4 rounded-lg shadow-xl border-2 border-yellow-700 mb-4 inline-block">
              <p className="text-xl font-bold text-yellow-900 uppercase tracking-wider drop-shadow-sm">Loading {template}</p>
            </div>
            
            <p className="text-amber-800 font-semibold mb-4">{getLoadingMessage(template)}</p>
            
            <div className="mt-4 w-64 mx-auto">
              <div className="w-full bg-gradient-to-r from-amber-900 to-amber-800 rounded-full h-3 shadow-inner-md border border-amber-900 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-full rounded-full shadow-lg animate-pulse" style={{ width: '60%' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Metro UI':
        return (
          <div className="text-center">
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-xs mx-auto">
              <div className="bg-blue-500 aspect-square flex items-center justify-center text-white">
                <Grid3X3 className="w-10 h-10" />
              </div>
              <div className="bg-green-500 aspect-square flex items-center justify-center text-white animate-pulse">
                <Loader2 className="w-10 h-10" />
              </div>
              <div className="bg-red-500 aspect-square flex items-center justify-center text-white">
                <Grid3X3 className="w-10 h-10" />
              </div>
              <div className="bg-purple-500 aspect-square flex items-center justify-center text-white col-span-2 animate-pulse">
                <p className="font-semibold uppercase">{template}</p>
              </div>
              <div className="bg-orange-500 aspect-square flex items-center justify-center text-white">
                <Grid3X3 className="w-10 h-10" />
              </div>
              <div className="bg-teal-500 aspect-square flex items-center justify-center text-white">
                <Grid3X3 className="w-10 h-10" />
              </div>
              <div className="bg-indigo-500 aspect-square flex items-center justify-center text-white col-span-2 animate-pulse">
                <p className="text-sm">{getLoadingMessage(template)}</p>
              </div>
            </div>
            <div className="w-64 mx-auto bg-gray-200 h-2">
              <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        );

      case 'Organic':
        return (
          <div className="text-center relative">
            {/* Floating organic shapes */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              {Array(8).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-16 opacity-30"
                  style={{
                    left: `${10 + (i * 12)}%`,
                    top: `${20 + (i * 8)}%`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M50,10 C80,10 90,40 90,50 C90,80 60,90 50,90 C20,90 10,60 10,50 C10,20 20,10 50,10 Z"
                      fill={`hsl(${120 + i * 30}, 70%, 60%)`}
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              ))}
            </div>
            
            {/* Organic profile container */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M50,10 C80,10 90,40 90,50 C90,80 60,90 50,90 C20,90 10,60 10,50 C10,20 20,10 50,10 Z"
                    fill="url(#organicGradient)"
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="organicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Profile content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Loading {template}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {getLoadingMessage(template)}
            </p>
            
            {/* Organic progress bar */}
            <div className="mt-6 relative w-64 mx-auto">
              <svg viewBox="0 0 200 12" className="w-full h-8">
                <path
                  d="M6,6 C6,3 8,1 11,1 L189,1 C192,1 194,3 194,6 C194,9 192,11 189,11 L11,11 C8,11 6,9 6,6 Z"
                  fill="#e5e7eb"
                />
                <path
                  d="M6,6 C6,3 8,1 11,1 L120,1 C123,1 125,3 125,6 C125,9 123,11 120,11 L11,11 C8,11 6,9 6,6 Z"
                  fill="url(#organicProgress)"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="organicProgress" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        );

      case 'Typographic':
        return (
          <div className="text-center">
            <div className="space-y-4 mb-8">
              <h1 className="text-8xl font-black tracking-tighter leading-none">
                <span className="block text-gray-900 dark:text-white">
                  LOADING
                </span>
                <span className="block text-gray-400 dark:text-gray-600 -mt-4">
                  TEMPLATE
                </span>
              </h1>
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl font-light tracking-wide text-gray-600 dark:text-gray-400">
                {template}<span className="animate-pulse">|</span>
              </h2>
            </div>
            
            <div className="space-y-2 mt-4">
              <p className="text-lg font-medium tracking-wider uppercase text-gray-500 dark:text-gray-500">
                {getLoadingMessage(template)}
              </p>
              <div className="w-24 h-px bg-gray-900 dark:bg-white mx-auto"></div>
            </div>
            
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full h-px bg-gray-300 dark:bg-gray-700"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-px bg-gray-900 dark:bg-white animate-pulse"></div>
              <div className="flex justify-between mt-1 text-xs text-gray-400 dark:text-gray-600">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        );

      case 'Magazine':
        return (
          <div className="text-center">
            <div className="border-b-4 border-gray-900 dark:border-white pb-4 mb-8">
              <div className="text-4xl font-black tracking-tighter">
                DEV WEEKLY
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Special Loading Edition
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {template} Template
              </h2>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>1 min read</span>
                </span>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Featured</span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {getLoadingMessage(template)}
              </p>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
                <div className="h-full bg-gray-900 dark:bg-white animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Liquid Interface':
        return (
          <div className="text-center relative">
            {/* SVG Filters for Liquid Effects */}
            <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                {/* Main liquid distortion filter */}
                <filter id="liquidDistortion" x="-50%" y="-50%" width="200%" height="200%">
                  <feTurbulence
                    baseFrequency="0.01"
                    numOctaves="3"
                    result="noise"
                    seed="1"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="8"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                
                {/* Glow effect for interactive elements */}
                <filter id="liquidGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              {/* Large flowing blob */}
              <div 
                className="absolute w-60 h-60 opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)',
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  left: '40%',
                  top: '30%',
                  transform: 'translate(-50%, -50%)',
                  filter: 'url(#liquidDistortion)'
                }}
              />
            </div>
            
            {/* Liquid Avatar */}
            <div className="mb-8 relative">
              <div 
                className="w-32 h-32 mx-auto relative"
                style={{
                  filter: 'url(#liquidGlow)'
                }}
              >
                <div 
                  className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-2xl"
                  style={{
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    animation: 'morphing 8s ease-in-out infinite'
                  }}
                >
                  <Waves className="w-12 h-12 animate-pulse" />
                </div>
                
                {/* Floating liquid particles */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Loading {template}
            </h2>
            
            {/* Liquid title container */}
            <div 
              className="relative inline-block mb-4 p-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm"
              style={{
                borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
                filter: 'url(#liquidGlow)'
              }}
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{getLoadingMessage(template)}</p>
            </div>
            
            {/* Liquid progress bar */}
            <div className="mt-6 w-64 mx-auto">
              <div 
                className="relative h-3 bg-gray-200 dark:bg-gray-700 overflow-hidden"
                style={{
                  borderRadius: '50% 20% 50% 20% / 30% 50% 30% 50%'
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse relative overflow-hidden"
                  style={{ 
                    width: '60%',
                    borderRadius: '50% 20% 50% 20% / 30% 50% 30% 50%'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </div>
            </div>
            
            {/* Custom CSS for morphing animation */}
            <style jsx>{`
              @keyframes morphing {
                0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
                75% { border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%; }
                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
              }
            `}</style>
          </div>
        );

      case 'AI Dynamic Layout':
        return (
          <div className="text-center relative">
            <div className="fixed bottom-6 right-6 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 max-w-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Layout Engine</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                    <Sun className="w-4 h-4" />
                    <span>morning</span>
                    <Eye className="w-4 h-4" />
                    <span>browsing</span>
                    <Cpu className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Layout Mode:</span>
                  <span className="font-semibold capitalize">expanded</span>
                </div>
                <div className="flex justify-between">
                  <span>Color Scheme:</span>
                  <span className="font-semibold capitalize">professional</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority:</span>
                  <span className="font-semibold capitalize">about</span>
                </div>
                <div className="flex justify-between">
                  <span>Analysis:</span>
                  <span className="font-semibold">In Progress</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden">
                <Brain className="w-16 h-16 animate-pulse" />
                
                {/* AI Activity Indicator */}
                <div className="absolute top-2 right-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse">
                    <div className="w-full h-full bg-white/30 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Loading {template}
            </h2>
            
            <div className="relative inline-block mb-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <p className="font-medium text-lg text-gray-700 dark:text-gray-300">
                {getLoadingMessage(template)}
              </p>
              
              {/* AI Enhancement Badge */}
              <div className="absolute -top-2 -right-2">
                <div className="px-2 py-1 bg-gradient-to-r from-blue-400 to-indigo-400 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>AI</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 w-64 mx-auto">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      case 'Retro Terminal':
        return (
          <div className="text-center font-mono relative">
            {/* CRT Effect Overlay */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/3 to-transparent"></div>
            </div>

            {/* Scanlines */}
            <div 
              className="absolute inset-0 -z-10 pointer-events-none opacity-30"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
                animation: 'scanlines 0.1s linear infinite'
              }}
            ></div>
            
            {/* Terminal Header */}
            <div className="bg-gray-900 border-b border-green-500 p-3 flex items-center space-x-3 mb-8 max-w-md mx-auto">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Terminal className="w-4 h-4" />
                <span className="text-sm">portfolio@terminal:~</span>
              </div>
            </div>
            
            <div className="text-green-400 leading-relaxed max-w-md mx-auto text-left">
              <div className="text-yellow-400">portfolio@terminal:~ $ </div>
              <div>PORTFOLIO OS v2.1.0 - Initializing...</div>
              <div className="text-green-400">Loading kernel modules... [OK]</div>
              <div className="text-green-400">Mounting file systems... [OK]</div>
              <div className="text-green-400">Starting network services... [OK]</div>
              <div className="text-green-400">Loading user profile... [OK]</div>
              <div className="text-green-400 mt-4">
                {getLoadingMessage(template)}
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-green-500 text-sm mr-2">$ progress --show</div>
                <div className="w-32 bg-gray-800 border border-green-500 h-4 overflow-hidden">
                  <div className="h-full bg-green-500 bg-opacity-30 animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="mt-4 text-green-400 animate-pulse">
                <span>|</span>
              </div>
            </div>
            
            {/* CSS for CRT effects */}
            <style jsx>{`
              @keyframes scanlines {
                0% { transform: translateY(0); }
                100% { transform: translateY(4px); }
              }
            `}</style>
          </div>
        );

      case 'Animated Isometric':
        return (
          <div className="text-center relative">
            {/* Floating particles */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              {Array(10).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            <div className="mb-8">
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                {/* Base platform */}
                <g transform="translate(60, 60)">
                  <polygon
                    points="0,-30 30,0 0,30 -30,0"
                    fill="#8b5cf6"
                    stroke="#000"
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                  <polygon
                    points="0,-30 30,0 30,-15 0,-45"
                    fill="#ec4899"
                    stroke="#000"
                    strokeWidth="1"
                  />
                  <polygon
                    points="-30,0 0,30 -15,30 -45,0"
                    fill="#f59e0b"
                    stroke="#000"
                    strokeWidth="1"
                  />
                  <foreignObject x="-15" y="-15" width="30" height="30">
                    <div className="flex items-center justify-center w-full h-full">
                      <Boxes className="w-6 h-6 text-white animate-spin" />
                    </div>
                  </foreignObject>
                </g>
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Loading {template}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {getLoadingMessage(template)}
            </p>
            
            <div className="mt-6 w-64 mx-auto">
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            {/* CSS for floating animation */}
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
              }
            `}</style>
          </div>
        );

      case 'Time Machine Mode':
        return (
          <div className="text-center relative">
            {/* Time Travel Particle Field */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
              {Array(20).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${1 + Math.random() * 3}px`,
                    height: `${1 + Math.random() * 3}px`,
                    opacity: 0.6,
                    transform: 'scale(1.5)'
                  }}
                />
              ))}
            </div>
            
            {/* Time Machine Control Panel */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-xs mx-auto mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-amber-600 to-red-600 rounded-xl">
                  <Clock className="w-6 h-6 text-white animate-spin" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Time Machine</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Loading Timeline</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <span>2020</span>
                  <span>Timeline</span>
                  <span>2025</span>
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-600 to-red-600 animate-pulse"
                    style={{ width: '60%' }}
                  />
                  <div 
                    className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1 -translate-x-2 animate-pulse"
                    style={{ left: '60%' }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <Rewind className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg">
                    <Pause className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <FastForward className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Loading...
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Loading {template}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {getLoadingMessage(template)}
            </p>
          </div>
        );

      case 'Escher Grid':
        return (
          <div className="text-center relative">
            {/* Escher-style background pattern */}
            <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="escherPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <polygon points="25,12.5 75,12.5 87.5,37.5 75,62.5 25,62.5 12.5,37.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#escherPattern)" />
              </svg>
            </div>
            
            {/* Escher Tessellation */}
            <div className="mb-8 relative">
              <div className="w-64 h-64 mx-auto relative">
                <svg width="240" height="240" viewBox="0 0 240 240" className="mx-auto">
                  <g transform="translate(120, 120)">
                    {/* Hexagon */}
                    <g transform="rotate(0)" className="animate-pulse">
                      <polygon
                        points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                        fill="#6366f1"
                        stroke="#000"
                        strokeWidth="1"
                        opacity="0.8"
                      />
                    </g>
                    
                    {/* Triangle */}
                    <g transform="translate(60, 0) rotate(45)" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
                      <polygon
                        points="0,-30 26,15 -26,15"
                        fill="#8b5cf6"
                        stroke="#000"
                        strokeWidth="1"
                        opacity="0.8"
                      />
                    </g>
                    
                    {/* Square */}
                    <g transform="translate(-60, 0) rotate(15)" className="animate-pulse" style={{ animationDelay: '1s' }}>
                      <rect
                        x="-20"
                        y="-20"
                        width="40"
                        height="40"
                        fill="#ec4899"
                        stroke="#000"
                        strokeWidth="1"
                        opacity="0.8"
                      />
                    </g>
                    
                    {/* Circle */}
                    <g transform="translate(0, 60) rotate(30)" className="animate-pulse" style={{ animationDelay: '1.5s' }}>
                      <circle
                        cx="0"
                        cy="0"
                        r="20"
                        fill="#f59e0b"
                        stroke="#000"
                        strokeWidth="1"
                        opacity="0.8"
                      />
                    </g>
                    
                    {/* Center icon */}
                    <foreignObject x="-15" y="-15" width="30" height="30">
                      <div className="flex items-center justify-center w-full h-full">
                        <Hexagon className="w-6 h-6 text-white animate-spin" />
                      </div>
                    </foreignObject>
                  </g>
                </svg>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 bg-clip-text text-transparent">
              Loading {template}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {getLoadingMessage(template)}
            </p>
            
            <div className="mt-6 w-64 mx-auto">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gray-600 to-slate-700 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <div className="mb-6">
              <Loader2 className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto animate-spin" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Loading {template}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {getLoadingMessage(template)}
            </p>
            <div className="mt-8 w-64 mx-auto">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${getTemplateBackground(template)} flex flex-col items-center justify-center transition-all duration-500`}>
      {renderTemplateLoadingDesign()}
    </div>
  );
};

export default LoadingScreen;