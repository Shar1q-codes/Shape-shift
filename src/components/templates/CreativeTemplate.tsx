/**
 * Creative Template
 * 
 * This template implements a creative design with animated backgrounds,
 * gradient overlays, and artistic visual elements. Features floating
 * animations, star ratings for skills, and vibrant color schemes.
 */

import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Star } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const CreativeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 text-white overflow-hidden">
      {/* Animated Background with floating orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Creative Header */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-2xl text-purple-300 mb-2">{personalInfo.title}</p>
            <p className="text-purple-200 opacity-75">{personalInfo.education}</p>
          </div>
          
          {/* Creative Contact Buttons */}
          <div className="flex justify-center space-x-6">
            <a href={`mailto:${personalInfo.email}`} className="p-3 bg-purple-600 hover:bg-purple-500 rounded-full transition-all duration-300 hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
            <a href={`https://${personalInfo.linkedin}`} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={`https://${personalInfo.github}`} className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-all duration-300 hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-purple-100 leading-relaxed text-lg max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>
        </div>
      </section>

      {/* Creative Projects Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Creative Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-opacity-20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-purple-100 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Project Links */}
                <div className="flex space-x-4">
                  {project.link && (
                    <a href={project.link} className="text-purple-300 hover:text-purple-100 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="text-purple-300 hover:text-purple-100 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Skills Section with Star Ratings */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-opacity-20 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Star Rating Display */}
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(skill.level / 20) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
              <h3 className="text-sm font-medium text-white">{skill.name}</h3>
              <p className="text-xs text-purple-300 mt-1 capitalize">{skill.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Contact Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </h2>
          <p className="text-purple-100 mb-8 max-w-xl mx-auto text-lg">
            Ready to bring your ideas to life? Let's collaborate and create something extraordinary together.
          </p>
          <div className="inline-flex items-center justify-center space-x-2 text-purple-200 bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-sm font-medium">{personalInfo.location}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeTemplate;