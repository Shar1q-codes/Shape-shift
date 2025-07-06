/**
 * Main Application Component
 * 
 * This is the root component that manages the entire portfolio application.
 * It handles template switching, loading states, theme management, and renders
 * the appropriate template based on user selection.
 */

import React, { useState, useEffect } from 'react';
import { TemplateName } from './data/portfolio';

// Import core components
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import LoadingScreen from './components/LoadingScreen';
import TemplateSelector from './components/TemplateSelector';

// Import all template components
import MinimalistTemplate from './components/templates/MinimalistTemplate';
import CreativeTemplate from './components/templates/CreativeTemplate';
import CorporateTemplate from './components/templates/CorporateTemplate';
import DarkTechTemplate from './components/templates/DarkTechTemplate';
import ExperimentalTemplate from './components/templates/ExperimentalTemplate';
import GlassmorphismTemplate from './components/templates/GlassmorphismTemplate';
import ParallaxTemplate from './components/templates/ParallaxTemplate';
import NeumorphismTemplate from './components/templates/NeumorphismTemplate';
import BrutalistTemplate from './components/templates/BrutalistTemplate';
import CyberpunkTemplate from './components/templates/CyberpunkTemplate';
import SkeuomorphismTemplate from './components/templates/SkeuomorphismTemplate';
import MetroUITemplate from './components/templates/MetroUITemplate';
import OrganicTemplate from './components/templates/OrganicTemplate';
import TypographicTemplate from './components/templates/TypographicTemplate';
import MagazineTemplate from './components/templates/MagazineTemplate';
import LiquidInterfaceTemplate from './components/templates/LiquidInterfaceTemplate';
import AIDynamicLayoutTemplate from './components/templates/AIDynamicLayoutTemplate';
import RetroTerminalTemplate from './components/templates/RetroTerminalTemplate';
import AnimatedIsometricTemplate from './components/templates/AnimatedIsometricTemplate';
import TimeMachineModeTemplate from './components/templates/TimeMachineModeTemplate';
import EscherGridTemplate from './components/templates/EscherGridTemplate';

const App: React.FC = () => {
  // State management for template switching and UI
  const [currentTemplate, setCurrentTemplate] = useState<TemplateName>('Minimalist');
  const [isLoading, setIsLoading] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [nextTemplate, setNextTemplate] = useState<TemplateName>('Minimalist');

  /**
   * Handle template change with loading animation
   * Prevents unnecessary re-renders if same template is selected
   */
  const handleTemplateChange = (template: TemplateName) => {
    // Exit early if same template is selected
    if (template === currentTemplate) return;
    
    // Set up loading state and next template
    setNextTemplate(template);
    setIsLoading(true);
    console.log('Setting isLoading to true');
    
    // Simulate loading time for smooth transition effect (increased duration for debugging)
    setTimeout(() => {
      setCurrentTemplate(template);
      setIsLoading(false);
      console.log('Setting isLoading to false');
    }, 3000);
  };

  /**
   * Template renderer - returns the appropriate template component
   * Uses switch statement for clean template selection logic
   */
  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'Minimalist':
        return <MinimalistTemplate />;
      case 'Creative':
        return <CreativeTemplate />;
      case 'Corporate':
        return <CorporateTemplate />;
      case 'Dark Tech':
        return <DarkTechTemplate />;
      case 'Experimental':
        return <ExperimentalTemplate />;
      case 'Glassmorphism':
        return <GlassmorphismTemplate />;
      case 'Parallax':
        return <ParallaxTemplate />;
      case 'Neumorphism':
        return <NeumorphismTemplate />;
      case 'Brutalism':
        return <BrutalistTemplate />;
      case 'Cyberpunk':
        return <CyberpunkTemplate />;
      case 'Skeuomorphism':
        return <SkeuomorphismTemplate />;
      case 'Metro UI':
        return <MetroUITemplate />;
      case 'Organic':
        return <OrganicTemplate />;
      case 'Typographic':
        return <TypographicTemplate />;
      case 'Magazine':
        return <MagazineTemplate />;
      case 'Liquid Interface':
        return <LiquidInterfaceTemplate />;
      case 'AI Dynamic Layout':
        return <AIDynamicLayoutTemplate />;
      case 'Retro Terminal':
        return <RetroTerminalTemplate />;
      case 'Animated Isometric':
        return <AnimatedIsometricTemplate />;
      case 'Time Machine Mode':
        return <TimeMachineModeTemplate />;
      case 'Escher Grid':
        return <EscherGridTemplate />;
      default:
        return <MinimalistTemplate />;
    }
  };

  /**
   * Apply theme-specific body classes based on current template
   * This effect runs whenever the currentTemplate changes
   * Each template has its own background styling applied to the body
   */
  useEffect(() => {
    // Define body classes for each template theme
    const bodyClasses = {
      'Minimalist': 'bg-white dark:bg-gray-900',
      'Creative': 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950',
      'Corporate': 'bg-gray-50 dark:bg-gray-900',
      'Dark Tech': 'bg-gray-900 dark:bg-black',
      'Experimental': 'bg-black dark:bg-gray-950',
      'Glassmorphism': 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900',
      'Parallax': 'bg-slate-900',
      'Neumorphism': 'bg-gray-200 dark:bg-gray-800',
      'Brutalism': 'bg-white',
      'Cyberpunk': 'bg-black',
      'Skeuomorphism': 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300',
      'Metro UI': 'bg-gray-100',
      'Organic': 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      'Typographic': 'bg-white',
      'Magazine': 'bg-white',
      'Liquid Interface': 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950',
      'AI Dynamic Layout': 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950',
      'Retro Terminal': 'bg-black',
      'Animated Isometric': 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950',
      'Time Machine Mode': 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950',
      'Escher Grid': 'bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200 dark:from-gray-900 dark:via-slate-950 dark:to-gray-800'
    };

    // Apply the appropriate body class for current template
    document.body.className = bodyClasses[currentTemplate];
    
    // Cleanup function to remove body classes when component unmounts
    return () => {
      document.body.className = '';
    };
  }, [currentTemplate]);

  return (
    <div className="relative">
      {/* Custom Cursor Component - handles cursor styling */}
      <CustomCursor />

      {/* Theme Toggle Button - switches between light/dark modes */}
      <ThemeToggle />

      {/* Loading Screen - shows during template transitions */}
      <LoadingScreen template={nextTemplate} isVisible={isLoading} />

      {/* Template Selector - dropdown for choosing templates */}
      <TemplateSelector
        currentTemplate={currentTemplate}
        onTemplateChange={handleTemplateChange}
        isOpen={isTemplateOpen}
        onToggle={() => setIsTemplateOpen(!isTemplateOpen)}
      />

      {/* Main Template Content - renders the selected template */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default App;