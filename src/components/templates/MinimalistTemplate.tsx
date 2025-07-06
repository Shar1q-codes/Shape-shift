/**
 * Minimalist Template
 * 
 * This template implements a clean, minimalist design with ample whitespace,
 * subtle typography, and focused content presentation. Features simple layout,
 * monochromatic color scheme, and essential information without distractions.
 */

import React from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const MinimalistTemplate: React.FC = () => {
  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-light">
      {/* Header - Simple and centered */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-thin tracking-wide mb-4">
            {personalInfo.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2">{personalInfo.title}</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">{personalInfo.education}</p>
          
          {/* Minimal social links */}
          <div className="flex justify-center space-x-6">
            <a href={`mailto:${personalInfo.email}`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href={`https://${personalInfo.linkedin}`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`https://${personalInfo.github}`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* About Section - Clean and simple */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-thin mb-6 sm:mb-8 tracking-wide">About</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>
        </div>
      </section>

      {/* Projects Section - Minimal grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-thin mb-8 sm:mb-12 text-center tracking-wide">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {/* Project image */}
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Project details */}
              <h3 className="text-lg sm:text-xl font-light mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              {/* Technology tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Project links */}
              <div className="flex space-x-4">
                {project.link && (
                  <a href={project.link} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section - Simple columns */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-thin mb-8 sm:mb-12 text-center tracking-wide">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="text-center">
              <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {category.replace('-', ' ')}
              </h3>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="text-sm text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Minimal */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-thin mb-6 sm:mb-8 tracking-wide">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{personalInfo.location}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalistTemplate;