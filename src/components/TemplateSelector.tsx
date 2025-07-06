/**
 * Template Selector Component
 * 
 * This component provides a dropdown interface for selecting different portfolio templates.
 * It displays the current template, allows toggling the selector visibility, and handles
 * template changes with appropriate icons for each template style.
 */

import React from 'react';
import { Palette, Zap, Briefcase, Code, Sparkles, Layers, Mountain, Square, Hash, Shield, Box, Grid3X3, Leaf, Type, BookOpen, Waves, Brain, Terminal, Boxes, Clock, Hexagon } from 'lucide-react';
import { TemplateName, templateNames } from '../data/portfolio';

// Props interface for the TemplateSelector component
interface TemplateSelectorProps {
  currentTemplate: TemplateName;
  onTemplateChange: (template: TemplateName) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onTemplateChange,
  isOpen,
  onToggle
}) => {
  /**
   * Get appropriate icon for template type
   * Returns a Lucide icon component based on template name
   */
  const getTemplateIcon = (template: TemplateName) => {
    switch (template) {
      case 'Minimalist':
        return <Palette className="w-5 h-5" />;
      case 'Creative':
        return <Sparkles className="w-5 h-5" />;
      case 'Corporate':
        return <Briefcase className="w-5 h-5" />;
      case 'Dark Tech':
        return <Code className="w-5 h-5" />;
      case 'Experimental':
        return <Zap className="w-5 h-5" />;
      case 'Glassmorphism':
        return <Layers className="w-5 h-5" />;
      case 'Parallax':
        return <Mountain className="w-5 h-5" />;
      case 'Neumorphism':
        return <Square className="w-5 h-5" />;
      case 'Brutalism':
        return <Hash className="w-5 h-5" />;
      case 'Cyberpunk':
        return <Shield className="w-5 h-5" />;
      case 'Skeuomorphism':
        return <Box className="w-5 h-5" />;
      case 'Metro UI':
        return <Grid3X3 className="w-5 h-5" />;
      case 'Organic':
        return <Leaf className="w-5 h-5" />;
      case 'Typographic':
        return <Type className="w-5 h-5" />;
      case 'Magazine':
        return <BookOpen className="w-5 h-5" />;
      case 'Liquid Interface':
        return <Waves className="w-5 h-5" />;
      case 'AI Dynamic Layout':
        return <Brain className="w-5 h-5" />;
      case 'Retro Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Animated Isometric':
        return <Boxes className="w-5 h-5" />;
      case 'Time Machine Mode':
        return <Clock className="w-5 h-5" />;
      case 'Escher Grid':
        return <Hexagon className="w-5 h-5" />;
      default:
        return <Palette className="w-5 h-5" />;
    }
  };

  /**
   * Get appropriate color scheme for template button
   * Returns Tailwind classes for styling the template button
   */
  const getTemplateColor = (template: TemplateName) => {
    switch (template) {
      case 'Minimalist':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'Creative':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600';
      case 'Corporate':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'Dark Tech':
        return 'bg-gray-900 text-green-400 hover:bg-gray-800';
      case 'Experimental':
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600';
      case 'Glassmorphism':
        return 'bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:from-blue-500 hover:to-purple-500';
      case 'Parallax':
        return 'bg-gradient-to-r from-slate-600 to-purple-600 text-white hover:from-slate-700 hover:to-purple-700';
      case 'Neumorphism':
        return 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-neumorphism hover:shadow-neumorphism-pressed';
      case 'Brutalism':
        return 'bg-yellow-400 text-black hover:bg-red-500 hover:text-white border-2 border-black';
      case 'Cyberpunk':
        return 'bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:from-cyan-400 hover:to-purple-400 border border-cyan-400';
      case 'Skeuomorphism':
        return 'bg-gradient-to-br from-amber-400 to-amber-600 text-amber-900 hover:from-amber-300 hover:to-amber-500 shadow-lg border border-amber-700';
      case 'Metro UI':
        return 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600';
      case 'Organic':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600';
      case 'Typographic':
        return 'bg-gray-900 text-white hover:bg-gray-800';
      case 'Magazine':
        return 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800';
      case 'Liquid Interface':
        return 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white hover:from-blue-500 hover:via-purple-600 hover:to-pink-600';
      case 'AI Dynamic Layout':
        return 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600';
      case 'Retro Terminal':
        return 'bg-gradient-to-r from-green-600 to-green-800 text-green-100 hover:from-green-700 hover:to-green-900 font-mono border border-green-400';
      case 'Animated Isometric':
        return 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white hover:from-purple-700 hover:via-pink-600 hover:to-orange-600';
      case 'Time Machine Mode':
        return 'bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 text-white hover:from-amber-700 hover:via-orange-600 hover:to-red-700 border border-amber-400';
      case 'Escher Grid':
        return 'bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 text-white hover:from-gray-800 hover:via-slate-700 hover:to-gray-900 border border-gray-500';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="fixed top-6 right-6 z-40">
      {/* Toggle button for template selector */}
      <button
        onClick={onToggle}
        className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105"
        aria-label="Template selector"
      >
        {getTemplateIcon(currentTemplate)}
      </button>
      
      {/* Template selection dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64 border border-gray-200 dark:border-gray-700 backdrop-blur-sm max-h-[calc(100vh-120px)] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Choose Template
          </h3>
          <div className="space-y-2">
            {templateNames.map((template) => (
              <button
                key={template}
                onClick={() => {
                  onTemplateChange(template);
                  onToggle();
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  currentTemplate === template
                    ? getTemplateColor(template)
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105'
                }`}
              >
                {getTemplateIcon(template)}
                <span className="font-medium">{template}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;