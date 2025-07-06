/**
 * Typographic Template
 * 
 * This template implements a typography-focused design with emphasis on
 * font hierarchies, text layouts, and minimal visual elements. Features
 * typewriter effect, quote rotation, and text-based navigation.
 */

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Type, Quote, BookOpen, Pen, Hash, AtSign } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const TypographicTemplate: React.FC = () => {
  // State for typography effects
  const [currentQuote, setCurrentQuote] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Inspirational typography quotes
  const quotes = [
    "Typography is the craft of endowing human language with a durable visual form.",
    "Good typography is invisible. Great typography is unforgettable.",
    "Typography is what language looks like.",
    "The details are not the details. They make the design."
  ];

  /**
   * Typewriter effect for title
   * Gradually types out the title text
   */
  useEffect(() => {
    const fullText = personalInfo.title;
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  /**
   * Quote rotation
   * Cycles through typography quotes
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Typographic Header */}
      <header className="max-w-4xl mx-auto px-6 pt-20 sm:pt-16 md:pt-20 pb-20">
        <div className="text-center space-y-8">
          {/* Large Display Name - Responsive */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
              <span className="block text-gray-900 dark:text-white">
                {personalInfo.name.split(' ')[0].toUpperCase()}
              </span>
              <span className="block text-gray-400 dark:text-gray-600 -mt-4">
                {personalInfo.name.split(' ')[1].toUpperCase()}
              </span>
            </h1>
          </div>

          {/* Typewriter Title - Fixed height for stability */}
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-600 dark:text-gray-400">
              {typewriterText}
              {isTyping && <span className="animate-pulse">|</span>}
            </h2>
          </div>

          {/* Education with Typography Focus - Responsive */}
          <div className="space-y-2">
            <p className="text-lg font-medium tracking-wider uppercase text-gray-500 dark:text-gray-500">
              {personalInfo.education}
            </p>
            <div className="w-24 h-px bg-gray-900 dark:bg-white mx-auto"></div>
          </div>

          {/* Contact Links as Typography - Responsive */}
          <div className="space-y-4 pt-8">
            <div className="flex justify-center space-x-8 text-sm uppercase tracking-widest">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Email
                </span>
                <div className="absolute inset-0 bg-gray-900 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <a 
                href={`https://${personalInfo.linkedin}`}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-gray-900">
                  LinkedIn
                </span>
                <div className="absolute inset-0 bg-gray-900 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <a 
                href={`https://${personalInfo.github}`}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-gray-900">
                  GitHub
                </span>
                <div className="absolute inset-0 bg-gray-900 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Quote Section */}
      <section className="border-t border-b border-gray-200 dark:border-gray-800 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <Quote className="w-12 h-12 mx-auto mb-8 text-gray-400 dark:text-gray-600" />
            <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-gray-700 dark:text-gray-300 italic">
              "{quotes[currentQuote]}"
            </blockquote>
            <div className="flex justify-center space-x-2 mt-8">
              {quotes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentQuote === index ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Typography Focus */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8">
            {/* Large "ABOUT" text - Responsive rotation */}
            <div className="col-span-12 md:col-span-3 flex justify-center md:block">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-gray-100 dark:text-gray-800 md:transform md:-rotate-90 origin-center md:sticky md:top-20">
                ABOUT
              </h2>
            </div>
             
            {/* Content */}
            <div className="col-span-12 md:col-span-9 space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                  {personalInfo.bio}
                </p>
              </div>
              
              {/* Stats as Typography - Responsive */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="text-center">
                  <div className="text-5xl font-black text-gray-900 dark:text-white">04</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-500 mt-2">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-gray-900 dark:text-white">50</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-500 mt-2">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-gray-900 dark:text-white">∞</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-500 mt-2">
                    Ideas Generated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">
              WORK 
            </h2>
            <p className="text-xl font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Selected projects that showcase the intersection of technology and design
            </p>
          </div>
          
          <div className="space-y-20">
            {projects.map((project, index) => (
              <article key={project.id} className="group">
                <div className="grid grid-cols-12 gap-8 items-center">
                  {/* Project Number - Responsive */}
                  <div className="col-span-12 md:col-span-2">
                    <div className="text-8xl font-black text-gray-200 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  {/* Project Image */}
                  <div className="col-span-12 md:col-span-5 mb-4 md:mb-0">
                    <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="col-span-12 md:col-span-5 space-y-4 sm:space-y-5 md:space-y-6">
                    <div>
                      <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
                        {project.category} Project
                      </div>
                    </div>
                    
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack as Typography */}
                    <div className="space-y-2">
                      <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-500">
                        Technology Stack
                      </div>
                      <div className="flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1">
                        {project.tech.map((tech, techIndex) => (
                          <span key={tech} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {tech}
                            {techIndex < project.tech.length - 1 && <span className="text-gray-400 dark:text-gray-600 ml-4">•</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Links */}
                    <div className="flex space-x-4 sm:space-x-5 md:space-x-6 pt-4">
                      {project.link && (
                        <a 
                          href={project.link}
                          className="group/link relative overflow-hidden"
                        >
                          <span className="relative z-10 text-sm uppercase tracking-widest font-medium transition-colors duration-300 group-hover/link:text-white dark:group-hover/link:text-gray-900">
                            View Project
                          </span>
                          <div className="absolute inset-0 bg-gray-900 dark:bg-white transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github}
                          className="group/link relative overflow-hidden"
                        >
                          <span className="relative z-10 text-sm uppercase tracking-widest font-medium transition-colors duration-300 group-hover/link:text-white dark:group-hover/link:text-gray-900">
                            Source Code
                          </span>
                          <div className="absolute inset-0 bg-gray-900 dark:bg-white transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">
              SKILLS 
            </h2>
            <p className="text-xl font-light text-gray-600 dark:text-gray-400">
              Technical expertise across the full development spectrum
            </p>
          </div>
          
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0">
                <h3 className="text-xl sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 uppercase">
                  {category.replace('-', ' ')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Typographic Progress Bar */}
                      <div className="relative">
                        <div className="w-full h-px bg-gray-300 dark:bg-gray-700"></div>
                        <div 
                          className="absolute top-0 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                        
                        {/* Skill level markers */}
                        <div className="flex justify-between mt-1 text-xs text-gray-400 dark:text-gray-600">
                          <span>0</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-gray-900 dark:bg-white text-white dark:text-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter">
              LET'S TALK 
            </h2>
            
            <p className="text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              Ready to create something extraordinary together? 
              Let's start a conversation about your next project.
            </p>
            
            {/* Large Email Link */}
            <div className="pt-8">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="group inline-block"
              >
                <div className="text-3xl md:text-4xl font-light tracking-wide group-hover:tracking-widest transition-all duration-300 border-b-2 border-white dark:border-gray-900 group-hover:border-transparent">
                  {personalInfo.email}
                </div>
              </a>
            </div>
            
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-12 border-t border-gray-700 dark:border-gray-300">
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-4" />
                <div className="text-sm uppercase tracking-widest">Email</div>
                <div className="text-lg font-light mt-2">Direct Contact</div>
              </div>
              
              <div className="text-center">
                <Linkedin className="w-8 h-8 mx-auto mb-4" />
                <div className="text-sm uppercase tracking-widest">LinkedIn</div>
                <div className="text-lg font-light mt-2">Professional Network</div>
              </div>
              
              <div className="text-center">
                <Github className="w-8 h-8 mx-auto mb-4" />
                <div className="text-sm uppercase tracking-widest">GitHub</div>
                <div className="text-lg font-light mt-2">Code Repository</div>
              </div>
            </div>
            
            {/* Location */}
            <div className="pt-4 sm:pt-6 md:pt-8">
              <div className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600">
                Currently Located
              </div>
              <div className="text-xl font-light mt-2">
                {personalInfo.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 {personalInfo.name}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4">
              <Type className="w-5 h-5 text-gray-400 dark:text-gray-600" />
              <span className="text-sm text-gray-500 dark:text-gray-500">
                Typography-First Design
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TypographicTemplate;