/**
 * Organic Template
 * 
 * This template implements a nature-inspired design with organic shapes,
 * flowing curves, and natural color palettes. Features SVG-based morphing
 * shapes, floating animations, and smooth transitions.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Leaf, Flower, Sun, Moon, Star, Heart, Zap } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const OrganicTemplate: React.FC = () => {
  // State for mouse tracking and animations
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeBlob, setActiveBlob] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Track mouse movement for background effects
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  /**
   * Auto-rotate active blob for morphing effect
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBlob((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Define organic shape paths for SVG elements
  const organicShapes = [
    "M50,10 C80,10 90,40 90,50 C90,80 60,90 50,90 C20,90 10,60 10,50 C10,20 20,10 50,10 Z",
    "M50,5 C75,15 85,35 80,55 C75,75 55,85 35,80 C15,75 5,55 10,35 C15,15 35,5 50,5 Z",
    "M50,8 C70,8 85,25 88,45 C85,65 70,82 50,85 C30,82 15,65 12,45 C15,25 30,8 50,8 Z",
    "M50,12 C68,18 78,38 75,58 C68,78 48,85 28,78 C18,68 15,48 25,28 C35,18 45,12 50,12 Z",
    "M50,15 C65,20 75,35 72,50 C65,70 45,80 25,75 C20,65 18,45 30,30 C40,20 45,15 50,15 Z"
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 text-gray-800 dark:text-white relative overflow-hidden"
    >
      {/* Floating Organic Shapes Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large background blobs */}
        <div 
          className="absolute w-96 h-96 opacity-20"
          style={{
            left: `${20 + mousePosition.x * 0.1}%`,
            top: `${10 + mousePosition.y * 0.1}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d={organicShapes[0]}
              fill="url(#gradient1)"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div 
          className="absolute w-80 h-80 opacity-15"
          style={{
            right: `${15 + mousePosition.x * 0.08}%`,
            top: `${30 + mousePosition.y * 0.12}%`,
            transform: 'translate(50%, -50%)'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d={organicShapes[1]}
              fill="url(#gradient2)"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div 
          className="absolute w-64 h-64 opacity-25"
          style={{
            left: `${60 + mousePosition.x * 0.06}%`,
            bottom: `${20 + mousePosition.y * 0.08}%`,
            transform: 'translate(-50%, 50%)'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d={organicShapes[2]}
              fill="url(#gradient3)"
              className="animate-pulse"
              style={{ animationDelay: '2s' }}
            />
            <defs>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Small floating elements */}
        {Array(12).fill(0).map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 opacity-30"
            style={{
              left: `${10 + (i * 8) + Math.sin(i) * 10}%`,
              top: `${20 + (i * 6) + Math.cos(i) * 15}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d={organicShapes[i % organicShapes.length]}
                fill={`hsl(${120 + i * 30}, 70%, 60%)`}
                className="animate-pulse"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-20 sm:pt-16 md:pt-20 pb-20">
        <div className="text-center">
          {/* Organic Profile Container */}
          <div className="mb-12 relative">
            <div className="w-64 h-64 mx-auto relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d={organicShapes[activeBlob]}
                  fill="url(#profileGradient)"
                  className="transition-all duration-1000 ease-in-out"
                />
                <defs>
                  <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Profile content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <span className="text-2xl font-bold text-emerald-600">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-white font-semibold text-sm">
                    {personalInfo.name.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flowing Text */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            
            {/* Organic title container */}
            <div className="relative inline-block mb-4">
              <svg viewBox="0 0 400 80" className="w-96 h-20">
                <path
                  d="M20,40 C60,20 120,20 160,40 C200,60 260,60 300,40 C340,20 380,20 380,40 C380,60 340,60 300,60 C260,60 200,60 160,60 C120,60 60,60 20,60 C20,60 20,40 20,40 Z"
                  fill="url(#titleGradient)"
                  className="opacity-80"
                />
                <defs>
                  <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f0fdf4" />
                    <stop offset="100%" stopColor="#dcfce7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">{personalInfo.title}</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">{personalInfo.education}</p>
          </div>

          {/* Organic Contact Buttons */}
          <div className="flex justify-center space-x-6 flex-wrap">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="group relative overflow-hidden"
            >
              <svg viewBox="0 0 120 60" className="w-32 h-16">
                <path
                  d="M15,30 C15,15 25,10 40,10 L80,10 C95,10 105,15 105,30 C105,45 95,50 80,50 L40,50 C25,50 15,45 15,30 Z"
                  fill="url(#emailGradient)"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <defs>
                  <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Email</span>
                </div>
              </div>
            </a>

            <a 
              href={`https://${personalInfo.linkedin}`}
              className="group relative overflow-hidden"
            >
              <svg viewBox="0 0 120 60" className="w-32 h-16">
                <path
                  d="M15,30 C15,15 25,10 40,10 L80,10 C95,10 105,15 105,30 C105,45 95,50 80,50 L40,50 C25,50 15,45 15,30 Z"
                  fill="url(#linkedinGradient)"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <defs>
                  <linearGradient id="linkedinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-5 h-5" />
                  <span className="font-semibold">Connect</span>
                </div>
              </div>
            </a>

            <a 
              href={`https://${personalInfo.github}`}
              className="group relative overflow-hidden"
            >
              <svg viewBox="0 0 120 60" className="w-32 h-16">
                <path
                  d="M15,30 C15,15 25,10 40,10 L80,10 C95,10 105,15 105,30 C105,45 95,50 80,50 L40,50 C25,50 15,45 15,30 Z"
                  fill="url(#githubGradient)"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <defs>
                  <linearGradient id="githubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="flex items-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span className="font-semibold">Code</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {/* Organic text container */}
            <div className="relative">
              <svg viewBox="0 0 500 300" className="w-full h-72 absolute inset-0">
                <path
                  d="M50,150 C50,80 80,50 150,50 L350,50 C420,50 450,80 450,150 C450,220 420,250 350,250 L150,250 C80,250 50,220 50,150 Z"
                  fill="url(#aboutGradient)"
                  className="opacity-90"
                />
                <defs>
                  <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f0fdf4" />
                    <stop offset="100%" stopColor="#dcfce7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative z-10 p-8">
                <h2 className="text-4xl font-bold mb-6 text-emerald-700 dark:text-emerald-400">
                  About Me
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {personalInfo.bio}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Organic stat bubbles */}
            <div className="relative">
              <svg viewBox="0 0 200 100" className="w-48 h-24">
                <path
                  d="M30,50 C30,25 45,15 70,15 L130,15 C155,15 170,25 170,50 C170,75 155,85 130,85 L70,85 C45,85 30,75 30,50 Z"
                  fill="url(#stat1Gradient)"
                />
                <defs>
                  <linearGradient id="stat1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">4+</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </div>

            <div className="relative ml-8">
              <svg viewBox="0 0 200 100" className="w-48 h-24">
                <path
                  d="M30,50 C30,25 45,15 70,15 L130,15 C155,15 170,25 170,50 C170,75 155,85 130,85 L70,85 C45,85 30,75 30,50 Z"
                  fill="url(#stat2Gradient)"
                />
                <defs>
                  <linearGradient id="stat2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm">Projects</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <svg viewBox="0 0 200 100" className="w-48 h-24">
                <path
                  d="M30,50 C30,25 45,15 70,15 L130,15 C155,15 170,25 170,50 C170,75 155,85 130,85 L70,85 C45,85 30,75 30,50 Z"
                  fill="url(#stat3Gradient)"
                />
                <defs>
                  <linearGradient id="stat3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">∞</div>
                  <div className="text-sm">Ideas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Organic solutions that grow naturally from creative ideas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              style={{
                transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                transformOrigin: 'center'
              }}
            >
              {/* Organic project container */}
              <div className="relative">
                <svg viewBox="0 0 400 500" className="w-full h-[500px] absolute inset-0">
                  <path
                    d={`M50,${100 + index * 20} C50,${50 + index * 10} 80,30 150,30 L250,30 C320,30 350,${50 + index * 10} 350,${100 + index * 20} L350,${350 + index * 20} C350,${400 + index * 10} 320,420 250,420 L150,420 C80,420 50,${400 + index * 10} 50,${350 + index * 20} Z`}
                    fill="url(#projectGradient)"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <defs>
                    <linearGradient id="projectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="relative z-10 p-8">
                  <div className="aspect-video overflow-hidden rounded-3xl mb-6 shadow-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    <div className="relative">
                      <svg viewBox="0 0 80 40" className="w-20 h-10">
                        <path
                          d="M10,20 C10,10 15,5 25,5 L55,5 C65,5 70,10 70,20 C70,30 65,35 55,35 L25,35 C15,35 10,30 10,20 Z"
                          fill="url(#categoryGradient)"
                        />
                        <defs>
                          <linearGradient id="categoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium capitalize">
                        {project.category}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <div key={tech} className="relative">
                        <svg viewBox="0 0 100 30" className="w-24 h-8">
                          <path
                            d="M10,15 C10,8 13,5 20,5 L80,5 C87,5 90,8 90,15 C90,22 87,25 80,25 L20,25 C13,25 10,22 10,15 Z"
                            fill={`hsl(${120 + techIndex * 40}, 60%, 85%)`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-xs font-medium">
                          {tech}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Project links */}
                  <div className="flex space-x-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="group/btn relative"
                      >
                        <svg viewBox="0 0 80 40" className="w-20 h-10">
                          <path
                            d="M10,20 C10,10 15,5 25,5 L55,5 C65,5 70,10 70,20 C70,30 65,35 55,35 L25,35 C15,35 10,30 10,20 Z"
                            fill="url(#linkGradient)"
                            className="group-hover/btn:scale-105 transition-transform duration-300"
                          />
                          <defs>
                            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#0891b2" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        className="group/btn relative"
                      >
                        <svg viewBox="0 0 80 40" className="w-20 h-10">
                          <path
                            d="M10,20 C10,10 15,5 25,5 L55,5 C65,5 70,10 70,20 C70,30 65,35 55,35 L25,35 C15,35 10,30 10,20 Z"
                            fill="url(#githubBtnGradient)"
                            className="group-hover/btn:scale-105 transition-transform duration-300"
                          />
                          <defs>
                            <linearGradient id="githubBtnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <Github className="w-4 h-4" />
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
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Skills & Growth
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Like nature, skills evolve and adapt organically
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
            <div 
              key={category} 
              className="relative group"
            >
              {/* Organic skill container */}
              <svg viewBox="0 0 300 400" className="w-full h-96 absolute inset-0">
                <path
                  d={`M50,${80 + index * 10} C50,${40 + index * 5} 70,20 120,20 L180,20 C230,20 250,${40 + index * 5} 250,${80 + index * 10} L250,${320 + index * 10} C250,${360 + index * 5} 230,380 180,380 L120,380 C70,380 50,${360 + index * 5} 50,${320 + index * 10} Z`}
                  fill="url(#skillGradient)"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <defs>
                  <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="relative z-10 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    {index === 0 && <Leaf className="w-8 h-8" />}
                    {index === 1 && <Flower className="w-8 h-8" />}
                    {index === 2 && <Sun className="w-8 h-8" />}
                    {index === 3 && <Moon className="w-8 h-8" />}
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
                      
                      {/* Organic progress bar */}
                      <div className="relative h-3">
                        <svg viewBox="0 0 200 12" className="w-full h-full">
                          <path
                            d="M6,6 C6,3 8,1 11,1 L189,1 C192,1 194,3 194,6 C194,9 192,11 189,11 L11,11 C8,11 6,9 6,6 Z"
                            fill="#e5e7eb"
                          />
                          <path
                            d={`M6,6 C6,3 8,1 11,1 L${11 + (skill.level / 100) * 178},1 C${14 + (skill.level / 100) * 178},1 ${16 + (skill.level / 100) * 178},3 ${16 + (skill.level / 100) * 178},6 C${16 + (skill.level / 100) * 178},9 ${14 + (skill.level / 100) * 178},11 ${11 + (skill.level / 100) * 178},11 L11,11 C8,11 6,9 6,6 Z`}
                            fill={`url(#skillProgress${skillIndex})`}
                            className="transition-all duration-500"
                          />
                          <defs>
                            <linearGradient id={`skillProgress${skillIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
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
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Let's Grow Together
          </h2>
          
          {/* Organic contact container */}
          <div className="relative">
            <svg viewBox="0 0 600 300" className="w-full h-72">
              <path
                d="M50,150 C50,80 80,50 150,50 L450,50 C520,50 550,80 550,150 C550,220 520,250 450,250 L150,250 C80,250 50,220 50,150 Z"
                fill="url(#contactGradient)"
                className="opacity-90"
              />
              <defs>
                <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#dcfce7" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <p className="text-2xl font-bold mb-8 leading-tight text-gray-800 dark:text-gray-200 max-w-2xl">
                Ready to cultivate something beautiful?<br />
                <span className="text-emerald-600">Let's plant the seeds of collaboration.</span>
              </p>
              
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group relative"
              >
                <svg viewBox="0 0 200 80" className="w-48 h-20">
                  <path
                    d="M20,40 C20,20 30,10 50,10 L150,10 C170,10 180,20 180,40 C180,60 170,70 150,70 L50,70 C30,70 20,60 20,40 Z"
                    fill="url(#contactBtnGradient)"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <defs>
                    <linearGradient id="contactBtnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6" />
                    <span className="text-xl font-bold">Start Growing</span>
                    <Heart className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </div>
          </div>
          
          <div className="mt-8 relative inline-block">
            <svg viewBox="0 0 300 60" className="w-72 h-16">
              <path
                d="M30,30 C30,15 40,10 60,10 L240,10 C260,10 270,15 270,30 C270,45 260,50 240,50 L60,50 C40,50 30,45 30,30 Z"
                fill="url(#locationGradient)"
              />
              <defs>
                <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e5e7eb" />
                  <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 dark:text-gray-300">
              <p className="font-semibold">📍 {personalInfo.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default OrganicTemplate;