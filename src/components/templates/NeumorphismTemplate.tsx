/**
 * Neumorphism Template
 * 
 * This template implements a neumorphic design with soft shadows, subtle
 * gradients, and tactile UI elements. Features custom shadow effects,
 * pressed states, and monochromatic color scheme with accent colors.
 */

import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, Users, Clock, Star, Code, Database, Server, Terminal } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const NeumorphismTemplate: React.FC = () => {
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
      case 'frontend': return <Code className="w-6 h-6" />;
      case 'backend': return <Server className="w-6 h-6" />;
      case 'database': return <Database className="w-6 h-6" />;
      case 'tools': return <Terminal className="w-6 h-6" />;
      case 'data-science': return <Database className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          {/* Neumorphic Profile Picture */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 sm:mb-8 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark flex items-center justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-400">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-2 sm:mb-4 text-gray-700 dark:text-gray-300">
            {personalInfo.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">{personalInfo.title}</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-6 sm:mb-8">{personalInfo.education}</p>
          
          {/* Neumorphic Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark hover:shadow-neumorphism-pressed dark:hover:shadow-neumorphism-pressed-dark transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <Mail className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
            </a>
            <a 
              href={`https://${personalInfo.linkedin}`} 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark hover:shadow-neumorphism-pressed dark:hover:shadow-neumorphism-pressed-dark transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <Linkedin className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
            </a>
            <a 
              href={`https://${personalInfo.github}`} 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark hover:shadow-neumorphism-pressed dark:hover:shadow-neumorphism-pressed-dark transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            >
              <Github className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 md:mb-8 text-gray-700 dark:text-gray-300">About Me</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {personalInfo.bio}
            </p>
          </div>
          
          {/* Neumorphic Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-neumorphism dark:shadow-neumorphism-dark">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark flex items-center justify-center">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">4+</h3>
              <p className="text-gray-500 dark:text-gray-500">Years Experience</p>
            </div>
            <div className="text-center bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-neumorphism dark:shadow-neumorphism-dark">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark flex items-center justify-center">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500 dark:text-green-400" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">50+</h3>
              <p className="text-gray-500 dark:text-gray-500">Projects Completed</p>
            </div>
            <div className="text-center bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-neumorphism dark:shadow-neumorphism-dark">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark flex items-center justify-center">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">24/7</h3>
              <p className="text-gray-500 dark:text-gray-500">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 md:mb-8 text-gray-700 dark:text-gray-300">Featured Projects</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcasing innovative solutions built with modern technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-neumorphism dark:shadow-neumorphism-dark hover:shadow-neumorphism-pressed dark:hover:shadow-neumorphism-pressed-dark transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project image */}
              <div className="aspect-video overflow-hidden bg-gray-300 dark:bg-gray-700 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300">{project.title}</h3>
                  <span className="hidden sm:inline-block bg-gray-200 dark:bg-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark capitalize">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
                
                {/* Technology tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-gray-200 dark:bg-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark"
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
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark hover:shadow-neumorphism-pressed dark:hover:shadow-neumorphism-pressed-dark transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark hover:shadow-neumorphism-pressed dark:hover:shadow-neumorphism-pressed-dark transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 md:mb-8 text-gray-700 dark:text-gray-300">Skills & Expertise</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div 
                key={category} 
                className="bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-neumorphism dark:shadow-neumorphism-dark"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-200 dark:bg-gray-800 rounded-full shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark flex items-center justify-center text-gray-600 dark:text-gray-400">
                    <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6">
                      {getCategoryIcon(category)}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-light text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 capitalize text-center">
                  {category.replace('-', ' ')}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full shadow-neumorphism dark:shadow-neumorphism-dark transition-all duration-500"
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

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-neumorphism-inset dark:shadow-neumorphism-inset-dark text-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 md:mb-8 text-gray-700 dark:text-gray-300">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's collaborate and create something extraordinary.
          </p>
          
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="bg-gray-200 dark:bg-gray-800 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl shadow-neumorphism dark:shadow-neumorphism-dark hover:shadow-neumorphism-pressed dark:hover:shadow-neumorphism-pressed-dark transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium flex items-center space-x-2 sm:space-x-3"
            >
              <Mail className="w-5 h-5" />
              <span>Start a Conversation</span>
            </a>
          </div>
          
          <div className="bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism dark:shadow-neumorphism-dark inline-block">
            <p className="text-gray-500 dark:text-gray-500">
              📍 {personalInfo.location}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NeumorphismTemplate;