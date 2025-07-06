/**
 * Experimental Template
 * 
 * This template implements an experimental design with dynamic backgrounds,
 * section-based navigation, and smooth easing animations. Features floating
 * orbs that follow mouse movement and section-based content display.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const ExperimentalTemplate: React.FC = () => {
  // State for section navigation and animations
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [easedPosition, setEasedPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  /**
   * Track mouse movement for dynamic background effects
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /**
   * Smooth easing animation for orbs
   * Creates trailing effect for background elements
   */
  useEffect(() => {
    const animate = () => {
      setEasedPosition(prev => {
        const easing = 0.02; // Much slower easing for more trailing effect
        const newX = prev.x + (mousePosition.x - prev.x) * easing;
        const newY = prev.y + (mousePosition.y - prev.y) * easing;
        
        return {
          x: newX,
          y: newY
        };
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  // Define sections for navigation
  const sections = ['intro', 'about', 'projects', 'skills', 'contact'];

  return (
    <div className="min-h-screen bg-black dark:bg-gray-950 text-white overflow-hidden relative">
      {/* Dynamic Background with floating orbs */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-500 to-red-500 rounded-full filter blur-3xl"
          style={{
            transform: `translate3d(${easedPosition.x - 192}px, ${easedPosition.y - 192}px, 0)`,
            willChange: 'transform'
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl"
          style={{
            transform: `translate3d(${easedPosition.x - 144}px, ${easedPosition.y - 144}px, 0)`,
            willChange: 'transform'
          }}
        />
      </div>

      {/* Navigation dots */}
      <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => setActiveSection(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-150'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </nav>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Intro Section */}
        {activeSection === 0 && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
              <div className="mb-8">
                <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  {personalInfo.name.split(' ')[0]}
                </h1>
                <h2 className="text-4xl font-light text-gray-300 transform rotate-1">
                  {personalInfo.name.split(' ')[1]}
                </h2>
              </div>
              <p className="text-2xl text-orange-400 mb-4">{personalInfo.title}</p>
              <p className="text-gray-400 mb-8">{personalInfo.education}</p>
              
              {/* Contact buttons */}
              <div className="flex justify-center space-x-6">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href={`https://${personalInfo.linkedin}`}
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={`https://${personalInfo.github}`}
                  className="p-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === 1 && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-4xl">
              <h2 className="text-6xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                About
              </h2>
              <div className="text-center">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  {personalInfo.bio}
                </p>
                
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">4+</div>
                    <div className="text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
                    <div className="text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-500 mb-2">∞</div>
                    <div className="text-gray-400">Possibilities</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 2 && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-6xl w-full">
              <h2 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    {/* Project image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Project content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Technology tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Project links */}
                      <div className="flex space-x-4">
                        {project.link && (
                          <a href={project.link} className="text-orange-400 hover:text-orange-300 transition-colors">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} className="text-orange-400 hover:text-orange-300 transition-colors">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {activeSection === 3 && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-6xl w-full">
              <h2 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="group relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                          <span className="text-2xl font-bold">{skill.level}%</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
                      <p className="text-gray-400 text-sm capitalize">{skill.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 4 && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-4xl text-center">
              <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Ready to create something extraordinary? Let's push the boundaries of what's possible together.
              </p>
              
              {/* Contact options */}
              <div className="flex justify-center space-x-8">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group relative p-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl hover:scale-110 transition-transform duration-300"
                >
                  <Mail className="w-8 h-8 mb-4" />
                  <span className="block text-sm">Send Email</span>
                </a>
                <a
                  href={`https://${personalInfo.linkedin}`}
                  className="group relative p-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="w-8 h-8 mb-4" />
                  <span className="block text-sm">Connect</span>
                </a>
                <a
                  href={`https://${personalInfo.github}`}
                  className="group relative p-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl hover:scale-110 transition-transform duration-300"
                >
                  <Github className="w-8 h-8 mb-4" />
                  <span className="block text-sm">Collaborate</span>
                </a>
              </div>
              
              <div className="mt-12">
                <p className="text-gray-400">{personalInfo.location}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExperimentalTemplate;