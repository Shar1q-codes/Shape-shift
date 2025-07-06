/**
 * Corporate Template
 * 
 * This template implements a professional corporate design with clean layouts,
 * business-appropriate colors, and structured information presentation.
 * Features professional styling, stats section, and organized content blocks.
 */

import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Award, Users, Clock } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const CorporateTemplate: React.FC = () => {
  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Professional Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 pt-20 sm:pt-16 md:pt-20 pb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Professional Avatar */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            
            {/* Professional Information */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-blue-600 mb-2 font-semibold">{personalInfo.title}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{personalInfo.education}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
                {personalInfo.bio}
              </p>
              
              {/* Professional Contact Buttons */}
              <div className="flex justify-center lg:justify-start space-x-4">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>Contact</span>
                </a>
                <a href={`https://${personalInfo.linkedin}`} className="flex items-center space-x-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a href={`https://${personalInfo.github}`} className="flex items-center space-x-2 border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold mb-2">4+</h3>
              <p className="text-blue-100">Years Experience</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-blue-100">Projects Completed</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Clock className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="text-blue-100">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Showcasing a selection of successful projects that demonstrate technical expertise and business impact.
            </p>
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technology Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Links */}
                  <div className="flex space-x-4">
                    {project.link && (
                      <a href={project.link} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Project</span>
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technical Expertise</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive skill set spanning full-stack development, data science, and modern web technologies.
            </p>
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
                  {category.replace('-', ' ')}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can work together to bring your project to life with cutting-edge technology and professional expertise.
          </p>
          <div className="flex justify-center">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              <Mail className="w-6 h-6" />
              <span>Start a Conversation</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-6">
            📍 {personalInfo.location}
          </p>
        </div>
      </section>
    </div>
  );
};

export default CorporateTemplate;