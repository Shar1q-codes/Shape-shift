/**
 * AI Dynamic Layout Template
 * 
 * This template uses artificial intelligence concepts to dynamically adapt
 * the layout based on user behavior, time of day, and interaction patterns.
 * It analyzes user activity and adjusts the interface accordingly.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Brain, Cpu, Zap, Clock, Eye, Target, Activity, TrendingUp, Sun, Moon, Coffee, Sunset } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

// Interface defining the AI layout state
interface LayoutState {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  userActivity: 'browsing' | 'focused' | 'exploring' | 'idle';
  layoutMode: 'compact' | 'expanded' | 'minimal' | 'detailed';
  colorScheme: 'energetic' | 'professional' | 'calm' | 'creative';
  contentPriority: 'projects' | 'skills' | 'about' | 'contact';
}

const AIDynamicLayoutTemplate: React.FC = () => {
  // AI layout state management
  const [layoutState, setLayoutState] = useState<LayoutState>({
    timeOfDay: 'morning',
    userActivity: 'browsing',
    layoutMode: 'expanded',
    colorScheme: 'professional',
    contentPriority: 'about'
  });

  // User activity tracking
  const [mouseActivity, setMouseActivity] = useState({ movements: 0, clicks: 0, scrolls: 0 });
  const [timeSpent, setTimeSpent] = useState(0);
  const [sectionViews, setSectionViews] = useState({ about: 0, projects: 0, skills: 0, contact: 0 });
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Refs for tracking and timing
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(Date.now());
  const lastAnalysisRef = useRef(Date.now());

  /**
   * AI Analysis Engine
   * Analyzes user behavior patterns and adjusts layout accordingly
   */
  const analyzeUserBehavior = () => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    
    // Determine time of day based on current hour
    let timeOfDay: LayoutState['timeOfDay'] = 'morning';
    if (hour >= 6 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    // Calculate activity score based on user interactions
    const activityScore = mouseActivity.movements + mouseActivity.clicks * 5 + mouseActivity.scrolls * 3;
    let userActivity: LayoutState['userActivity'] = 'browsing';
    
    // Determine user activity level
    if (activityScore > 100) userActivity = 'exploring';
    else if (activityScore > 50) userActivity = 'focused';
    else if (timeSpent > 30000) userActivity = 'focused';
    else if (activityScore < 10 && timeSpent > 10000) userActivity = 'idle';

    // Determine optimal layout mode based on activity
    let layoutMode: LayoutState['layoutMode'] = 'expanded';
    if (userActivity === 'idle') layoutMode = 'minimal';
    else if (userActivity === 'exploring') layoutMode = 'detailed';
    else if (timeOfDay === 'morning') layoutMode = 'compact';

    // AI-driven color scheme selection based on time
    let colorScheme: LayoutState['colorScheme'] = 'professional';
    if (timeOfDay === 'morning') colorScheme = 'energetic';
    else if (timeOfDay === 'afternoon') colorScheme = 'professional';
    else if (timeOfDay === 'evening') colorScheme = 'calm';
    else colorScheme = 'creative';

    // Determine content priority based on user behavior
    const maxViews = Math.max(...Object.values(sectionViews));
    let contentPriority: LayoutState['contentPriority'] = 'about';
    
    if (sectionViews.projects === maxViews && maxViews > 0) contentPriority = 'projects';
    else if (sectionViews.skills === maxViews && maxViews > 0) contentPriority = 'skills';
    else if (sectionViews.contact === maxViews && maxViews > 0) contentPriority = 'contact';
    else if (userActivity === 'exploring') contentPriority = 'projects';

    // Generate AI recommendations based on analysis
    const recommendations = [];
    if (userActivity === 'idle') recommendations.push("Taking a break? Let me highlight key projects for you.");
    if (timeOfDay === 'morning') recommendations.push("Good morning! Here's an energetic view of my work.");
    if (activityScore > 80) recommendations.push("I see you're actively exploring - showing detailed project information.");
    if (timeSpent > 60000) recommendations.push("Thanks for spending time here! Prioritizing contact information.");

    // Update layout state with AI analysis results
    setLayoutState({
      timeOfDay,
      userActivity,
      layoutMode,
      colorScheme,
      contentPriority
    });

    setAiRecommendations(recommendations);
  };

  /**
   * Track user interactions for AI analysis
   * Sets up event listeners for mouse movements, clicks, and scrolls
   */
  useEffect(() => {
    const handleMouseMove = () => {
      setMouseActivity(prev => ({ ...prev, movements: prev.movements + 1 }));
    };

    const handleClick = () => {
      setMouseActivity(prev => ({ ...prev, clicks: prev.clicks + 1 }));
    };

    const handleScroll = () => {
      setMouseActivity(prev => ({ ...prev, scrolls: prev.scrolls + 1 }));
    };

    const container = containerRef.current;
    if (container) {
      // Add event listeners for user interaction tracking
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('click', handleClick);
      window.addEventListener('scroll', handleScroll);

      // Cleanup event listeners
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('click', handleClick);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  /**
   * Track time spent and run AI analysis periodically
   * Updates time spent and triggers AI analysis every 5 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setTimeSpent(currentTime - startTimeRef.current);

      // Run AI analysis every 5 seconds
      if (currentTime - lastAnalysisRef.current > 5000) {
        setIsAnalyzing(true);
        setTimeout(() => {
          analyzeUserBehavior();
          setIsAnalyzing(false);
          lastAnalysisRef.current = currentTime;
        }, 500);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mouseActivity, timeSpent, sectionViews]);

  /**
   * Intersection Observer for section tracking
   * Tracks which sections are being viewed for content prioritization
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section') as keyof typeof sectionViews;
            if (sectionName) {
              setSectionViews(prev => ({
                ...prev,
                [sectionName]: prev[sectionName] + 1
              }));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections with data-section attribute
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /**
   * Dynamic styling based on AI analysis
   * Returns color scheme object based on current AI state
   */
  const getColorScheme = () => {
    switch (layoutState.colorScheme) {
      case 'energetic':
        return {
          primary: 'from-orange-500 to-red-500',
          secondary: 'from-yellow-400 to-orange-500',
          accent: 'from-red-400 to-pink-500',
          bg: 'from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950',
          text: 'text-orange-900 dark:text-orange-100'
        };
      case 'professional':
        return {
          primary: 'from-blue-600 to-indigo-600',
          secondary: 'from-indigo-500 to-purple-600',
          accent: 'from-blue-400 to-cyan-500',
          bg: 'from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950',
          text: 'text-blue-900 dark:text-blue-100'
        };
      case 'calm':
        return {
          primary: 'from-green-500 to-teal-500',
          secondary: 'from-teal-400 to-cyan-500',
          accent: 'from-emerald-400 to-green-500',
          bg: 'from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950',
          text: 'text-green-900 dark:text-green-100'
        };
      case 'creative':
        return {
          primary: 'from-purple-600 to-pink-600',
          secondary: 'from-pink-500 to-rose-500',
          accent: 'from-violet-400 to-purple-500',
          bg: 'from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950',
          text: 'text-purple-900 dark:text-purple-100'
        };
    }
  };

  // Get current color scheme and group skills by category
  const colors = getColorScheme();
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  /**
   * Get appropriate icon for time of day
   */
  const getTimeIcon = () => {
    switch (layoutState.timeOfDay) {
      case 'morning': return <Sun className="w-5 h-5" />;
      case 'afternoon': return <Coffee className="w-5 h-5" />;
      case 'evening': return <Sunset className="w-5 h-5" />;
      case 'night': return <Moon className="w-5 h-5" />;
    }
  };

  /**
   * Get appropriate icon for user activity
   */
  const getActivityIcon = () => {
    switch (layoutState.userActivity) {
      case 'browsing': return <Eye className="w-5 h-5" />;
      case 'focused': return <Target className="w-5 h-5" />;
      case 'exploring': return <Activity className="w-5 h-5" />;
      case 'idle': return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br ${colors.bg} ${colors.text} transition-all duration-1000 ease-in-out`}
    >
      {/* AI Status Panel - Shows current AI analysis and recommendations */}
      <div className="fixed bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-200 dark:border-gray-700 max-w-[calc(100%-1.5rem)] sm:max-w-xs">
        {/* AI Status Header */}
        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
          <div className={`p-1.5 sm:p-2 bg-gradient-to-r ${colors.primary} rounded-md sm:rounded-lg`}>
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm">AI Layout Engine</h3>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="hidden sm:inline-flex items-center">
                {getTimeIcon()}
                <span className="ml-1">{layoutState.timeOfDay}</span>
              </span>
              <span className="flex items-center">
                {getActivityIcon()}
                <span className="ml-1">{layoutState.userActivity}</span>
              </span>
              {isAnalyzing && <Cpu className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />}
            </div>
          </div>
        </div>
        
        {/* AI Analysis Data */}
        <div className="space-y-1 sm:space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Layout Mode:</span>
            <span className="font-semibold capitalize">{layoutState.layoutMode}</span>
          </div>
          <div className="flex justify-between">
            <span>Color Scheme:</span>
            <span className="font-semibold capitalize">{layoutState.colorScheme}</span>
          </div>
          <div className="flex justify-between">
            <span>Priority:</span>
            <span className="font-semibold capitalize">{layoutState.contentPriority}</span>
          </div>
          <div className="flex justify-between">
            <span>Time Spent:</span>
            <span className="font-semibold">{Math.floor(timeSpent / 1000)}s</span>
          </div>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">AI Insights:</div>
            {aiRecommendations.slice(0, 2).map((rec, index) => (
              <div key={index} className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                • {rec}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Header - Adapts based on AI analysis */}
      <header 
        data-section="about"
        className={`max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-16 md:pt-20 transition-all duration-1000 ${
          layoutState.layoutMode === 'minimal' ? 'py-12' : 
          layoutState.layoutMode === 'compact' ? 'py-16' : 'py-20'
        }`}
      >
        <div className={`text-center transition-all duration-1000 ${
          layoutState.contentPriority === 'about' ? 'transform scale-105' : ''
        }`}>
          {/* AI-Adaptive Avatar */}
          <div className="mb-8 relative">
            <div className={`mx-auto relative transition-all duration-1000 flex items-center justify-center ${
              layoutState.layoutMode === 'minimal' ? 'w-32 h-32' :
              layoutState.layoutMode === 'compact' ? 'w-40 h-40' : 'w-48 h-48'
            }`}>
              <div className={`w-full h-full bg-gradient-to-br ${colors.primary} rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden`}>
                <span className={`font-bold transition-all duration-500 ${
                  layoutState.layoutMode === 'minimal' ? 'text-3xl' :
                  layoutState.layoutMode === 'compact' ? 'text-4xl' : 'text-5xl'
                }`}> 
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
                
                {/* AI Activity Indicator */}
                <div className="absolute top-2 right-2">
                  <div className={`w-4 h-4 bg-gradient-to-r ${colors.accent} rounded-full animate-pulse`}>
                    <div className="w-full h-full bg-white/30 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
              
              {/* Dynamic floating elements based on activity */}
              {layoutState.userActivity === 'exploring' && (
                <>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </div>
          </div>

          {/* Adaptive Typography */}
          <div className="mb-8">
            <h1 className={`font-bold mb-4 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent transition-all duration-1000 ${
              layoutState.layoutMode === 'minimal' ? 'text-3xl sm:text-4xl' :
              layoutState.layoutMode === 'compact' ? 'text-5xl' : 'text-6xl'
            }`}>
              {personalInfo.name}
            </h1>
            
            <div className={`relative inline-block mb-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-1000 ${
              layoutState.contentPriority === 'about' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
            }`}> 
              <p className={`font-medium transition-all duration-500 ${
                layoutState.layoutMode === 'minimal' ? 'text-lg' :
                layoutState.layoutMode === 'compact' ? 'text-xl' : 'text-2xl'
              }`}>
                {personalInfo.title}
              </p>
              
              {/* AI Enhancement Badge */}
              <div className="absolute -top-2 -right-2 hidden sm:block">
                <div className={`px-2 py-1 bg-gradient-to-r ${colors.accent} text-white text-xs font-bold rounded-full flex items-center space-x-1`}>
                  <Zap className="w-3 h-3" />
                  <span>AI</span>
                </div>
              </div>
            </div>
            
            {layoutState.layoutMode !== 'minimal' && (
              <p className="text-gray-600 dark:text-gray-400 mb-8">{personalInfo.education}</p>
            )}
          </div>

          {/* Smart Contact Buttons */}
          <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-1000 ${
            layoutState.contentPriority === 'contact' ? 'transform scale-110' : ''
          }`}>
            <a 
              href={`mailto:${personalInfo.email}`}
              className={`group bg-gradient-to-r ${colors.primary} text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2`}
            >
              <Mail className="w-5 h-5" />
              <span className="font-semibold text-sm sm:text-base">
                {layoutState.timeOfDay === 'morning' ? 'Good Morning!' :
                 layoutState.timeOfDay === 'afternoon' ? 'Let\'s Connect' :
                 layoutState.timeOfDay === 'evening' ? 'Evening Chat?' : 'Night Owl?'}
              </span>
            </a>
            
            {layoutState.layoutMode !== 'minimal' && (
              <>
                <a 
                  href={`https://${personalInfo.linkedin}`}
                  className={`group bg-gradient-to-r ${colors.secondary} text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2`}
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-semibold text-sm sm:text-base">LinkedIn</span>
                </a>
                
                <a 
                  href={`https://${personalInfo.github}`}
                  className={`group bg-gradient-to-r ${colors.accent} text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2`}
                >
                  <Github className="w-5 h-5" />
                  <span className="font-semibold text-sm sm:text-base">Code</span>
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Adaptive About Section */}
      {(layoutState.layoutMode !== 'minimal' || layoutState.contentPriority === 'about') && (
        <section
          data-section="about"
          className={`max-w-6xl mx-auto px-6 py-16 transition-all duration-1000 ${
            layoutState.contentPriority === 'about' ? 'transform scale-105' : ''
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent transition-all duration-1000 ${
                layoutState.layoutMode === 'compact' ? 'text-3xl' : 'text-4xl'
              }`}>
                About Me
              </h2>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                <p className={`leading-relaxed text-gray-700 dark:text-gray-300 transition-all duration-500 ${
                  layoutState.layoutMode === 'detailed' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`}>
                  {personalInfo.bio}
                </p>
                
                {layoutState.userActivity === 'focused' && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                      💡 AI Notice: You seem focused! Here's additional context about my background and expertise.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Smart Stats - Responsive */}
              <div className={`bg-gradient-to-r ${colors.primary} text-white p-6 rounded-2xl shadow-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">4+</div>
                    <div className="text-sm opacity-90">Years Experience</div>
                  </div>
                  <TrendingUp className="w-8 h-8 opacity-80" />
                </div>
              </div>
              
              <div className={`bg-gradient-to-r ${colors.secondary} text-white p-6 rounded-2xl shadow-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm opacity-90">Projects Completed</div>
                  </div>
                  <Target className="w-8 h-8 opacity-80" />
                </div>
              </div>
              
              <div className={`bg-gradient-to-r ${colors.accent} text-white p-6 rounded-2xl shadow-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">AI</div>
                    <div className="text-sm opacity-90">Powered Experience</div>
                  </div>
                  <Brain className="w-8 h-8 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Projects Section */}
      {(layoutState.layoutMode !== 'minimal' || layoutState.contentPriority === 'projects') && (
        <section
          data-section="projects"
          className={`max-w-6xl mx-auto px-6 py-16 transition-all duration-1000 ${
            layoutState.contentPriority === 'projects' ? 'transform scale-105' : ''
          }`}
        >
          <div className="text-center mb-16">
            <h2 className={`font-bold mb-6 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent transition-all duration-1000 ${
              layoutState.layoutMode === 'compact' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
            }`}>
              Smart Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {layoutState.userActivity === 'exploring' 
                ? "Detailed project showcase - you're exploring actively!"
                : "AI-curated selection of my best work"}
            </p>
          </div>
          
          <div className={`grid gap-8 transition-all duration-1000 ${
            layoutState.layoutMode === 'compact' ? 'grid-cols-1 md:grid-cols-2' : 
            layoutState.layoutMode === 'detailed' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {projects.slice(0, layoutState.layoutMode === 'compact' ? 2 : 4).map((project, index) => (
              <div
                key={project.id}
                className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  layoutState.contentPriority === 'projects' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
              > 
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* AI Enhancement Overlay */}
                  <div className="absolute top-4 right-4 hidden sm:block">
                    <div className={`px-3 py-1 bg-gradient-to-r ${colors.accent} text-white text-xs font-bold rounded-full flex items-center space-x-1`}>
                      <Brain className="w-3 h-3" />
                      <span>AI Enhanced</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <span className={`hidden sm:inline-block bg-gradient-to-r ${colors.secondary} text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium capitalize`}>
                      {project.category} 
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {layoutState.layoutMode === 'detailed' && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex space-x-3 sm:space-x-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        className={`bg-gradient-to-r ${colors.primary} text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View</span>
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        className={`bg-gradient-to-r ${colors.accent} text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2`}
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Adaptive Skills Section */}
      {(layoutState.layoutMode !== 'minimal' || layoutState.contentPriority === 'skills') && (
        <section
          data-section="skills"
          className={`max-w-6xl mx-auto px-6 py-16 transition-all duration-1000 ${
            layoutState.contentPriority === 'skills' ? 'transform scale-105' : ''
          }`}
        >
          <div className="text-center mb-16">
            <h2 className={`font-bold mb-6 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent transition-all duration-1000 ${
              layoutState.layoutMode === 'compact' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
            }`}>
              AI-Analyzed Skills
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dynamic skill assessment based on project complexity and market demand
            </p>
          </div>
          
          <div className={`grid gap-8 transition-all duration-1000 ${
            layoutState.layoutMode === 'compact' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div 
                key={category}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  layoutState.contentPriority === 'skills' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${colors.primary} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    <Brain className="w-8 h-8" />
                  </div> 
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                    {category.replace('-', ' ')}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {categorySkills.slice(0, layoutState.layoutMode === 'compact' ? 3 : categorySkills.length).map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${colors.primary} h-2 rounded-full transition-all duration-1000 relative overflow-hidden`}
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Smart Contact Section */}
      <section
        data-section="contact"
        className={`max-w-4xl mx-auto px-6 py-20 transition-all duration-1000 ${
          layoutState.contentPriority === 'contact' ? 'transform scale-105' : ''
        }`}
      >
        <div className="text-center">
          <h2 className={`font-bold mb-8 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent transition-all duration-1000 ${
            layoutState.layoutMode === 'compact' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
          }`}>
            AI-Powered Collaboration
          </h2>
          
          <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl ${
            layoutState.contentPriority === 'contact' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
          }`}>
            <p className="text-2xl font-bold mb-8 leading-tight text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
              Ready to build something intelligent together?<br />
              <span className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
                Let's create the future with AI.
              </span>
            </p>
            
            <a 
              href={`mailto:${personalInfo.email}`}
              className={`inline-block bg-gradient-to-r ${colors.primary} text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center space-x-4">
                <Mail className="w-8 h-8" />
                <span className="text-2xl font-bold">
                  {layoutState.timeOfDay === 'morning' ? 'Start the Day Right' :
                   layoutState.timeOfDay === 'afternoon' ? 'Let\'s Collaborate' :
                   layoutState.timeOfDay === 'evening' ? 'Evening Discussion' : 'Night Owl Chat'}
                </span>
                <Brain className="w-8 h-8" />
              </div>
            </a>
          </div>
          
          <div className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg inline-block">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              📍 {personalInfo.location} • AI-Enhanced Remote Collaboration
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIDynamicLayoutTemplate;