/**
 * Cyberpunk Template
 * 
 * This template implements a cyberpunk aesthetic with neon colors, glitch effects,
 * matrix rain animation, scanlines, and futuristic UI elements. Features
 * holographic frames, cyber-themed styling, and animated background effects.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Zap, Shield, Cpu, Database, Terminal, Eye, Lock, Wifi } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const CyberpunkTemplate: React.FC = () => {
  // State for various cyberpunk effects
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [matrixRain, setMatrixRain] = useState<string[]>([]);
  const [activeProject, setActiveProject] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Glitch effect activation
   * Randomly triggers glitch visual effects
   */
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  /**
   * Scanline animation effect
   * Creates moving scanlines across the screen
   */
  useEffect(() => {
    const scanlineInterval = setInterval(() => {
      setScanlinePosition(prev => (prev + 2) % 100);
    }, 50);

    return () => clearInterval(scanlineInterval);
  }, []);

  /**
   * Matrix rain effect
   * Generates falling character matrix animation
   */
  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = 50;
    
    const generateRain = () => {
      const rain = Array(columns).fill(0).map(() => 
        Array(20).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
      );
      setMatrixRain(rain);
    };

    generateRain();
    const rainInterval = setInterval(generateRain, 100);

    return () => clearInterval(rainInterval);
  }, []);

  /**
   * Auto-rotate projects for dynamic display
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  /**
   * Get appropriate icon for skill category
   */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Eye className="w-6 h-6" />;
      case 'backend': return <Cpu className="w-6 h-6" />;
      case 'database': return <Database className="w-6 h-6" />;
      case 'tools': return <Terminal className="w-6 h-6" />;
      case 'data-science': return <Shield className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="grid grid-cols-50 gap-0 h-full text-xs leading-none">
          {matrixRain.map((column, index) => (
            <div key={index} className="flex flex-col text-green-400 animate-pulse">
              {column.split('').map((char, charIndex) => (
                <span key={charIndex} className="opacity-70">{char}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scanline Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, transparent ${scanlinePosition}%, rgba(0, 255, 255, 0.1) ${scanlinePosition + 1}%, transparent ${scanlinePosition + 2}%)`
        }}
      />

      {/* Glitch Overlay */}
      {glitchActive && (
        <div className="fixed inset-0 pointer-events-none z-20 bg-red-500 opacity-20 animate-pulse" />
      )}

      {/* Cyberpunk Header */}
      <header className="relative z-30 border-b border-cyan-500 bg-black/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Holographic Grid Background - Responsive */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 grid-rows-4 sm:grid-rows-6 md:grid-rows-8 h-full">
              {Array(32).fill(0).map((_, i) => (
                <div key={i} className="border border-cyan-500/30"></div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-center">
            {/* Cyberpunk Avatar with holographic frame */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto relative">
                {/* Holographic frame */}
                <div className="absolute inset-0 border-4 border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm">
                  <div className="absolute inset-2 border-2 border-purple-400 bg-black/50 flex items-center justify-center">
                    <span className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                {/* Corner brackets */}
                <div className="absolute -top-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 sm:border-l-3 md:border-l-4 border-t-2 sm:border-t-3 md:border-t-4 border-cyan-400"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 sm:border-r-3 md:border-r-4 border-t-2 sm:border-t-3 md:border-t-4 border-cyan-400"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 sm:border-l-3 md:border-l-4 border-b-2 sm:border-b-3 md:border-b-4 border-cyan-400"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 sm:border-r-3 md:border-r-4 border-b-2 sm:border-b-3 md:border-b-4 border-cyan-400"></div>
                
                {/* Scanning line */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-full h-1 bg-cyan-400 opacity-80 animate-pulse" style={{ top: `${scanlinePosition}%` }}></div>
                </div>
              </div>
            </div>

            {/* Glitch Name Effect */}
            <div className="mb-8">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${glitchActive ? 'animate-pulse text-red-400' : 'text-cyan-400'} transition-all duration-150`}>
                <span className="relative">
                  {personalInfo.name.toUpperCase()}
                  {glitchActive && (
                    <span className="absolute inset-0 text-red-400 transform translate-x-1 opacity-70">
                      {personalInfo.name.toUpperCase().split('').map((char, i) => 
                        Math.random() > 0.7 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char
                      ).join('')}
                    </span>
                  )}
                </span>
              </h1>
              
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 sm:p-3 md:p-4 border border-cyan-400 mb-2 sm:mb-3 md:mb-4">
                <p className="text-base sm:text-lg md:text-xl font-bold text-black uppercase tracking-wider">{personalInfo.title}</p>
              </div>
              
              <div className="border border-purple-400 bg-purple-900/30 p-2 sm:p-2.5 md:p-3 inline-block">
                <p className="text-purple-300 uppercase tracking-wide">{personalInfo.education}</p>
              </div>
            </div>

            {/* Cyberpunk Contact Buttons */}
            <div className="flex justify-center space-x-6 flex-wrap">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-8 py-4 border-2 border-cyan-400 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Mail className="w-6 h-6" />
                  <span className="font-bold uppercase tracking-wider">CONNECT</span>
                </div>
              </a>
              
              <a 
                href={`https://${personalInfo.linkedin}`}
                className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 border-2 border-purple-400 hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Linkedin className="w-6 h-6" />
                  <span className="font-bold uppercase tracking-wider">NETWORK</span>
                </div>
              </a>
              
              <a 
                href={`https://${personalInfo.github}`}
                className="group relative bg-gradient-to-r from-green-500 to-teal-500 text-black px-8 py-4 border-2 border-green-400 hover:from-green-400 hover:to-teal-400 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Github className="w-6 h-6" />
                  <span className="font-bold uppercase tracking-wider">SOURCE</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="relative z-30 py-16 border-b border-cyan-500/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-cyan-400 uppercase tracking-wider">
                <span className="border-b-4 border-purple-500">PROFILE</span>
              </h2>
              <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 p-4 sm:p-6 md:p-8 border-l-2 sm:border-l-3 md:border-l-4 border-cyan-400 backdrop-blur-sm">
                <p className="text-base sm:text-base md:text-lg leading-relaxed text-cyan-100">
                  {personalInfo.bio}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Cyberpunk Stats */}
              <div className="bg-black/70 border border-cyan-400 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-transparent"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-cyan-400">4+</div>
                    <div className="text-cyan-300 uppercase text-sm tracking-wider">YEARS ONLINE</div>
                  </div>
                  <Zap className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              
              <div className="bg-black/70 border border-purple-400 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-400">50+</div>
                    <div className="text-purple-300 uppercase text-sm tracking-wider">SYSTEMS HACKED</div>
                  </div>
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-black/70 border border-green-400 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/20 to-transparent"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-400">∞</div>
                    <div className="text-green-300 uppercase text-sm tracking-wider">DATA STREAMS</div>
                  </div>
                  <Wifi className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-30 py-16 border-b border-cyan-500/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-cyan-400 uppercase tracking-wider">
            <span className="border-b-4 border-purple-500">DIGITAL ARTIFACTS</span>
          </h2>
          
          {/* Featured Project Display */}
          <div className="mb-12">
            <div className="bg-black/80 border-2 border-cyan-400 p-8 relative overflow-hidden">
              {/* Holographic corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="aspect-video bg-black border-2 border-purple-400 overflow-hidden relative">
                    <img
                      src={projects[activeProject].image}
                      alt={projects[activeProject].title}
                      className="w-full h-full object-cover opacity-80 filter contrast-125 saturate-150"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
                    
                    {/* Scanning overlay */}
                    <div className="absolute inset-0">
                      <div className="absolute w-full h-0.5 bg-cyan-400 opacity-60 animate-pulse" style={{ top: `${(scanlinePosition * 2) % 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    {projects[activeProject].link && (
                      <a 
                        href={projects[activeProject].link}
                        className="bg-cyan-500 text-black px-4 py-2 border border-cyan-400 hover:bg-cyan-400 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="font-bold uppercase text-xs">ACCESS</span>
                      </a>
                    )}
                    {projects[activeProject].github && (
                      <a 
                        href={projects[activeProject].github}
                        className="bg-purple-500 text-white px-4 py-2 border border-purple-400 hover:bg-purple-400 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span className="font-bold uppercase text-xs">SOURCE</span>
                      </a>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-4xl font-bold mb-4 text-cyan-400 uppercase tracking-wider">
                    {projects[activeProject].title}
                  </h3>
                  <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-6 border-l-4 border-purple-400 mb-6">
                    <p className="text-lg text-cyan-100 leading-relaxed">
                      {projects[activeProject].description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeProject].tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-black border border-cyan-400 text-cyan-400 px-3 py-1 font-bold uppercase text-xs tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Navigation */}
          <div className="flex justify-center space-x-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`w-4 h-4 border-2 transition-all duration-200 hover:scale-125 ${
                  activeProject === index 
                    ? 'bg-cyan-400 border-cyan-400' 
                    : 'border-cyan-400 hover:bg-cyan-400/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-30 py-16 border-b border-cyan-500/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-cyan-400 uppercase tracking-wider">
            <span className="border-b-4 border-purple-500">NEURAL NETWORKS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div 
                key={category}
                className="bg-black/80 border-2 border-cyan-400 p-8 relative overflow-hidden hover:border-purple-400 transition-all duration-300 group"
              >
                {/* Holographic effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 border-2 border-cyan-400 bg-black flex items-center justify-center text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                      {getCategoryIcon(category)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-cyan-400 mb-6 uppercase tracking-wider text-center group-hover:text-purple-400 transition-colors duration-300">
                    {category.replace('-', '_')}
                  </h3>
                  
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-cyan-300 font-medium uppercase text-sm tracking-wide">{skill.name}</span>
                          <span className="text-cyan-400 font-bold text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-black border border-cyan-400 h-2 relative overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full transition-all duration-500 relative"
                            style={{ width: `${skill.level}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-30 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-cyan-400 uppercase tracking-wider">
            <span className="border-b-4 border-purple-500">ESTABLISH CONNECTION</span>
          </h2>
          
          <div className="bg-black/80 border-2 border-cyan-400 p-6 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Holographic corners */}
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-l-2 sm:border-l-3 md:border-l-4 border-t-2 sm:border-t-3 md:border-t-4 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-r-2 sm:border-r-3 md:border-r-4 border-t-2 sm:border-t-3 md:border-t-4 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-l-2 sm:border-l-3 md:border-l-4 border-b-2 sm:border-b-3 md:border-b-4 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-r-2 sm:border-r-3 md:border-r-4 border-b-2 sm:border-b-3 md:border-b-4 border-cyan-400"></div>
            
            <div className="relative z-10">
              <p className="text-xl sm:text-xl md:text-2xl font-bold uppercase mb-4 sm:mb-6 md:mb-8 leading-tight text-cyan-100">
                READY TO JACK INTO THE MATRIX?<br />
                <span className="text-purple-400">LET'S BUILD THE FUTURE</span>
              </p>
              
              <a 
                href={`mailto:${personalInfo.email}`}
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 border-2 border-cyan-400 hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider">INITIATE CONTACT</span>
                  <Terminal className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </div>
              </a>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 md:mt-8 bg-purple-900/30 border border-purple-400 p-3 sm:p-4 md:p-6 inline-block">
            <p className="font-bold uppercase text-purple-300 tracking-wider text-sm sm:text-base md:text-lg">
              📍 LOCATION: {personalInfo.location}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-30 bg-black border-t-2 border-cyan-400 py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 text-center">
          <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-2 sm:mb-3 md:mb-4">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-cyan-400 animate-pulse" />
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-400 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <p className="font-bold uppercase tracking-wider text-cyan-400 text-sm sm:text-base md:text-lg">
            © 2024 {personalInfo.name.toUpperCase()} - CYBERNETIC DEVELOPMENT SYSTEMS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CyberpunkTemplate;