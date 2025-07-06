/**
 * Dark Tech Template
 * 
 * This template implements a dark, terminal-inspired design with green text
 * on dark backgrounds, mimicking a command-line interface aesthetic.
 * Features terminal-style headers, monospace fonts, and tech-focused styling.
 */

import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Terminal, Code, Database, Server } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const DarkTechTemplate: React.FC = () => {
  /**
   * Get appropriate icon for skill category
   */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code className="w-5 h-5" />;
      case 'backend': return <Server className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'tools': return <Terminal className="w-5 h-5" />;
      case 'data-science': return <Database className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="bg-gray-800 border-b border-green-500 p-4">
        <div className="flex items-center space-x-2">
          {/* Terminal window controls */}
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-400 text-sm ml-4">~/shariq-hussain-portfolio</span>
        </div>
      </div>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="mb-8">
            {/* Terminal-style commands */}
            <div className="text-green-500 text-sm mb-2">$ whoami</div>
            <h1 className="text-4xl font-bold text-green-400 mb-4 font-mono">
              {personalInfo.name.toLowerCase().replace(' ', '_')}
            </h1>
            <div className="text-green-500 text-sm mb-2">$ cat /dev/role</div>
            <p className="text-xl text-green-300 mb-2">{personalInfo.title}</p>
            <div className="text-green-500 text-sm mb-2">$ education --list</div>
            <p className="text-green-300 mb-8">{personalInfo.education}</p>
          </div>
          
          {/* Terminal-style contact buttons */}
          <div className="flex justify-center space-x-6">
            <a href={`mailto:${personalInfo.email}`} className="text-green-400 hover:text-green-300 transition-colors border border-green-500 p-3 rounded hover:bg-green-900 hover:bg-opacity-20">
              <Mail className="w-5 h-5" />
            </a>
            <a href={`https://${personalInfo.linkedin}`} className="text-green-400 hover:text-green-300 transition-colors border border-green-500 p-3 rounded hover:bg-green-900 hover:bg-opacity-20">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`https://${personalInfo.github}`} className="text-green-400 hover:text-green-300 transition-colors border border-green-500 p-3 rounded hover:bg-green-900 hover:bg-opacity-20">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="border border-green-500 bg-gray-800 p-6 rounded">
          <div className="text-green-500 text-sm mb-4">$ cat about.txt</div>
          <p className="text-green-300 leading-relaxed">
            {personalInfo.bio}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-green-500 text-sm mb-8">$ ls -la projects/</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="border border-green-500 bg-gray-800 p-6 rounded hover:bg-gray-700 transition-colors">
              {/* Project image */}
              <div className="aspect-video bg-gray-700 rounded overflow-hidden mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
              
              {/* Project information */}
              <div className="text-green-500 text-sm mb-2">$ ./project_info.sh</div>
              <h3 className="text-xl font-bold text-green-400 mb-2">{project.title}</h3>
              <p className="text-green-300 mb-4 leading-relaxed text-sm">
                {project.description}
              </p>
              
              {/* Technology stack */}
              <div className="text-green-500 text-sm mb-2">$ npm list --depth=0</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 border border-green-500 text-green-400 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Project links */}
              <div className="flex space-x-4">
                {project.link && (
                  <a href={project.link} className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-1">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">./run</span>
                  </a>
                )}
                {project.github && (
                  <a href={project.github} className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-1">
                    <Github className="w-4 h-4" />
                    <span className="text-sm">./source</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-green-500 text-sm mb-8">$ skills --list --verbose</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="border border-green-500 bg-gray-800 p-6 rounded">
              <div className="flex items-center space-x-2 mb-4">
                {getCategoryIcon(category)}
                <h3 className="text-lg font-bold text-green-400 uppercase tracking-wider">
                  {category.replace('-', '_')}
                </h3>
              </div>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-green-300 text-sm">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      {/* Progress bar */}
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-green-500 text-xs w-8">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="border border-green-500 bg-gray-800 p-6 rounded">
          <div className="text-green-500 text-sm mb-4">$ contact --init</div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Ready to collaborate?
            </h2>
            <p className="text-green-300 mb-6 text-sm">
              {'>'}  Execute contact protocol to initiate project discussion
            </p>
            <div className="text-green-500 text-sm mb-2">$ echo $LOCATION</div>
            <p className="text-green-300 text-sm">{personalInfo.location}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-green-500 p-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-green-500 text-sm">
            $ exit --save-session && echo "Thanks for visiting!"
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DarkTechTemplate;