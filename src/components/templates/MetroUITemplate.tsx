/**
 * Metro UI Template
 * 
 * This template implements a Metro UI design inspired by Windows 8/10 with
 * colorful tiles, flat design, and grid-based layout. Features auto-flipping
 * tiles, bold colors, and clean typography.
 */

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Square, Circle, Triangle, ArrowRight, User, Briefcase, Code, Database, Server, Terminal, Book } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const MetroUITemplate: React.FC = () => {
  // State for tile interactions
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [flipTiles, setFlipTiles] = useState<Set<number>>(new Set());

  /**
   * Auto-flip tiles animation
   * Randomly flips tiles for dynamic visual effect
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTile = Math.floor(Math.random() * 12);
      setFlipTiles(prev => {
        const newSet = new Set(prev);
        if (newSet.has(randomTile)) {
          newSet.delete(randomTile);
        } else {
          newSet.add(randomTile);
        }
        return newSet;
      });
    }, 2000);

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
      case 'frontend': return <Code className="w-8 h-8" />;
      case 'backend': return <Server className="w-8 h-8" />;
      case 'database': return <Database className="w-8 h-8" />;
      case 'tools': return <Terminal className="w-8 h-8" />;
      case 'data-science': return <Book className="w-8 h-8" />;
      default: return <Code className="w-8 h-8" />;
    }
  };

  // Metro UI color palette
  const metroColors = [
    'bg-blue-500 hover:bg-blue-600',
    'bg-green-500 hover:bg-green-600',
    'bg-red-500 hover:bg-red-600',
    'bg-purple-500 hover:bg-purple-600',
    'bg-orange-500 hover:bg-orange-600',
    'bg-teal-500 hover:bg-teal-600',
    'bg-pink-500 hover:bg-pink-600',
    'bg-indigo-500 hover:bg-indigo-600',
    'bg-yellow-500 hover:bg-yellow-600',
    'bg-cyan-500 hover:bg-cyan-600',
    'bg-emerald-500 hover:bg-emerald-600',
    'bg-violet-500 hover:bg-violet-600'
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Metro Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 pt-20 sm:pt-16 md:pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Tile */}
            <div className="lg:col-span-2">
              <div className="bg-blue-700 p-8 h-full flex flex-col justify-center">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-24 h-24 bg-white text-blue-600 flex items-center justify-center text-3xl font-bold">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h1 className="text-4xl font-light mb-2">{personalInfo.name}</h1>
                    <p className="text-xl text-blue-200">{personalInfo.title}</p>
                    <p className="text-blue-300 mt-1">{personalInfo.education}</p>
                  </div>
                </div>
                <p className="text-lg text-blue-100 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>
            </div>

            {/* Contact Tiles */}
            <div className="space-y-4">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="block bg-green-500 hover:bg-green-600 text-white p-6 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <Mail className="w-8 h-8" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm opacity-90">Get in touch</div>
                  </div>
                </div>
              </a>

              <a 
                href={`https://${personalInfo.linkedin}`}
                className="block bg-blue-500 hover:bg-blue-600 text-white p-6 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <Linkedin className="w-8 h-8" />
                  <div>
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-sm opacity-90">Connect</div>
                  </div>
                </div>
              </a>

              <a 
                href={`https://${personalInfo.github}`}
                className="block bg-gray-700 hover:bg-gray-800 text-white p-6 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <Github className="w-8 h-8" />
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-sm opacity-90">View code</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Tiles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-500 text-white p-8 text-center transform hover:scale-105 transition-all duration-200">
              <div className="text-5xl font-light mb-4">4+</div>
              <div className="text-xl font-semibold">Years</div>
              <div className="text-orange-200">Experience</div>
            </div>
            
            <div className="bg-purple-500 text-white p-8 text-center transform hover:scale-105 transition-all duration-200">
              <div className="text-5xl font-light mb-4">50+</div>
              <div className="text-xl font-semibold">Projects</div>
              <div className="text-purple-200">Completed</div>
            </div>
            
            <div className="bg-teal-500 text-white p-8 text-center transform hover:scale-105 transition-all duration-200">
              <div className="text-5xl font-light mb-4">∞</div>
              <div className="text-xl font-semibold">Ideas</div>
              <div className="text-teal-200">Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center text-gray-800">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${metroColors[index % metroColors.length]} text-white p-8 group cursor-pointer transition-all duration-300 transform hover:scale-105`}
                onClick={() => setActiveTile(activeTile === index ? null : index)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-light">{project.title}</h3>
                    <span className="bg-white bg-opacity-20 px-3 py-1 text-sm font-medium rounded capitalize">
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="aspect-video bg-white bg-opacity-10 rounded mb-4 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  
                  <p className="text-white text-opacity-90 mb-4 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-white bg-opacity-20 px-2 py-1 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="bg-white bg-opacity-20 px-2 py-1 text-xs rounded">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    {project.link && (
                      <a 
                        href={project.link}
                        className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">View</span>
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github}
                        className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Tiles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center text-gray-800">Skills & Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div 
                key={category}
                className={`${metroColors[(index + 4) % metroColors.length]} text-white p-8 transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-white bg-opacity-20 p-3 rounded">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-2xl font-light capitalize">
                    {category.replace('-', ' ')}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-white bg-opacity-20 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-white h-full rounded-full transition-all duration-500"
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

      {/* Animated Tiles Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center text-gray-800">Live Tiles</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(12).fill(0).map((_, index) => (
              <div
                key={index}
                className={`${metroColors[index % metroColors.length]} aspect-square flex items-center justify-center text-white transition-all duration-500 transform ${
                  flipTiles.has(index) ? 'rotate-180 scale-110' : ''
                }`}
              >
                <div className={`transition-all duration-500 ${flipTiles.has(index) ? 'rotate-180' : ''}`}>
                  {index % 3 === 0 && <Square className="w-8 h-8" />}
                  {index % 3 === 1 && <Circle className="w-8 h-8" />}
                  {index % 3 === 2 && <Triangle className="w-8 h-8" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-8">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Let's collaborate and create something amazing together with modern technology and clean design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="bg-green-500 hover:bg-green-600 text-white p-8 transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-4"
            >
              <Mail className="w-12 h-12" />
              <div>
                <div className="text-xl font-semibold">Send Email</div>
                <div className="text-green-200">Start conversation</div>
              </div>
            </a>
            
            <div className="bg-blue-700 p-8 flex flex-col items-center space-y-4">
              <User className="w-12 h-12" />
              <div>
                <div className="text-xl font-semibold">Location</div>
                <div className="text-blue-200">{personalInfo.location}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Square className="w-6 h-6 text-blue-400" />
              <Circle className="w-6 h-6 text-green-400" />
              <Triangle className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-gray-400 text-center">
              © 2024 {personalInfo.name} - Modern Metro Design
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400">Powered by</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold">Metro UI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MetroUITemplate;