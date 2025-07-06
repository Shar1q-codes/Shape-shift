/**
 * Liquid Interface Template
 * 
 * This template implements a fluid, liquid-like interface with morphing shapes,
 * ripple effects, and flowing transitions. Features SVG filters for distortion,
 * animated blobs, and interactive ripple effects on user interaction.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Waves, Droplets, Zap, Star, Circle } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const LiquidInterfaceTemplate: React.FC = () => {
  // State for mouse tracking and liquid effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([]);
  const [filterIntensity, setFilterIntensity] = useState(0.002);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  /**
   * Track mouse movement for liquid distortion
   * Adjusts filter intensity based on mouse movement speed
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
        
        // Adjust filter intensity based on mouse movement speed
        const intensity = Math.min(0.008, 0.002 + Math.abs(e.movementX + e.movementY) * 0.0001);
        setFilterIntensity(intensity);
      }
    };

    /**
     * Create ripple effect on click
     */
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Create ripple effect on click
        const newRipple = {
          id: rippleIdRef.current++,
          x,
          y,
          timestamp: Date.now()
        };
        
        setRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 2000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('click', handleClick);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('click', handleClick);
      };
    }
  }, []);

  /**
   * Auto-reduce filter intensity when mouse stops moving
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilterIntensity(0.002);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [mousePosition]);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 text-gray-900 dark:text-white relative overflow-hidden"
    >
      {/* SVG Filters for Liquid Effects */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          {/* Main liquid distortion filter */}
          <filter id="liquidDistortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency={filterIntensity}
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
          
          {/* Ripple effect filter */}
          <filter id="rippleEffect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency="0.01"
              numOctaves="2"
              result="rippleNoise"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="rippleNoise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="B"
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large flowing blob */}
        <div 
          className="absolute w-96 h-96 opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            left: `${20 + mousePosition.x * 0.1}%`,
            top: `${10 + mousePosition.y * 0.1}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out',
            filter: 'url(#liquidDistortion)'
          }}
        />
        
        {/* Medium flowing blob */}
        <div 
          className="absolute w-80 h-80 opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
            borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
            right: `${15 + mousePosition.x * 0.08}%`,
            top: `${30 + mousePosition.y * 0.12}%`,
            transform: 'translate(50%, -50%)',
            transition: 'all 0.4s ease-out',
            filter: 'url(#liquidDistortion)'
          }}
        />
        
        {/* Small flowing blob */}
        <div 
          className="absolute w-64 h-64 opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)',
            borderRadius: '30% 70% 40% 60% / 70% 30% 60% 40%',
            left: `${60 + mousePosition.x * 0.06}%`,
            bottom: `${20 + mousePosition.y * 0.08}%`,
            transform: 'translate(-50%, 50%)',
            transition: 'all 0.5s ease-out',
            filter: 'url(#liquidDistortion)'
          }}
        />
      </div>

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        >
          <div 
            className="w-4 h-4 border-2 border-blue-400 rounded-full animate-ping"
            style={{
              animationDuration: '2s',
              animationTimingFunction: 'ease-out'
            }}
          />
          <div 
            className="absolute inset-0 w-4 h-4 border border-purple-400 rounded-full animate-ping"
            style={{
              animationDuration: '2s',
              animationDelay: '0.3s',
              animationTimingFunction: 'ease-out'
            }}
          />
        </div>
      ))}

      {/* Main Content with Liquid Filter */}
      <div 
        className="relative z-10"
        style={{ 
          filter: 'url(#liquidDistortion)',
          transition: 'filter 0.1s ease-out'
        }}
      >
        {/* Header */}
        <header className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Liquid Avatar */}
            <div className="mb-12 relative">
              <div 
                className="w-48 h-48 mx-auto relative"
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
                  <span className="text-5xl font-bold">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                {/* Floating liquid particles */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-400 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '2s' }} />
              </div>
            </div>

            {/* Flowing Text */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </h1>
              
              {/* Liquid title container */}
              <div 
                className="relative inline-block mb-4 p-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm"
                style={{
                  borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
                  filter: 'url(#liquidGlow)'
                }}
              >
                <p className="text-2xl text-gray-700 dark:text-gray-300 font-medium">{personalInfo.title}</p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">{personalInfo.education}</p>
            </div>

            {/* Liquid Contact Buttons */}
            <div className="flex justify-center space-x-6 flex-wrap">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group relative overflow-hidden"
                style={{ filter: 'url(#liquidGlow)' }}
              >
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex items-center space-x-2"
                  style={{
                    borderRadius: '50% 20% 50% 20% / 30% 50% 30% 50%',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <Mail className="w-6 h-6" />
                  <span className="font-semibold">Email</span>
                </div>
              </a>

              <a 
                href={`https://${personalInfo.linkedin}`}
                className="group relative overflow-hidden"
                style={{ filter: 'url(#liquidGlow)' }}
              >
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex items-center space-x-2"
                  style={{
                    borderRadius: '20% 50% 20% 50% / 50% 30% 50% 30%',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="font-semibold">Connect</span>
                </div>
              </a>

              <a 
                href={`https://${personalInfo.github}`}
                className="group relative overflow-hidden"
                style={{ filter: 'url(#liquidGlow)' }}
              >
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex items-center space-x-2"
                  style={{
                    borderRadius: '30% 70% 40% 60% / 40% 60% 30% 70%',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <Github className="w-6 h-6" />
                  <span className="font-semibold">Code</span>
                </div>
              </a>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Me
              </h2>
              
              {/* Liquid bio container */}
              <div 
                className="relative p-8 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-blue-900/80 backdrop-blur-sm shadow-xl"
                style={{
                  borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
                  filter: 'url(#liquidGlow)'
                }}
              >
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {personalInfo.bio}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Liquid stat bubbles */}
              <div 
                className="relative p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl"
                style={{
                  borderRadius: '60% 40% 50% 50% / 40% 60% 30% 70%',
                  filter: 'url(#liquidGlow)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold">4+</div>
                    <div className="text-blue-100">Years Experience</div>
                  </div>
                  <Zap className="w-12 h-12 text-blue-200" />
                </div>
              </div>

              <div 
                className="relative p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl ml-8"
                style={{
                  borderRadius: '30% 70% 40% 60% / 70% 30% 60% 40%',
                  filter: 'url(#liquidGlow)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold">50+</div>
                    <div className="text-purple-100">Projects</div>
                  </div>
                  <Star className="w-12 h-12 text-purple-200" />
                </div>
              </div>

              <div 
                className="relative p-6 bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-xl"
                style={{
                  borderRadius: '50% 50% 30% 70% / 30% 70% 50% 50%',
                  filter: 'url(#liquidGlow)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold">∞</div>
                    <div className="text-indigo-100">Possibilities</div>
                  </div>
                  <Waves className="w-12 h-12 text-indigo-200" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Liquid Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fluid solutions that adapt and flow with user needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="relative group"
                style={{
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                  transformOrigin: 'center'
                }}
              >
                {/* Liquid project container */}
                <div 
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 shadow-xl group-hover:scale-105 transition-all duration-500"
                  style={{ 
                    borderRadius: '2rem',
                    filter: 'url(#liquidGlow)' 
                  }} 
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{
                        filter: 'url(#rippleEffect)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-3 py-1 text-sm font-medium capitalize"
                        style={{
                          borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%'
                        }}
                      >
                        {project.category}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={tech} 
                          className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm font-medium"
                          style={{
                            borderRadius: `${30 + techIndex * 10}% ${70 - techIndex * 5}% ${40 + techIndex * 8}% ${60 - techIndex * 3}% / ${50 + techIndex * 5}% ${40 - techIndex * 2}% ${60 + techIndex * 4}% ${50 - techIndex * 6}%`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project links */}
                    <div className="flex space-x-4">
                      {project.link && (
                        <a 
                          href={project.link} 
                          className="group/btn relative"
                          style={{ filter: 'url(#liquidGlow)' }} 
                        >
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 group-hover/btn:scale-110 transition-all duration-300 flex items-center space-x-2"
                            style={{ 
                              borderRadius: '1rem'
                            }} 
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="font-semibold">View</span>
                          </div>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github} 
                          className="group/btn relative"
                          style={{ filter: 'url(#liquidGlow)' }} 
                        >
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 group-hover/btn:scale-110 transition-all duration-300 flex items-center space-x-2"
                            style={{ 
                              borderRadius: '1rem'
                            }} 
                          >
                            <Github className="w-4 h-4" />
                            <span className="font-semibold">Code</span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fluid Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Adaptable expertise that flows across technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div 
                key={category} 
                className="relative group"
              >
                {/* Liquid skill container */}
                <div 
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 shadow-xl group-hover:scale-105 transition-all duration-500"
                  style={{ 
                    borderRadius: '2rem',
                    filter: 'url(#liquidGlow)' 
                  }} 
                >
                  <div className="text-center mb-6">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center shadow-lg"
                      style={{
                        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                      }}
                    >
                      {index === 0 && <Waves className="w-8 h-8" />}
                      {index === 1 && <Droplets className="w-8 h-8" />}
                      {index === 2 && <Circle className="w-8 h-8" />}
                      {index === 3 && <Zap className="w-8 h-8" />}
                      {index === 4 && <Star className="w-8 h-8" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white capitalize">
                      {category.replace('-', ' ')}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        
                        {/* Liquid progress bar */}
                        <div 
                          className="relative h-3 bg-gray-200 dark:bg-gray-700 overflow-hidden"
                          style={{ 
                            borderRadius: '1rem'
                          }} 
                        >
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000 relative overflow-hidden"
                            style={{  
                              width: `${skill.level}%`, 
                              borderRadius: '1rem'
                            }} 
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Flow Together
            </h2>
            
            {/* Liquid contact container */}
            <div 
              className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-12 shadow-2xl"
              style={{
                borderRadius: '2rem',
                filter: 'url(#liquidGlow)'
              }}
            >
              <p className="text-2xl font-bold mb-8 leading-tight text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
                Ready to create something fluid and dynamic?<br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Let's make waves together.</span>
              </p>
              
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group relative inline-block"
                style={{ filter: 'url(#liquidGlow)' }} 
              >
                <div 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-12 py-6 group-hover:scale-110 transition-all duration-300 shadow-xl"
                  style={{
                    borderRadius: '50% 20% 50% 20% / 30% 50% 30% 50%'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <Mail className="w-8 h-8" />
                    <span className="text-2xl font-bold">Start the Flow</span>
                    <Waves className="w-8 h-8" />
                  </div>
                </div>
              </a>
            </div>
            
            <div 
              className="mt-8 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-800 to-blue-900 p-6 shadow-lg inline-block"
              style={{
                borderRadius: '1rem'
              }}
            >
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                📍 {personalInfo.location}
              </p>
            </div>
          </div>
        </section>
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
};

export default LiquidInterfaceTemplate;