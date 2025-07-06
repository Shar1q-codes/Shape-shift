/**
 * Brutalist Template
 * 
 * This template implements a Brutalist design aesthetic with bold typography,
 * high contrast colors, geometric shapes, and intentionally harsh visual elements.
 * Features glitch effects, auto-rotating projects, and aggressive styling.
 */

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Square, Triangle, Circle } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const BrutalistTemplate: React.FC = () => {
  // State for glitch effect and active project rotation
  const [glitchText, setGlitchText] = useState(personalInfo.name);
  const [activeProject, setActiveProject] = useState(0);

  /**
   * Glitch effect for name display
   * Randomly replaces characters with glitch symbols
   */
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const originalText = personalInfo.name;
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        // Create glitched version of the name
        const glitched = originalText
          .split('')
          .map(char => Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('');
        setGlitchText(glitched);
        
        // Restore original text after brief glitch
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, []);

  /**
   * Auto-rotate projects for dynamic display
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-white text-black font-mono overflow-x-hidden">
      {/* Brutal Header with geometric background elements */}
      <header className="relative border-b-8 border-black bg-yellow-400">
        {/* Geometric shapes background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-red-500 transform rotate-45"></div>
          <div className="absolute top-8 right-8 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-4 left-1/4 w-0 h-0 border-l-4 sm:border-l-6 md:border-l-8 border-r-4 sm:border-r-6 md:border-r-8 border-b-8 sm:border-b-12 md:border-b-16 border-l-transparent border-r-transparent border-b-green-500"></div>
          <div className="absolute bottom-8 right-1/3 w-10 sm:w-16 md:w-20 h-4 sm:h-6 md:h-8 bg-purple-500"></div>
        </div>

        <div className="relative z-10 max-w-none px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          {/* Brutal Typography */}
          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4 transform -skew-x-6 sm:-skew-x-12 text-black drop-shadow-[4px_4px_0px_#ff0000] sm:drop-shadow-[6px_6px_0px_#ff0000] md:drop-shadow-[8px_8px_0px_#ff0000]">
              {glitchText}
            </h1>
            <div className="bg-black text-yellow-400 inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 transform skew-x-6 sm:skew-x-12 border-2 sm:border-3 md:border-4 border-red-500">
              <p className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider">{personalInfo.title}</p>
            </div>
            <div className="mt-4 bg-red-500 text-white inline-block px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 transform -rotate-2">
              <p className="text-sm sm:text-base md:text-lg font-bold uppercase">{personalInfo.education}</p>
            </div>
          </div>

          {/* Brutal Contact Buttons */}
          <div className="flex justify-center flex-wrap gap-4">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="group bg-black text-yellow-400 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 sm:border-3 md:border-4 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-100 transform hover:scale-110 hover:rotate-1 mb-2 sm:mb-0"
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="font-bold uppercase tracking-wider text-sm sm:text-base md:text-lg">EMAIL</span>
              </div>
            </a>
            <a 
              href={`https://${personalInfo.linkedin}`}
              className="group bg-blue-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 sm:border-3 md:border-4 border-black hover:bg-white hover:text-blue-500 transition-all duration-100 transform hover:scale-110 hover:-rotate-1 mb-2 sm:mb-0"
            >
              <div className="flex items-center space-x-2">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="font-bold uppercase tracking-wider text-sm sm:text-base md:text-lg">LINKEDIN</span>
              </div>
            </a>
            <a 
              href={`https://${personalInfo.github}`}
              className="group bg-red-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 sm:border-3 md:border-4 border-black hover:bg-white hover:text-red-500 transition-all duration-100 transform hover:scale-110 hover:rotate-1"
            >
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="font-bold uppercase tracking-wider text-sm sm:text-base md:text-lg">GITHUB</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Brutal About Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-red-500 text-white border-b-4 sm:border-b-6 md:border-b-8 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-4 sm:mb-6 md:mb-8 transform -skew-y-2 text-yellow-400 drop-shadow-[2px_2px_0px_#000000] sm:drop-shadow-[3px_3px_0px_#000000] md:drop-shadow-[4px_4px_0px_#000000]">
                ABOUT
              </h2>
              <div className="bg-black p-4 sm:p-6 md:p-8 border-2 sm:border-3 md:border-4 border-yellow-400 transform rotate-1">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed font-bold">
                  {personalInfo.bio}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {/* Brutal Stats */}
              <div className="bg-yellow-400 text-black p-3 sm:p-4 md:p-6 border-2 sm:border-3 md:border-4 border-black transform -rotate-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black">4+ YEARS</div>
                <div className="text-sm sm:text-base md:text-lg font-bold uppercase">EXPERIENCE</div>
              </div>
              <div className="bg-blue-500 text-white p-3 sm:p-4 md:p-6 border-2 sm:border-3 md:border-4 border-black transform rotate-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black">50+ PROJECTS</div>
                <div className="text-sm sm:text-base md:text-lg font-bold uppercase">COMPLETED</div>
              </div>
              <div className="bg-green-500 text-black p-3 sm:p-4 md:p-6 border-2 sm:border-3 md:border-4 border-black transform -rotate-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black">∞ IDEAS</div>
                <div className="text-sm sm:text-base md:text-lg font-bold uppercase">GENERATED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brutal Projects Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-black text-white border-b-4 sm:border-b-6 md:border-b-8 border-red-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-6 sm:mb-8 md:mb-12 text-center transform skew-x-6 sm:skew-x-12 text-yellow-400 drop-shadow-[3px_3px_0px_#ff0000] sm:drop-shadow-[4px_4px_0px_#ff0000] md:drop-shadow-[6px_6px_0px_#ff0000]">
            PROJECTS
          </h2>
          
          {/* Featured Project Display */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="bg-yellow-400 text-black p-4 sm:p-6 md:p-8 border-4 sm:border-6 md:border-8 border-red-500 transform -rotate-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="aspect-video bg-black border-2 sm:border-3 md:border-4 border-white overflow-hidden mb-2 sm:mb-3 md:mb-4">
                    <img
                      src={projects[activeProject].image}
                      alt={projects[activeProject].title}
                      className="w-full h-full object-cover filter contrast-150 saturate-150"
                    />
                  </div>
                  <div className="flex space-x-2">
                    {projects[activeProject].link && (
                      <a 
                        href={projects[activeProject].link}
                        className="bg-red-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border-1 sm:border-1.5 md:border-2 border-black hover:bg-white hover:text-red-500 transition-all duration-100 transform hover:scale-110"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      </a>
                    )}
                    {projects[activeProject].github && (
                      <a 
                        href={projects[activeProject].github}
                        className="bg-blue-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border-1 sm:border-1.5 md:border-2 border-black hover:bg-white hover:text-blue-500 transition-all duration-100 transform hover:scale-110"
                      >
                        <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-2 sm:mb-3 md:mb-4 transform -skew-x-6 sm:-skew-x-12">
                    {projects[activeProject].title}
                  </h3>
                  <div className="bg-black text-yellow-400 p-2 sm:p-3 md:p-4 border-2 sm:border-3 md:border-4 border-red-500 mb-2 sm:mb-3 md:mb-4">
                    <p className="text-sm sm:text-base md:text-lg font-bold">
                      {projects[activeProject].description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeProject].tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-red-500 text-white px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-0.75 md:py-1 border-1 sm:border-1.5 md:border-2 border-black font-bold uppercase text-xs sm:text-sm transform rotate-1"
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
                className={`w-8 h-8 border-4 border-white transform rotate-45 transition-all duration-100 hover:scale-125 ${
                  activeProject === index 
                    ? 'bg-yellow-400' 
                    : 'bg-red-500 hover:bg-yellow-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brutal Skills Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-blue-500 text-white border-b-4 sm:border-b-6 md:border-b-8 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-6 sm:mb-8 md:mb-12 text-center transform -skew-y-2 text-yellow-400 drop-shadow-[3px_3px_0px_#000000] sm:drop-shadow-[4px_4px_0px_#000000] md:drop-shadow-[6px_6px_0px_#000000]">
            SKILLS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div 
                key={category}
                className={`p-4 sm:p-6 md:p-8 border-4 sm:border-6 md:border-8 border-black transform ${
                  index % 3 === 0 ? 'rotate-1 bg-yellow-400 text-black' :
                  index % 3 === 1 ? '-rotate-1 bg-red-500 text-white' :
                  'rotate-2 bg-green-500 text-black'
                }`}
              >
                <h3 className="text-xl sm:text-xl md:text-2xl font-black uppercase mb-3 sm:mb-4 md:mb-6 text-center transform -skew-x-6 sm:-skew-x-12">
                  {category.replace('-', ' ')}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold uppercase text-xs sm:text-sm">{skill.name}</span>
                        <span className="font-black text-sm sm:text-base md:text-lg">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-black h-2 sm:h-3 md:h-4 border-1 sm:border-1.5 md:border-2 border-current">
                        <div
                          className="bg-current h-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brutal Contact Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-yellow-400 text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-4 sm:mb-6 md:mb-8 transform skew-x-6 sm:skew-x-12 text-red-500 drop-shadow-[3px_3px_0px_#000000] sm:drop-shadow-[4px_4px_0px_#000000] md:drop-shadow-[6px_6px_0px_#000000]">
            CONTACT
          </h2>
          
          <div className="bg-black text-yellow-400 p-6 sm:p-8 md:p-12 border-4 sm:border-6 md:border-8 border-red-500 transform -rotate-1 mb-4 sm:mb-6 md:mb-8">
            <p className="text-xl sm:text-xl md:text-2xl font-bold uppercase mb-4 sm:mb-6 md:mb-8 leading-tight">
              READY TO BUILD SOMETHING BRUTAL?<br />
              LET'S MAKE IT HAPPEN!
            </p>
            
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-block bg-red-500 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 border-2 sm:border-3 md:border-4 border-yellow-400 hover:bg-yellow-400 hover:text-red-500 transition-all duration-100 transform hover:scale-110 hover:rotate-2"
            >
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider">CONTACT NOW</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              </div>
            </a>
          </div>
          
          <div className="bg-red-500 text-white p-3 sm:p-4 md:p-6 border-2 sm:border-3 md:border-4 border-black transform rotate-1 inline-block">
            <p className="font-bold uppercase text-sm sm:text-base md:text-lg">
              📍 {personalInfo.location}
            </p>
          </div>
        </div>
      </section>

      {/* Brutal Footer */}
      <footer className="bg-black text-white py-4 sm:py-6 md:py-8 border-t-4 sm:border-t-6 md:border-t-8 border-red-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-2 sm:mb-3 md:mb-4">
            <Square className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
            <Triangle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-500" />
            <Circle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500" />
          </div>
          <p className="font-bold uppercase tracking-wider text-sm sm:text-base md:text-lg">
            © 2024 {personalInfo.name.toUpperCase()} - BRUTALLY HONEST DEVELOPMENT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BrutalistTemplate;